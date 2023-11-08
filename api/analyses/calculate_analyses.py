from django.db.models import Count, Sum, Avg, F, Q
from datetime import timedelta, date


def calculate_hdep(chickens_queryset, eggs_queryset, week):
    """Calculate HDEP

    Args:
        chickens_queryset (QuerySet): chicken Queryset
        eggs_queryset (QuerySet): chicken Queryset
        week (number): Week number
    """
    weekly_no_eggs = eggs_queryset.filter(week=week).aggregate(
        sum=Sum('eggs'))['sum'] or 0
    hen_days = chickens_queryset.filter(
        sex="F").exclude(hatch_date=None).annotate(
        current_date=F('hatch_date')+timedelta(weeks=week)
    ).filter(Q(current_date__lte=F('reduction_date')) | Q(reduction_date=None)).count()

    hdep = weekly_no_eggs / \
        (hen_days * 7) * 100 if hen_days != 0 else 0

    return {
        'week': week,
        'no_of_eggs': weekly_no_eggs,
        'no_of_hen_days': hen_days,
        'hdep': "{:.3f}".format(hdep)
    }


def calculate_hhep(chickens_queryset, eggs_queryset, week):
    """Calculate HDEP

    Args:
        chickens_queryset (QuerySet): chicken Queryset
        eggs_queryset (QuerySet): chicken Queryset
        week (number): Week number
    """
    weekly_no_eggs = eggs_queryset.filter(week=week).aggregate(
        sum=Sum('eggs'))['sum'] or 0
    hen_days = chickens_queryset.filter(
        sex="F").exclude(hatch_date=None).count()

    hhep = weekly_no_eggs / \
        (hen_days * 7) * 100 if hen_days != 0 else 0

    return {
        'week': week,
        'no_of_eggs': weekly_no_eggs,
        'no_of_hen_days': hen_days,
        'hhep': "{:.3f}".format(hhep)
    }


def calculate_egg_mass(chickens_queryset, eggs_queryset, week):
    """Egg Mass
    return average egg mass in per hen per day in grams

    Args:
        chickens_queryset (QuerySet): chicken Queryset
        eggs_queryset (QuerySet): chicken Queryset
        week (number): Week number
    """

    hdep = calculate_hdep(chickens_queryset, eggs_queryset, week)

    total_egg_weight = eggs_queryset.aggregate(
        weight_sum=Sum('weight'))['weight_sum'] or 0

    total_no_eggs = eggs_queryset.aggregate(
        eggs_count=Count('eggs'))['eggs_count'] or 0

    avg_egg_weight = total_egg_weight / total_no_eggs if total_no_eggs != 0 else 0

    return {
        'egg_mass': "{:.3f}".format(avg_egg_weight),
        'hdep': hdep,
        'total_egg_weight': "{:.3f}".format(total_egg_weight),
        'total_no_eggs': "{:.3f}".format(total_no_eggs)
    }
