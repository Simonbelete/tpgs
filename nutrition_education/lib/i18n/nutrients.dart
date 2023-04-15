import 'package:flutter/material.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';
import '../model/nutrient_model.dart';

import 'vitamins/all.dart' as vitamins;
import 'carbohydrates/all.dart' as carbohydrates;
import 'protein/all.dart' as protein;
import 'fats/all.dart' as fats;
import 'minerals/all.dart' as minerals;

Map<String, Map<String, Nutrient>> nutrientsData = {
  'vitamins': {'en': vitamins.EN, 'am': vitamins.AM, 'sw': vitamins.SW},
  'carbohydrates': {
    'en': carbohydrates.EN,
    'am': carbohydrates.AM,
    'sw': carbohydrates.SW,
  },
  'protein': {'en': protein.EN, 'am': protein.AM, 'sw': protein.SW},
  'fats': {'en': fats.EN, 'am': fats.AM, 'sw': fats.SW},
  'minerals': {'en': minerals.EN, 'am': minerals.AM, 'sw': minerals.SW},
};
