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
from reportlab.lib.pagesizes import letter, landscape, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from django.http import FileResponse
from rest_framework.exceptions import NotFound
from django.db import connection

from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    GenericExportView,
    GenericImportView
)
from . import models
from . import serializers
from . import admin
from ingredients.models import IngredientNutrient
from nutrients.serializers import NutrientSerializer_GET
from nutrients.models import Nutrient
from .formulate import Formulate


class FormulaViewSet(viewsets.ModelViewSet):
    queryset = models.Formula.objects.all()
    serializer_class = serializers.FormulaSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.FormulaSerializer_POST
        return serializers.FormulaSerializer_GET


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
class FormulaRationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FormulaRationSerializer_GET

    def get_queryset(self):
        try:
            return models.FormulaRation.all.filter(formula=self.kwargs['formula_pk'])
        except models.FormulaRation.DoesNotExist as ex:
            raise NotFound()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.FormulaRationSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.FormulaRationSerializer_PATCH
        return serializers.FormulaRationSerializer_GET

    @transaction.atomic
    def create(self, validated_data):
        requirements = validated_data.pop('requirements', [])
        rations = validated_data.pop('rations', [])
        instance = models.Formula.objects.create(**validated_data)
        for req in requirements:
            nutrient = Nutrient.objects.get(
                pk=req['nutrient'])
            models.FormulaRation.objects.create(
                formula=instance, nutrient=nutrient, value=req['value'])
        return instance


class FormulaIngredientViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FormulaIngredientSerializer_GET

    def get_queryset(self):
        try:
            return models.FormulaIngredient.all.filter(formula=self.kwargs['formula_pk'])
        except models.FormulaIngredient.DoesNotExist as ex:
            raise NotFound()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.FormulaIngredientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.FormulaIngredientSerializer_PATCH
        if self.request.query_params.get('depth', 0) == 2:
            return serializers.FormulaIngredientSerializer_GET_DEPTH_2
        return serializers.FormulaIngredientSerializer_GET

# Formulate Calculation


class FormulateViewSet(viewsets.ViewSet):
    """
    """

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
        data = serializers.FormulateSerializer_POST(self.get_queryset())
        return Response({'results': data.data})

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
                                topMargin=72, bottomMargin=72, pagesize=(landscape(A4)))

        ingredient_ids = formula.ingredients.values_list('id')
        ingredient_ids = list(zip(*ingredient_ids))[0]
        ingredient_nutrient = IngredientNutrient.objects.filter(
            ingredient__in=ingredient_ids)
        abbvers = np.array(
            list(zip(*ingredient_nutrient.values_list('nutrient__abbreviation').distinct())))
        abbvers = np.sort(abbvers)

        columns = np.array(['Name', '%', 'Weight[Kg]', 'Price[Kg]', 'DM[%]'])
        columns = np.append(columns, abbvers)
        columns = np.append(columns, ['Min[%]', 'Max[%]'])

        data = pd.DataFrame([], columns=columns)

        for formula_ingredient in models.FormulaIngredient.objects.filter(formula=formula).iterator():
            ingredient_nutrients_list = IngredientNutrient.objects.filter(
                ingredient=formula_ingredient.ingredient).values_list('nutrient__abbreviation', 'value')
            ingredient_nutrients_dict = dict(ingredient_nutrients_list)
            data.loc[-1] = {
                'Name': formula_ingredient.ingredient.name,
                '%': formula_ingredient.ration,
                'Weight[Kg]': formula_ingredient.ration_weight,
                'Price[Kg]': formula_ingredient.ration_price,
                'DM[%]': formula_ingredient.ingredient.dm,
                'Min[%]': formula_ingredient.ratio_max,
                'Max[%]': formula_ingredient.ratio_max,
                **ingredient_nutrients_dict
            }
            data = data.reset_index(drop=True)

        ration_nutrients_dict = dict(models.FormulaRation.objects.filter(
            formula=formula).values_list('nutrient__abbreviation', 'value'))
        data.loc[-1] = {
            'Name': 'Ration',
            '%': formula.ration_ratio,
            'Weight[Kg]': formula.ration_weight,
            'Price[Kg]': formula.ration_price,
            'DM[%]': formula.ration_dm,
            'Min[%]': '-',
            'Max[%]': '-',
            **ration_nutrients_dict
        }

        requirement_nutrients_dict = dict(models.FormulaRequirement.objects.filter(
            formula=formula).values_list('nutrient__abbreviation', 'value'))
        data.loc[-2] = {
            'Name': 'Requirement',
            '%': formula.desired_ratio,
            'Weight[Kg]': formula.ration_weight,
            'Price[Kg]': formula.budget,
            'DM[%]': formula.desired_dm,
            'Min[%]': '-',
            'Max[%]': '-',
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
