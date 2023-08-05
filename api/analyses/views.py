from django.shortcuts import render
from rest_framework import viewsets, status


class AnalyseDirectory(viewsets.ViewSet):
    """
        Returns list of all combinations 
    """
