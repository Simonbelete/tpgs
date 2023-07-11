from django.shortcuts import render
from rest_framework import viewsets, status

from core.views import HistoryViewSet
from . import models
from . import serializers
