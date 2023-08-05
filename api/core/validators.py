from django.core.validators import MinValueValidator, MaxValueValidator

PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]
WEEK_VALIDATOR = [MinValueValidator(0)]
