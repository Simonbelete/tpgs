import 'package:nutrition_education/model/recipe_model.dart';

import 'chicken_and_porridge/all.dart' as chicken_and_porridge;
import 'rice_with_vegetable_and_egg/all.dart' as rice_with_vegetable_and_egg;

Map<String, Map<String, Recipe>> recipeData = {
  'chicken_and_porridge': {
    'en': chicken_and_porridge.EN,
    'am': chicken_and_porridge.AM,
    'sw': chicken_and_porridge.SW,
  },
  'rice_with_vegetable_and_egg': {
    'en': rice_with_vegetable_and_egg.EN,
    'am': rice_with_vegetable_and_egg.AM,
    'sw': rice_with_vegetable_and_egg.SW,
  }
};
