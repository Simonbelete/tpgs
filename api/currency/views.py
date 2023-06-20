from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from djmoney.settings import CURRENCY_CHOICES


class CurrencyList(APIView):
    def get(self, request):
        currency_lists = [{'code': curr[0], 'name': curr[1]}
                          for curr in CURRENCY_CHOICES]
        return Response(currency_lists)
