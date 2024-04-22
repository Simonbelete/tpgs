from django.db.models import F, Q, ExpressionWrapper, DurationField
from datetime import timedelta

def get_alive_chickens(queryset, week):
    """Get Current week alive chickens

    Args:
        queryset (Chicken): chicken queryset
        week (number): 
    """
    
    duration = ExpressionWrapper(
                F('reduction_date') - F('hatch_date'), output_field=DurationField())
    queryset = queryset.annotate(
                duration=duration)
        
    queryset = queryset.filter(
                    Q(duration__gte=timedelta(weeks=week)) | Q(duration=None))

    return queryset

def get_alive_chickens_id(queryset, week):
    return list(get_alive_chickens(queryset, week).values_list('id', flat=True))

def get_dead_chickens(queryset, week):
    """Get Current week alive chickens

        Args:
            queryset (Chicken): chicken queryset
            week (number): 
    """
    duration = ExpressionWrapper(
                F('reduction_date') - F('hatch_date'), output_field=DurationField())
    queryset = queryset.annotate(
                duration=duration)
    queryset = queryset.filter(
                duration__gte=timedelta(weeks=week-1),
                duration__lte=timedelta(weeks=week))
    return queryset