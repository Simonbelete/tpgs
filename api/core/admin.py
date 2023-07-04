from django.contrib import admin
from django.contrib.admin import site
import adminactions.actions as actions

actions.add_to_site(site)
