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
from django.db.models import F
from datetime import datetime, timedelta, date

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
NO_EGGS = 'No of Eggs'
EGGS_WEIGHT = 'Eggs Weight(Total)'
WEEK = 'Week'
BODY_WEIGHT = 'Body Weight (g)'
FEED_WEIGHT = 'Feed Intake'

# Import Resource
class BaseResource(resources.ModelResource):
    def after_read_file(self, df):
        """ After pd.read_[type]"""
        return df

    def __init__(self, import_job=None):
        self.import_job = import_job
        self.results = []

    def read_file(self):
        df = util.read_file(self.import_job.file, self.import_job.format)
        self.df = df
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
    generation = fields.Field(column_name='Generation',
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
    house = fields.Field(
        column_name='House',
        attribute='house',
        widget=widgets.ForeignKeyWidget(House, field='name'))
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

    def after_read_file(self, df):
        return df.replace(np.nan, None)

    def before_import_row(self, row, row_number=None, **kwargs):
        if not "Cull Date" in row: return None
        
        reduction_date = row['Cull Date']
        hatch_date = row['Hatch Date']
        # TODO: use global from setting
        format="%d/%m/%Y"

        if(reduction_date == None): return None
        if(hatch_date == None): return None
        
        hatch_date = datetime.strptime(hatch_date, format).date()

        if(not isinstance(reduction_date, date)):
            reduction_date = hatch_date + timedelta(weeks=reduction_date)
            
        row['Cull Date'] = reduction_date

    class Meta:
        model = Chicken
        import_id_fields = ['tag']
        exclude = ['id']
        fields = ['tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason', 'color']

    def _drop_empty_row(self, df, col_name):
        """Drop row if either 0 or NaN"""
        df = df[df[col_name] != 0]
        df = df[df[col_name].notna()]
        return df
        
    def import_body_weight(self, df, dry_run=True):
        # If new chicken is not saved it will raise Chicken matching query does not exist error
        if(dry_run): return
        resource = _WeightResource()
        df = self._drop_empty_row(df, BODY_WEIGHT)
        dataset = Dataset().load(df)
        result = resource.import_data(dataset, dry_run=dry_run)
        self.add_result(result)

    def import_egg_production(self, df, dry_run=True):
        if(dry_run): return
        resource = _EggResource()
        df = self._drop_empty_row(df, EGGS_WEIGHT)
        dataset = Dataset().load(df)
        result = resource.import_data(dataset, dry_run=dry_run)
        self.add_result(result)
        
    def import_feed_intake(self, df, dry_run=True):
        if(dry_run): return
        resource = _FeedResource()
        df = self._drop_empty_row(df, FEED_WEIGHT)
        dataset = Dataset().load(df)
        result = resource.import_data(dataset, dry_run=dry_run)
        self.add_result(result)
        

class BaseChickenRecordsetResource(BaseResource):
    tag = fields.Field(column_name=TAG_COLUMN_NAME, attribute='chicken__tag')
    hatch_date = fields.Field(column_name="Hatch Date", attribute="chicken__hatch_date",
                              widget=widgets.DateWidget(format="%d/%m/%Y"))
    sex = fields.Field(column_name='Sex', attribute='chicken__sex')
    generation = fields.Field(column_name='Generation',
                              attribute='chicken__generation')
    breed = fields.Field(
        column_name='Breed',
        attribute='chicken__breed',
        widget=widgets.ForeignKeyWidget(Breed, field='name'))
    hatchery = fields.Field(
        column_name='Batch',
        attribute='chicken__hatchery',
        widget=widgets.ForeignKeyWidget(Hatchery, field='name'))
    house = fields.Field(
        column_name='House',
        attribute='chicken__pen__house',
        widget=widgets.ForeignKeyWidget(House, field='name'), readonly=True)
    pen = fields.Field(
        column_name='pen',
        attribute='chicken__pen',
        widget=widgets.ForeignKeyWidget(Pen, field='name'))
    sire = fields.Field(
        column_name='Sire ID',
        attribute='chicken__sire',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    dam = fields.Field(
        column_name='Dam ID',
        attribute='chicken__dam',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    reduction_date = fields.Field(
        column_name='Cull Date', attribute='chicken__reduction_date', widget=widgets.DateWidget(format="%d/%m/%Y"))
    reduction_reason = fields.Field(
        column_name='Cull Reason',
        attribute='chicken__reduction_reason',
        widget=widgets.ForeignKeyWidget(ReductionReason, field='name'))

    class Meta:
        model = ChickenRecordset
        import_id_fields = ['tag']
        exclude = ['id']
        fields = ['tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason', 'color']


class AllChickenDataImportResource(BaseChickenResource):
    """Chicken + Feed + Weight + Egg"""
    def melt_to_rows(self, df, tags, col_name, week_columns=[], level='type', value_name=None):
        """_summary_

        Args:
            col_name (_type_): Read from column and the output column
        """
        data = df.iloc[:, df.columns.get_level_values(level)==col_name].copy(deep=True)
        data = data.droplevel('type', axis=1) 
        data[TAG_COLUMN_NAME] = tags
        data = pd.melt(
            data, 
            id_vars=[TAG_COLUMN_NAME], 
            value_vars=week_columns,
            value_name=value_name or col_name,
            var_name=WEEK)
        data = data.dropna()
        data[WEEK] = data[WEEK].str.replace(
                '\D+', '', regex=True)  # Remove week stirng
        return data

    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        
        pedigree_columns = df.iloc[1].dropna(axis='rows').to_list()
        week_columns = list(df.filter(regex=col_filter))

        # Chicken Data
        df_pedigree = df.iloc[:, :len(pedigree_columns)].copy(deep=True)
        df_pedigree.drop(0, inplace=True)
        df_pedigree.drop(1, inplace=True)
        df_pedigree.columns = pedigree_columns
        df_pedigree = df_pedigree.replace(np.nan, None)

        # Weekly chicken's data
        df_data = df.iloc[:, len(pedigree_columns):].copy(deep=True)
        df_data.drop(1, inplace=True) # Remove Nan 

        df_data.columns = np.repeat(week_columns, repeats=4)

        iterables = [
            df_data.columns.to_list(),
            df_data.loc[0].to_list()
        ]
        tuples = list(zip(*iterables))
        index = pd.MultiIndex.from_tuples(tuples, names=['week', 'type'])

        df_data.columns = index
        df_data.drop(0, inplace=True)
        
        self.df_data = df_data
        self.df_pedigree = df_pedigree
                
        return df_pedigree
    
    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        week_columns = list(self.df.filter(regex=col_filter))
        tags = self.df_pedigree[TAG_COLUMN_NAME]
        
        # Import Body Weight
        df_body_weight = self.melt_to_rows(self.df_data, tags, col_name=BODY_WEIGHT, week_columns=week_columns)
        self.import_body_weight(df_body_weight, dry_run=dry_run)
        
        # Import Egg Production
        df_no_eggs = self.melt_to_rows(self.df_data, tags, col_name=NO_EGGS, week_columns=week_columns)
        df_eggs_weight = self.melt_to_rows(self.df_data, tags, col_name=EGGS_WEIGHT, week_columns=week_columns)
        df_eggs = pd.merge(df_no_eggs, df_eggs_weight, how='left', left_on=[TAG_COLUMN_NAME, WEEK], right_on=[TAG_COLUMN_NAME, WEEK])
        self.import_egg_production(df_eggs, dry_run=dry_run)
        
        # # # Import Feed Intake
        df_feed = self.melt_to_rows(self.df_data, tags, col_name=FEED_WEIGHT, week_columns=week_columns)
        self.import_feed_intake(df_feed, dry_run=dry_run)


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

        result = _WeightResource(self.import_job).import_data(
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

        # result = BatchFeedResource(self.import_job).import_data(
        #     Dataset().load(df_feed),
        #     dry_run=dry_run
        # )
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

        result = _FeedResource(self.import_job).import_data(
            Dataset().load(df_feed_indv),
            dry_run=dry_run
        )
        self.add_result(result)

        # Load Eggg Production sheet
        df_egg = self.read_egg_production_sheet()

        result = _EggResource(self.import_job).import_data(
            Dataset().load(df_egg),
            dry_run=dry_run
        )
        self.add_result(result)


class ChickenWeightResource(BaseChickenResource):
    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        
        week_columns = list(df.filter(regex=col_filter))
        
        df = df.replace(np.nan, None)
        df_pedigree = df[df.columns.drop(week_columns)]
        
        self.df_data = df.filter(
            regex=(col_filter)).copy(deep=True)
        self.df_data[TAG_COLUMN_NAME] = df[TAG_COLUMN_NAME]

        self.df_data = pd.melt(
            self.df_data, 
            id_vars=[TAG_COLUMN_NAME], 
            value_vars=week_columns,
            value_name=BODY_WEIGHT,
            var_name=WEEK)
        self.df_data = self.df_data.dropna()
        self.df_data[WEEK] = self.df_data[WEEK].str.replace(
                '\D+', '', regex=True)  # Remove week stirng
        return df_pedigree
    
    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        self.import_body_weight(self.df_data, dry_run=dry_run)


class ChickenFeedResource(BaseChickenResource):
    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        
        week_columns = list(df.filter(regex=col_filter))
        
        df = df.replace(np.nan, None)
        df_pedigree = df[df.columns.drop(week_columns)]
        
        self.df_data = df.filter(
            regex=(col_filter)).copy(deep=True)
        self.df_data[TAG_COLUMN_NAME] = df[TAG_COLUMN_NAME]

        self.df_data = pd.melt(
            self.df_data, 
            id_vars=[TAG_COLUMN_NAME], 
            value_vars=week_columns,
            value_name=BODY_WEIGHT,
            var_name=WEEK)
        self.df_data = self.df_data.dropna()
        self.df_data[WEEK] = self.df_data[WEEK].str.replace(
                '\D+', '', regex=True)  # Remove week stirng
        return df_pedigree
    
    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        self.import_feed_intake(self.df_data, dry_run=dry_run)


class _WeightResource(BaseResource):
    chicken = fields.Field(
        column_name=TAG_COLUMN_NAME,
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    week = fields.Field(column_name=WEEK, attribute='week')
    weight = fields.Field(column_name=BODY_WEIGHT, attribute='weight')
    
    class Meta:
        model = Weight
        import_id_fields = ['chicken', 'week']
        exclude = ['id']
        fields = ['chicken', 'week', 'weight']



class _FeedResource(BaseResource):
    chicken = fields.Field(
        column_name=TAG_COLUMN_NAME,
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    week = fields.Field(column_name=WEEK, attribute='week')
    weight = fields.Field(column_name=FEED_WEIGHT, attribute='weight')

    class Meta:
        model = Feed
        import_id_fields = ['chicken', 'week']
        exclude = ['id']
        fields = ['chicken', 'week', 'weight']


class _EggResource(BaseResource):
    chicken = fields.Field(
        column_name=TAG_COLUMN_NAME,
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    week = fields.Field(column_name=WEEK, attribute='week')
    eggs = fields.Field(column_name=NO_EGGS, attribute='eggs')
    weight = fields.Field(column_name=EGGS_WEIGHT, attribute='weight')

    class Meta:
        model = Egg
        import_id_fields = ['chicken', 'week']
        exclude = ['id']
        fields = ['chicken', 'week', 'eggs', 'weight']


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


class ChickenBodyWeightExportResource(BaseChickenResource):
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


class BaseExportResource():
    def __init__(self) -> None:
        self.csv = ""
        self.xlsx = ""

    def get_queryset(self):
        """ Overide here to filter your custom queryset"""
        return self.Meta.model.objects.all()


class ChickenRecordsetResource(BaseChickenRecordsetResource):
    week = fields.Field(column_name='week', attribute='week')
    feed_weight = fields.Field(
        column_name='Feed Intake', attribute='feed_weight')
    body_weight = fields.Field(
        column_name='Body Weight', attribute='body_weight')
    no_eggs = fields.Field(column_name=NO_EGGS, attribute='no_eggs')
    eggs_weight = fields.Field(
        column_name=EGGS_WEIGHT, attribute='eggs_weight')

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
        headers = self.get_export_headers()
        data = tablib.Dataset(headers=headers)

        for obj in self.iter_queryset(queryset):
            data.append(self.export_resource(obj))

        df = data.export('df')

        if (df.empty):
            raise Exception('Data is empty')

        list_of_weeks = np.array(df['week'].unique().tolist()).astype(int)
        list_of_weeks = np.sort(list_of_weeks).astype(str).tolist()

        # Sum values if duplicates are found
        df = df.pivot_table(
            index=[
                self.fields['tag'].column_name,
                self.fields['hatch_date'].column_name,
                self.fields['sex'].column_name,
                self.fields['generation'].column_name,
                self.fields['breed'].column_name,
                self.fields['hatchery'].column_name,
                self.fields['house'].column_name,
                self.fields['pen'].column_name,
                self.fields['sire'].column_name,
                self.fields['dam'].column_name,
                self.fields['reduction_date'].column_name,
                self.fields['reduction_reason'].column_name,
            ],
            columns=[self.fields['week'].column_name],
            values=[self.fields['body_weight'].column_name, self.fields['feed_weight'].column_name,
                    self.fields['no_eggs'].column_name, self.fields['eggs_weight'].column_name],
            aggfunc='sum')

        df.columns = df.columns.swaplevel(0, 1)
        col_index = pd.MultiIndex.from_product(
            [
                list_of_weeks,
                [self.fields['body_weight'].column_name, self.fields['feed_weight'].column_name,
                 self.fields['no_eggs'].column_name, self.fields['eggs_weight'].column_name]
            ]
        )
        df = df.reindex(col_index, axis='columns')

        self.after_export(queryset, data, *args, **kwargs)

        buffer = io.BytesIO()
        with pd.ExcelWriter(buffer) as writer:
            df.to_excel(writer)
        buffer.seek(0)

        # Custom Exports
        self.xlsx = buffer.read()

        return self

    class Meta:
        model = ChickenRecordset
        import_id_fields = ['chicken']
        exclude = ['id']
        fields = ['tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason', 'color']


class ChickenFeedFCRResource(BaseChickenRecordsetResource):
    week = fields.Field(column_name='week', attribute='week')
    weight = fields.Field(column_name='Weight (g)', attribute='weight')

    def export(self, *args, queryset=None, **kwargs):
        if len(args) == 1 and (
            isinstance(args[0], QuerySet) or isinstance(args[0], list)
        ):
            warnings.warn(
                "'queryset' must be supplied as a named parameter",
                category=DeprecationWarning,
            )
            queryset = args[0]

        # Remove batch feed parent
        queryset = queryset.filter(chicken__isnull=False)

        self.before_export(queryset, *args, **kwargs)

        if queryset is None:
            queryset = self.get_queryset()
        queryset = self.filter_export(queryset, *args, **kwargs)
        headers = self.get_export_headers()
        data = tablib.Dataset(headers=headers)

        for obj in self.iter_queryset(queryset):
            data.append(self.export_resource(obj))

        df = data.export('df')

        df.groupby([
            self.fields['tag'].column_name,
            self.fields['week'].column_name
        ])[self.fields['weight'].column_name].sum()
        # df['weight_sum'] = df[self.fields['weight'].column_name].transform(
        #     'sum')
        self.after_export(queryset, data, *args, **kwargs)

        return data

    class Meta:
        model = Feed
