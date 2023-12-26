import io
import pandas as pd
import numpy as np
from decimal import Decimal
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape, A4, A1, A2
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from django.http import FileResponse
from rest_framework.exceptions import NotFound
from rest_framework import generics
from django.db import connection
from scipy.optimize import linprog

from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    GenericExportView,
    GenericImportView
)
from core.pagination import AllPagination
from . import models
from . import serializers
from . import admin
from . import filters
from ingredients.models import IngredientNutrient
from nutrients.serializers import NutrientSerializer_GET
from nutrients.models import Nutrient
from .formulate import Formulate


class FormulaViewSet(CoreModelViewSet):
    queryset = models.Formula.all.all()
    serializer_class = serializers.FormulaSerializer_GET
    filterset_class = filters.FormulaFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.FormulaSerializer_POST
        return serializers.FormulaSerializer_GET


class FormulaHistoryViewSet(HistoryViewSet):
    queryset = models.Formula.history.all()
    serializer_class = serializers.FormulaHistorySerializer


class FormulaSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Formula.all.get(pk=self.id_pk)


# Formula Requirement
class FormulaRequirementViewSet(CoreModelViewSet):
    queryset = models.FormulaRequirement.all.all()
    serializer_class = serializers.FormulaRequirementSerializer_GET

    def get_queryset(self):
        if ('formula_pk' in self.kwargs):
            return self.queryset.filter(formula=self.kwargs['formula_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.FormulaRequirementSerializer_POST
        return serializers.FormulaRequirementSerializer_GET


class AllFormulaRequirementViewSet(CoreModelViewSet):
    queryset = models.FormulaRequirement.all.all().order_by('-nutrient__order')
    pagination_class = AllPagination
    serializer_class = serializers.AllFormulaRequirementSerializer_GET

    def get_queryset(self):
        if ('formula_pk' in self.kwargs):
            return self.queryset.filter(formula=self.kwargs['formula_pk'])
        return self.querysetT


class FormulaRequirementExport(GenericExportView):
    def get_dataset(self):
        return admin.FormulaRequirementResource().export()


class FormulaRequirementImport(GenericImportView):
    def get_resource(self):
        return admin.FormulaRequirementResource()


class FormulaRequirementHistoryViewSet(HistoryViewSet):
    queryset = models.FormulaRequirement.history.all()
    serializer_class = serializers.FormulaRequirementHistorySerializer


class FormulaRequirementSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.FormulaRequirement.all.get(pk=self.id_pk)


# Formula Rations

class FormulaRationViewSet(CoreModelViewSet):
    queryset = models.FormulaRation.all.all()
    serializer_class = serializers.FormulaRationSerializer_GET

    def get_queryset(self):
        if ('formula_pk' in self.kwargs):
            return self.queryset.filter(formula=self.kwargs['formula_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.FormulaRationSerializer_POST
        return serializers.FormulaRationSerializer_GET


class AllFormulaRationViewSet(CoreModelViewSet):
    queryset = models.FormulaRation.objects.all().order_by('-nutrient__order')
    pagination_class = AllPagination
    serializer_class = serializers.AllFormulaRationSerializer_GET

    def get_queryset(self):
        if ('formula_pk' in self.kwargs):
            return self.queryset.filter(formula=self.kwargs['formula_pk'])
        return self.queryset


class FormulaRationExport(GenericExportView):
    def get_dataset(self):
        return admin.FormulaRationResource().export()


class FormulaRationImport(GenericImportView):
    def get_resource(self):
        return admin.FormulaRationResource()


class FormulaRationHistoryViewSet(HistoryViewSet):
    queryset = models.FormulaRation.history.all()
    serializer_class = serializers.FormulaRationHistorySerializer


class FormulaRationSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.FormulaRation.all.get(pk=self.id_pk)


# Formula Ingredients

class FormulaIngredientViewSet(CoreModelViewSet):
    queryset = models.FormulaIngredient.all.all()
    serializer_class = serializers.FormulaIngredientSerializer_GET

    def get_queryset(self):
        if ('formula_pk' in self.kwargs):
            return self.queryset.filter(formula=self.kwargs['formula_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.FormulaIngredientSerializer_POST
        return serializers.FormulaIngredientSerializer_GET


class AllFormulaIngredientViewSet(CoreModelViewSet):
    queryset = models.FormulaIngredient.objects.all()
    pagination_class = AllPagination
    serializer_class = serializers.AllFormulaIngredientSerializer_GET

    def get_queryset(self):
        if ('formula_pk' in self.kwargs):
            return self.queryset.filter(formula=self.kwargs['formula_pk'])
        return self.queryset


class FormulaIngredientExport(GenericExportView):
    def get_dataset(self):
        return admin.FormulaIngredientResource().export()


class FormulaIngredientImport(GenericImportView):
    def get_resource(self):
        return admin.FormulaIngredientResource()


class FormulaIngredientHistoryViewSet(HistoryViewSet):
    queryset = models.FormulaIngredient.history.all()
    serializer_class = serializers.FormulaIngredientHistorySerializer


class FormulaIngredientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.FormulaIngredient.all.get(pk=self.id_pk)


# Formulate Calculation

class FormulateViewSet(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Formula.all.get(pk=self.kwargs['formula_pk'])
        except models.Formula.DoesNotExist as ex:
            raise NotFound()

    def create(self, request, formula_pk=None):
        formula = self.get_queryset()
        f = Formulate(formula)
        f.compute()
        f.save()
        data = serializers.FormulaSerializer_GET(self.get_queryset())
        return Response(data.data)

# Print Pdf


class FormulaPrintPdf(viewsets.ViewSet):
    """Return computed total cost and total nutrients sum
    """

    def get_queryset(self):
        try:
            return models.Formula.all.get(pk=self.kwargs['formula_pk'])
        except models.Formula.DoesNotExist as ex:
            raise NotFound()

    def create(self, request, formula_pk=None):
        formula = self.get_queryset()

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, rightMargin=72, leftMargin=72,
                                topMargin=72, bottomMargin=72, pagesize=A2)  # pagesize=(landscape(A2)))

        ingredient_ids = formula.ingredients.values_list('id')
        ingredient_ids = list(zip(*ingredient_ids))[0]
        ingredient_nutrient = IngredientNutrient.objects.filter(
            ingredient__in=ingredient_ids)
        abbvers = np.array(
            list(zip(*ingredient_nutrient.values_list('nutrient__abbreviation').distinct())))
        abbvers = np.sort(abbvers)

        columns = np.array(['Name', '%', 'Unit Price (kg)',
                           'Weight (Kg)', 'Batch Price (kg)', 'DM (%)'])
        columns = np.append(columns, abbvers)
        columns = np.append(columns, ['Min (%)', 'Max (%)'])

        data = pd.DataFrame([], columns=columns)

        for formula_ingredient in models.FormulaIngredient.objects.filter(formula=formula).iterator():
            ingredient_nutrients_list = IngredientNutrient.objects.filter(
                ingredient=formula_ingredient.ingredient).values_list('nutrient__abbreviation', 'value')
            ingredient_nutrients_dict = dict(ingredient_nutrients_list)
            data.loc[-1] = {
                'Name': formula_ingredient.ingredient.name,
                '%': formula_ingredient.ration,
                'Unit Price (kg)': formula_ingredient.ingredient.price,
                'Weight (Kg)': formula_ingredient.ration_weight,
                'Batch Price (Kg)': formula_ingredient.ration_price,
                'DM (%)': formula_ingredient.ingredient.dm,
                'Min (%)': formula_ingredient.ratio_max,
                'Max (%)': formula_ingredient.ratio_max,
                **ingredient_nutrients_dict
            }
            data = data.reset_index(drop=True)

        ration_nutrients_dict = dict(models.FormulaRation.objects.filter(
            formula=formula).values_list('nutrient__abbreviation', 'value'))
        data.loc[-1] = {
            'Name': 'Ration',
            '%': formula.ration_ratio,
            'Unit Price (kg)': formula.unit_price,
            'Weight (Kg)': formula.ration_weight,
            'Batch Price (Kg)': formula.ration_price,
            'DM (%)': formula.ration_dm,
            'Min (%)': '-',
            'Max (%)': '-',
            **ration_nutrients_dict
        }

        requirement_nutrients_dict = dict(models.FormulaRequirement.objects.filter(
            formula=formula).values_list('nutrient__abbreviation', 'value'))
        data.loc[-2] = {
            'Name': 'Requirement',
            '%': formula.desired_ratio,
            'Unit Price (kg)': '-',
            'Weight (Kg)': formula.ration_weight,
            'Batch Price (Kg)': formula.budget,
            'DM (%)': formula.desired_dm,
            'Min (%)': '-',
            'Max (%)': '-',
            **requirement_nutrients_dict
        }

        data = data.reset_index(drop=True)
        data.fillna(0, inplace=True)

        data_2d = np.vstack([columns, data.to_numpy()])
        t = Table(data_2d.tolist(), style=[
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ])

        doc.build([t])

        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename="formula.pdf")


# Formula -> Ingredient -> Nutrients
class FormulaIngredientNutrients(viewsets.ViewSet):
    """Eacth ingredient's nutrient contribution with the requried nutrient
    """

    def get_queryset(self):
        try:
            return models.FormulaIngredient.all.get(formula=self.kwargs['formula_pk'], pk=self.kwargs['ingredient_pk'])
        except models.FormulaIngredient.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, formula_pk=None, ingredient_pk=None):
        data = []
        formula_ingredient = self.get_queryset()
        formula_requirement = models.FormulaRequirement.objects.filter(
            formula=formula_pk)
        for ingredient_nutrient in IngredientNutrient.objects.filter(
                ingredient=formula_ingredient.ingredient).iterator():
            nutrient_req = formula_requirement.filter(
                nutrient=ingredient_nutrient.nutrient)
            if not nutrient_req:
                nutrient_req = 0
            else:
                nutrient_req = nutrient_req[0]
            data.append({
                **NutrientSerializer_GET(ingredient_nutrient.nutrient).data,
                'contribution': formula_ingredient.ration * ingredient_nutrient.value / 100,
                'requirement': nutrient_req,
                'unit': ingredient_nutrient.nutrient.unit.name
            })
        return Response({'results': data})


# Formula Nutrients
class FormulaNutrients(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Formula.all.get(pk=self.kwargs['id'])
        except models.Formula.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None):
        formula = self.get_queryset()
        ingredient_ids = formula.ingredients.values_list('id')
        ingredient_ids = list(zip(*ingredient_ids))[0]
        cursor = connection.cursor()
        cursor.execute("""
            SELECT 
                fr.nutrient_id AS id, nn.name AS name,nn.nutrient_group_id,
                fr.id AS ration_id, fr.value AS ration_value,
                frq.id AS requirement_id, frq.value AS requirement_value,
                ((fr.value * frq.value) / 100) AS achived_goal
            FROM formulas_formularation fr
            LEFT JOIN formulas_formularequirement frq
                ON fr.nutrient_id = frq.nutrient_id
            INNER JOIN nutrients_nutrient nn
                ON nn.id = fr.nutrient_id
            WHERE fr.formula_id = {formula_id}
                AND frq.formula_id = {formula_id};
        """.format(formula_id=formula.id))

        columns = ['id', 'name', 'nutrient_group_id', 'ration_id',
                   'ration_value', 'requirement_id', 'requirement_value', 'achived_goal']

        return Response({
            'results': [dict(zip(columns, row)) for row in cursor.fetchall()]
        }, status=200)


class FormulaMatrix(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Formula.all.get(pk=self.kwargs['id'])
        except models.Formula.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None):
        formula = self.get_queryset()
        queryset = models.FormulaIngredient.objects.filter(formula=formula)
        result = []
        for query in queryset.iterator():
            ingredient_nutrients = IngredientNutrient.objects.filter(
                ingredient=query.ingredient.id).exclude(nutrient__nutrient_group__name="Energy")
            nutrients = ingredient_nutrients.values_list(
                'nutrient__name', flat=True)
            values = ingredient_nutrients.values_list('value', flat=True)
            values = query.ration * np.array(values) / 100

            result.append({
                'id': query.id,
                'ingredient': {
                    'name': query.ingredient.name
                },
                'ration': query.ration,
                'price': query.price,
                'ration_weight': query.ration_weight,
                'ration_price': query.ration_price,
                'nutrients': nutrients,
                'values': values
            })

        return Response({'results': result}, status=200)


class FormulaIngredientAnalyses(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.FormulaIngredient.all.get(formula=self.kwargs['formula_pk'], pk=self.kwargs['ingredient_pk'])
        except models.FormulaIngredient.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, formula_pk=None):

        return Response({}, status=200)


class SolveViewSet(viewsets.ViewSet):
    def create(self, request):
        ingredient_ids = []
        ingredient_min_dict = {}
        ingredient_max_dict = {}

        for i in request.data['ingredients']:
            key = i['id']
            ingredient_ids.append(key)
            ingredient_min_dict[key] = i['min']
            ingredient_max_dict[key] = i['max']

        ingredient_nutrients = IngredientNutrient.all.filter(
            ingredient__in=ingredient_ids)
        requirements = request.data['requirements']

        df = pd.DataFrame(list(ingredient_nutrients.values(
            'ingredient', 'nutrient', 'value', 'ingredient__price')))

        # Add Min Max to df
        df['max'] = df['ingredient'].map(ingredient_max_dict)
        df['min'] = df['ingredient'].map(ingredient_min_dict)

        # Type Case
        df = df.astype({'value': 'float64', 'ingredient__price': 'float64',
                       'min': 'float64', 'max': 'float64'})

        df_1 = df[['ingredient', 'ingredient__price',
                   'min', 'max']].drop_duplicates()
        df_1.set_index('ingredient', inplace=True)

        df = df.pivot_table(index="ingredient",
                            columns="nutrient", values="value", fill_value=0)
        df_1 = df_1.reindex(df.index)

        df_req = pd.DataFrame.from_dict(requirements)
        df_req = df_req.astype({'value': 'float64'})
        # Sort By Nutrient
        df_req.set_index('nutrient', inplace=True)
        df_req = df_req.reindex(df.columns.values, fill_value=0)

        c = -df_1['ingredient__price'].to_numpy()

        # # Row -> Nutrients, Col -> Ingredient * Nutrient Value
        A = [df[i].values for i in df.columns]
        # A = np.divide(A, 100)
        A = np.append(A, np.multiply(A, -1), axis=0)

        # Requirements
        between = 0.2  # +|- 10%
        b = df_req['value'].values
        # b = np.divide(b, 100)
        b_min = [(i - (i * between)) * -1 for i in b]
        b_max = [i + (i * between) for i in b]
        b = np.concatenate([b_max, b_min])

        A_eq = [np.ones(len(df.index))]
        b_eq = [100]

        df_1['max'].replace(0, 100, inplace=True)
        bounds = df_1[['min', 'max']].to_numpy()

        print('******')
        print(bounds)
        print(c)
        print(A)
        print(b)

        results = linprog(c=c, A_ub=A, b_ub=b, A_eq=A_eq,
                          b_eq=b_eq, bounds=bounds, method='simplex')

        print(results)

        # results = linprog(c=c, A_ub=A, b_ub=b, A_eq=A_eq,
        #                   b_eq=b_eq, bounds=[], method='highs-ds')
        if not results.x is None:
            df_result = pd.DataFrame([results.x], columns=df.index)

            return Response({'results': df_result.to_dict('records')[0]})
        else:
            return Response({}, status=400)
