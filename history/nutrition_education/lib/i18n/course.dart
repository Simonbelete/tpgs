import 'package:flutter/material.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

import '../model/course_model.dart';

import './nutrition_and_the_village/all.dart' as nutrition_and_the_village;
import './cycles_of_malnutrition/all.dart' as cycles_of_malnutrition;
import './food_benefits/all.dart' as food_benefits;
import './amount_of_sugar_and_fat/all.dart' as amount_of_sugar_and_fat;
import './healthy_breakfast/all.dart' as healthy_breakfast;
import './food_safety_standards/all.dart' as food_safety_standards;
import './hygiene_and_sanitation/all.dart' as hygiene_and_sanitation;
import './fruit_and_vegetables/all.dart' as fruit_and_vegetables;
import './healthy_food_for_children/all.dart' as healthy_food_for_children;

Map<String, Map<String, Course>> courseData = {
  'nutrition_and_the_village': {
    'en': nutrition_and_the_village.EN,
    'am': nutrition_and_the_village.AM,
    'sw': nutrition_and_the_village.SW,
  },
  'cycles_of_malnutrition': {
    'en': cycles_of_malnutrition.EN,
    'am': cycles_of_malnutrition.AM,
    'sw': cycles_of_malnutrition.SW,
  },
  'food_benefits': {
    'en': food_benefits.EN,
    'am': food_benefits.AM,
    'sw': food_benefits.SW,
  },
  'amount_of_sugar_and_fat': {
    'en': amount_of_sugar_and_fat.EN,
    'am': amount_of_sugar_and_fat.AM,
    'sw': amount_of_sugar_and_fat.SW,
  },
  'healthy_breakfast': {
    'en': healthy_breakfast.EN,
    'am': healthy_breakfast.AM,
    'sw': healthy_breakfast.SW,
  },
  'food_safety_standards': {
    'en': food_safety_standards.EN,
    'am': food_safety_standards.AM,
    'sw': food_safety_standards.SW
  },
  'hygiene_and_sanitation': {
    'en': hygiene_and_sanitation.EN,
    'am': hygiene_and_sanitation.AM,
    'sw': hygiene_and_sanitation.SW
  },
  'fruit_and_vegetables': {
    'en': fruit_and_vegetables.EN,
    'am': fruit_and_vegetables.AM,
    'sw': fruit_and_vegetables.SW
  },
  'healthy_food_for_children': {
    'en': healthy_food_for_children.EN,
    'am': healthy_food_for_children.AM,
    'sw': healthy_food_for_children.SW,
  }
};
