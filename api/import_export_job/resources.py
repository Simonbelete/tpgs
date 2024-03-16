from django.contrib import admin
from import_export import resources, fields, widgets
import numpy as np
import pandas as pd
import warnings
import tablib
import io
from tablib import Dataset
from django.template.loader import render_to_string
from django_tenants.utils import tenant_context
from django.db.models.query import QuerySet

from . import models
from . import util
from feeds.models import Feed
from weights.models import Weight
from eggs.models import Egg
from hatchery.models import Hatchery
from breeds.models import Breed
from houses.models import House
from pen.models import Pen
from chickens.models import Chicken
from reduction_reason.models import ReductionReason
from feeds.tasks import create_individual_feed_from_batch
from analyses.models import ChickenRecordset

# Shared Column Name
TAG_COLUMN_NAME = "ID (Wing Tag)"
BATCH_FEED_COLUMN_NAME = "Batch Feed"


# Import Resource
class BaseResource(resources.ModelResource):
    def after_read_file(self, df):
        """ After pd.read_[type]"""
        return df

    def __init__(self, import_job):
        self.import_job = import_job
        self.results = []

    def read_file(self):
        df = util.read_file(self.import_job.file, self.import_job.format)
        return self.after_read_file(df)

    def get_rendered_results(self):
        rendered_result = "<br />"
        for r in self.results:
            rendered_result += self.render_result(r)
        return rendered_result

    def render_result(self, result):
        rendered = render_to_string("import_result.html", {'result': result})
        if result.has_errors():
            raise Exception(rendered)
        return rendered

    def add_result(self, result):
        self.results.append(result)


class BaseChickenResource(BaseResource):
    tag = fields.Field(column_name=TAG_COLUMN_NAME, attribute='tag')
    hatch_date = fields.Field(column_name="Hatch Date", attribute="hatch_date",
                              widget=widgets.DateWidget(format="%d/%m/%Y"))
    sex = fields.Field(column_name='Sex', attribute='sex')
    generation = fields.Field(column_name='generation',
                              attribute='generation')
    breed = fields.Field(
        column_name='Breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(Breed, field='name'))
    hatchery = fields.Field(
        column_name='Batch',
        attribute='hatchery',
        widget=widgets.ForeignKeyWidget(Hatchery, field='name'))
    house = fields.Field(
        column_name='House',
        attribute='pen__house',
        widget=widgets.ForeignKeyWidget(House, field='name'), readonly=True)
    pen = fields.Field(
        column_name='pen',
        attribute='pen',
        widget=widgets.ForeignKeyWidget(Pen, field='name'))
    sire = fields.Field(
        column_name='Sire ID',
        attribute='sire',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    dam = fields.Field(
        column_name='Dam ID',
        attribute='dam',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    reduction_date = fields.Field(
        column_name='Cull Date', attribute='reduction_date')
    reduction_reason = fields.Field(
        column_name='Cull Reason',
        attribute='reduction_reason',
        widget=widgets.ForeignKeyWidget(ReductionReason, field='name'))

    class Meta:
        model = Chicken
        import_id_fields = ['tag']
        exclude = ['id']
        fields = ['tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason', 'color']


class BaseExportChickenResource(resources.ModelResource):
    tag = fields.Field(column_name=TAG_COLUMN_NAME, attribute='tag')
    hatch_date = fields.Field(column_name="Hatch Date", attribute="hatch_date",
                              widget=widgets.DateWidget(format="%d/%m/%Y"))
    sex = fields.Field(column_name='Sex', attribute='sex')
    generation = fields.Field(column_name='generation',
                              attribute='generation')
    breed = fields.Field(
        column_name='Breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(Breed, field='name'))
    hatchery = fields.Field(
        column_name='Batch',
        attribute='hatchery',
        widget=widgets.ForeignKeyWidget(Hatchery, field='name'))
    house = fields.Field(
        column_name='House',
        attribute='pen__house',
        widget=widgets.ForeignKeyWidget(House, field='name'), readonly=True)
    pen = fields.Field(
        column_name='pen',
        attribute='pen',
        widget=widgets.ForeignKeyWidget(Pen, field='name'))
    sire = fields.Field(
        column_name='Sire ID',
        attribute='sire',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    dam = fields.Field(
        column_name='Dam ID',
        attribute='dam',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    reduction_date = fields.Field(
        column_name='Cull Date', attribute='reduction_date')
    reduction_reason = fields.Field(
        column_name='Cull Reason',
        attribute='reduction_reason',
        widget=widgets.ForeignKeyWidget(ReductionReason, field='name'))

    class Meta:
        model = Chicken
        import_id_fields = ['tag']
        exclude = ['id']
        fields = ['tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason', 'color']


class MasterChicken(BaseChickenResource):
    def read_file(self):
        """ Load Chicken detail sheet"""
        df = util.read_file(self.import_job.file,
                            self.import_job.format,
                            sheet_name="Pedigree")
        df = df.replace(np.nan, None)
        return df

    def read_body_weight_sheet(self):
        df = util.read_file(self.import_job.file,
                            self.import_job.format,
                            sheet_name="Body Weight")
        df = df.replace(np.nan, None)
        return df

    def read_batch_feed_intake_sheet(self):
        df = util.read_file(self.import_job.file,
                            self.import_job.format,
                            sheet_name="Batch Feed Intake")
        df = df.replace(np.nan, None)
        return df

    def read_individual_feed_intake_sheet(self):
        df = util.read_file(self.import_job.file,
                            self.import_job.format,
                            sheet_name="Individual Feed Intake")
        df = df.replace(np.nan, None)
        return df

    def read_egg_production_sheet(self):
        df = util.read_file(self.import_job.file,
                            self.import_job.format,
                            sheet_name="Egg Production")
        df = df.replace(np.nan, None)
        return df

    # TODO: Log each step
    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        tag_col_name = TAG_COLUMN_NAME

        # Load Body Weight sheet
        df_weight = self.read_body_weight_sheet()
        weight_columns = list(df_weight.filter(regex=col_filter))

        df_weight = pd.melt(df_weight,
                            id_vars=[tag_col_name],
                            value_vars=weight_columns)
        df_weight.rename(
            columns={'variable': 'week',
                     'value': 'weight'},
            inplace=True)
        df_weight['week'] = df_weight['week'].str.replace(
            '\D+', '', regex=True)  # Remove week stirng

        result = WeightResource(self.import_job).import_data(
            Dataset().load(df_weight),
            dry_run=dry_run
        )
        self.add_result(result)

        # Load Batch Feed Intake sheet
        df_feed = self.read_batch_feed_intake_sheet()
        feed_columns = list(df_feed.filter(regex=col_filter))

        df_feed = pd.melt(df_feed,
                          id_vars=[BATCH_FEED_COLUMN_NAME, 'Pen'],
                          value_vars=feed_columns)
        df_feed.rename(
            columns={'variable': 'week',
                     'value': 'weight'},
            inplace=True)
        df_feed['week'] = df_feed['week'].str.replace(
            '\D+', '', regex=True)  # Remove week stirng

        result = BatchFeedResource(self.import_job).import_data(
            Dataset().load(df_feed),
            dry_run=dry_run
        )
        self.add_result(result)

        # Load Individual Feed Intake sheet
        df_feed_indv = self.read_individual_feed_intake_sheet()
        feed_indv_columns = list(df_feed_indv.filter(regex=col_filter))

        df_feed_indv = pd.melt(df_feed_indv,
                               id_vars=[TAG_COLUMN_NAME],
                               value_vars=feed_indv_columns)
        df_feed_indv.rename(
            columns={'variable': 'week',
                     'value': 'weight'},
            inplace=True)
        df_feed_indv['week'] = df_feed_indv['week'].str.replace(
            '\D+', '', regex=True)  # Remove week stirng

        result = FeedResource(self.import_job).import_data(
            Dataset().load(df_feed_indv),
            dry_run=dry_run
        )
        self.add_result(result)

        # Load Eggg Production sheet
        df_egg = self.read_egg_production_sheet()

        result = EggResource(self.import_job).import_data(
            Dataset().load(df_egg),
            dry_run=dry_run
        )
        self.add_result(result)


class ChickenWeightResource(BaseChickenResource):
    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        self.df_weekly = df.filter(
            regex=(col_filter)).copy(deep=True)
        self.df_weekly['tag'] = df['tag']

        df = df.replace(np.nan, None)
        columns = list(df.filter(regex=col_filter))

        df = df[df.columns.drop(list(df.filter(regex=col_filter)))]

        # Build for weight resource
        self.df_weights = pd.melt(self.df_weekly, id_vars=[
                                  'tag'], value_vars=columns)
        self.df_weights.rename(
            columns={'tag': 'chicken', 'variable': 'week', 'value': 'weight'}, inplace=True)
        self.df_weights['week'] = self.df_weights['week'].str.replace(
            '\D+', '', regex=True)

        return df

    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        resource = WeightResource()
        dataset = Dataset().load(self.df_weights)
        result = resource.import_data(dataset, dry_run=dry_run)

        rendered = render_to_string("import_result.html", {'result': result})
        if result.has_errors():
            raise Exception(rendered)


class ChickenFeedResource(BaseChickenResource):
    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"

        self.df_weekly = df.filter(
            regex=(col_filter)).copy(deep=True)
        self.df_weekly[TAG_COLUMN_NAME] = df[TAG_COLUMN_NAME]
        self.df_weekly[BATCH_FEED_COLUMN_NAME] = df[BATCH_FEED_COLUMN_NAME]
        self.df_weekly['Pen'] = df['Pen']

        df = df.replace(np.nan, None)
        columns = list(df.filter(regex=col_filter))

        df = df[df.columns.drop(list(df.filter(regex=col_filter)))]

        # Build for weight resource
        self.df_weights = pd.melt(self.df_weekly, id_vars=[
                                  TAG_COLUMN_NAME, BATCH_FEED_COLUMN_NAME, 'Pen'], value_vars=columns)
        self.df_weights = self.df_weights.replace(np.nan, None)
        self.df_weights.rename(
            columns={'variable': 'week', 'value': 'weight'}, inplace=True)
        self.df_weights['week'] = self.df_weights['week'].str.replace(
            '\D+', '', regex=True)

        return df

    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        resource = BatchFeedResource(self.import_job)
        dataset = Dataset().load(self.df_weights)
        result = resource.import_data(dataset, dry_run=dry_run)

        rendered = render_to_string("import_result.html", {'result': result})
        if result.has_errors():
            raise Exception(rendered)


class WeightResource(BaseResource):
    chicken = fields.Field(
        column_name=TAG_COLUMN_NAME,
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))

    class Meta:
        model = Weight
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'weight']


class BatchFeedResource(BaseResource):
    hatchery = fields.Field(
        column_name=BATCH_FEED_COLUMN_NAME,
        attribute='hatchery',
        widget=widgets.ForeignKeyWidget(Hatchery, field='name'))
    pen = fields.Field(
        column_name="Pen",
        attribute='pen',
        widget=widgets.ForeignKeyWidget(Hatchery, field='name'))

    class Meta:
        model = Feed
        import_id_fields = ['week', 'hatchery', 'pen']
        fields = ['id', 'hatchery', 'pen', 'week', 'weight']

    def import_data(self, dataset, dry_run=False, raise_errors=False, use_transactions=None, collect_failed_rows=False, rollback_on_validation_errors=False, **kwargs):
        self.dry_run = dry_run
        return super().import_data(dataset, dry_run, raise_errors, use_transactions, collect_failed_rows, rollback_on_validation_errors, **kwargs)

    def after_import_instance(self, instance, new, row_number=None, **kwargs):
        if (self.dry_run == False):
            create_individual_feed_from_batch.delay(
                instance.pk, self.import_job.farm.id)


class FeedResource(BaseResource):
    chicken = fields.Field(
        column_name=TAG_COLUMN_NAME,
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))

    class Meta:
        model = Feed
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'weight']


class EggResource(BaseResource):
    chicken = fields.Field(
        column_name=TAG_COLUMN_NAME,
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    week = fields.Field(column_name='Week', attribute='week')
    eggs = fields.Field(column_name='No of Eggs', attribute='eggs')
    weight = fields.Field(column_name='Total Egg Weight', attribute='weight')

    class Meta:
        model = Egg
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'eggs', 'weight']


class BreedResource(BaseResource):
    class Meta:
        model = Breed
        fields = ['id', 'name', 'color']


class HatcheryResource(BaseResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(Breed, field='name'))
    hatch_date = fields.Field(column_name="hatch_date", attribute="hatch_date",
                              widget=widgets.DateWidget(format="%d/%m/%Y"))

    class Meta:
        model = Hatchery
        import_id_fields = ['name']
        fields = ['name', 'hatch_date', 'breed']


class ChickenBodyWeightExportResource(BaseExportChickenResource):
    def export(self, *args, queryset=None, **kwargs):
        if len(args) == 1 and (
            isinstance(args[0], QuerySet) or isinstance(args[0], list)
        ):
            warnings.warn(
                "'queryset' must be supplied as a named parameter",
                category=DeprecationWarning,
            )
            queryset = args[0]

        self.before_export(queryset, *args, **kwargs)

        if queryset is None:
            queryset = self.get_queryset()
        queryset = self.filter_export(queryset, *args, **kwargs)

        ids = list(zip(*queryset.values_list('id')))
        ids = [] if len(ids) == 0 else ids[0]

        weekly_data = Weight.objects.filter(chicken__in=ids)
        weeks = weekly_data.values_list(
            'week').distinct().order_by('week')
        weeks = list(zip(*weeks))
        weeks = [] if len(weeks) == 0 else weeks[0]

        week_header = ["Week {week}".format(week=w) for w in weeks]

        headers = [*self.get_export_headers(), *week_header]

        data = tablib.Dataset(headers=headers)

        for obj in self.iter_queryset(queryset):
            row = self.export_resource(obj)
            for week in weeks:
                week_data = weekly_data.filter(
                    chicken=obj.id, week=week).first()
                if (week_data):
                    row.append(week_data.weight)
                else:
                    row.append('-')
            data.append(row)

        self.after_export(queryset, data, *args, **kwargs)

        return data


class BaseExportResouce():
    def __init__(self) -> None:
        self.csv = ""
        self.xlsx = ""

    def get_queryset(self):
        """ Overide here to filter your custom queryset"""
        return self.Meta.model.objects.all()


class ExampleExportResource(BaseExportResouce):
    def export(self, queryset):
        print('*******')

        # df = pd.DataFrame([['A1', 'M', '1', '10', 'F1'], ['A1', 'M', '2', '20', 'F2'],
        #                    ['A1', 'M', '3', '0', 'F3'], ['A2', 'F', '1', '1', 'F4']],
        #                   columns=['Chicken', 'Sex', 'Week', 'Body-Weight', 'Feed'])

        # # col_index = pd.MultiIndex.from_product(
        # # data = [['Mark', 'Test_1', 'Maths', 75], ['Mark', 'Test_2', 'Science', 85],
        # #         ['Juli', 'Test_1', 'Physics', 65], [
        # #             'Juli', 'Test_2', 'Maths', 70],
        # #         ['Kevin', 'Test_1', 'Science', 80], ['Kevin', 'Test_2', 'History', 90]]
        # # df = pd.DataFrame(data, columns=['Name', 'Test', 'Subject', 'Score'])

        # # df2 = df.set_index(['Name', 'Test'])

        # INDEXES = ['Chicken', 'Sex']

        # df = df.pivot(index=['Chicken', 'Sex'], columns=[
        #               'Week'], values=['Feed', 'Body-Weight'])

        # df.columns = df.columns.swaplevel(0, 1)

        # col_index = pd.MultiIndex.from_product(
        #     [['1', '2', '3'], ['Feed', 'Body-Weight']])

        # df = df.reindex(col_index, axis='columns')

        # # dfr = pd.concat([dfr, ['A2', 'A', 'B']])

        # data = []

        # # df4 = [df2[x] for x in df['Week'].unique().tolist()]

        # # print(df4)

        # df.to_excel('test.xlsx')

        df = pd.DataFrame(list(queryset.values()))

        list_of_weeks = np.array(df['week'].unique().tolist())
        list_of_weeks = np.sort(list_of_weeks).tolist()

        df = df.pivot(index=['chicken_id'],
                      columns=['week'],
                      values=['feed_weight', 'body_weight', 'no_eggs', 'eggs_weight'])

        df.columns = df.columns.swaplevel(0, 1)

        col_index = pd.MultiIndex.from_product(
            [
                list_of_weeks,
                ['feed_weight', 'body_weight', 'no_eggs', 'eggs_weight']
            ]
        )

        df = df.reindex(col_index, axis='columns')

        print('------------------')
        print(df.head)

        buffer = io.BytesIO()
        # write dataframe to excel
        df.to_excel(buffer)
        # Rewind the buffer.
        buffer.seek(0)

        self.xlsx = buffer.read()

        return self

    class Meta:
        model = ChickenRecordset
