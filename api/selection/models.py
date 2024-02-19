from django.db import models
from core.models import CoreModel
from simple_history.models import HistoricalRecords


class Selection(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatchery = 
    # Stage Moved to
    stage =
    # Stages Movement Moved from  
    from_stage = 


    history = HistoricalRecords()
