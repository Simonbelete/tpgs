import 'package:nutrition_education/model/food_model.dart';

import 'egg/all.dart' as egg;
import 'broccoli/all.dart' as broccoli;
import 'carrot/all.dart' as carrot;
import 'cauliflower/all.dart' as cauliflower;
import 'chili/all.dart' as chili;
import 'eggplant/all.dart' as eggplant;
import 'garlic/all.dart' as garlic;
import 'moringa/all.dart' as moringa;
import 'pumpkin/all.dart' as pumpkin;
import 'red_bell_pepper/all.dart' as red_bell_pepper;
import 'spinach/all.dart' as spinach;
import 'yellow_tomato/all.dart' as yellow_tomato;
import 'apple/all.dart' as apple;
import 'avocado/all.dart' as avocado;
import 'banana/all.dart' as banana;
import 'citrus/all.dart' as citrus;
import 'coconut/all.dart' as coconut;
import 'dragon_fruit/all.dart' as dragon_fruit;
import 'grapes/all.dart' as grapes;
import 'guava/all.dart' as guava;
import 'mango/all.dart' as mango;
import 'papaya/all.dart' as papaya;
import 'starfruit/all.dart' as starfruit;
import 'watermelon/all.dart' as watermelon;

Map<String, Map<String, Food>> foodData = {
  'egg': {
    'en': egg.EN,
    'am': egg.AM,
    'sw': egg.SW,
  },
  'apple': {'en': apple.EN, 'am': apple.AM, 'sw': apple.SW},
  'broccoli': {'en': broccoli.EN, 'am': broccoli.AM, 'sw': broccoli.SW},
  'carrot': {'en': carrot.EN, 'am': carrot.AM, 'sw': carrot.SW},
  'cauliflower': {
    'en': cauliflower.EN,
    'am': cauliflower.AM,
    'sw': cauliflower.SW
  },
  'chili': {'en': chili.EN, 'am': chili.AM, 'sw': chili.SW},
  'eggplant': {'en': eggplant.EN, 'am': eggplant.AM, 'sw': eggplant.SW},
  'garlic': {'en': garlic.EN, 'am': garlic.AM, 'sw': garlic.SW},
  'moringa': {'en': moringa.EN, 'am': moringa.AM, 'sw': moringa.SW},
  'pumpkin': {'en': pumpkin.EN, 'am': pumpkin.AM, 'sw': pumpkin.SW},
  'red_bell_pepper': {
    'en': red_bell_pepper.EN,
    'am': red_bell_pepper.AM,
    'sw': red_bell_pepper.SW
  },
  'spinach': {'en': spinach.EN, 'am': spinach.AM, 'sw': spinach.SW},
  'yellow_tomato': {
    'en': yellow_tomato.EN,
    'am': yellow_tomato.AM,
    'sw': yellow_tomato.SW
  },
  'avocado': {'en': avocado.EN, 'am': avocado.AM, 'sw': avocado.SW},
  'banana': {'en': banana.EN, 'am': banana.AM, 'sw': banana.SW},
  'citrus': {'en': citrus.EN, 'am': citrus.AM, 'sw': citrus.SW},
  'coconut': {'en': coconut.EN, 'am': coconut.AM, 'sw': coconut.SW},
  'dragon_fruit': {
    'en': dragon_fruit.EN,
    'am': dragon_fruit.AM,
    'sw': dragon_fruit.SW
  },
  'grapes': {'en': grapes.EN, 'am': grapes.AM, 'sw': grapes.SW},
  'guava': {'en': guava.EN, 'am': guava.AM, 'sw': guava.SW},
  'mango': {'en': mango.EN, 'am': mango.AM, 'sw': mango.SW},
  'papaya': {'en': papaya.EN, 'am': papaya.AM, 'sw': papaya.SW},
  'starfruit': {'en': starfruit.EN, 'am': starfruit.AM, 'sw': starfruit.SW},
  'watermelon': {'en': watermelon.EN, 'am': watermelon.AM, 'sw': watermelon.SW}
};

Map<String, Map<String, Food>> foodDataVegetables = {
  'broccoli': {'en': broccoli.EN, 'am': broccoli.AM, 'sw': broccoli.SW},
  'carrot': {'en': carrot.EN, 'am': carrot.AM, 'sw': carrot.SW},
  'cauliflower': {
    'en': cauliflower.EN,
    'am': cauliflower.AM,
    'sw': cauliflower.SW
  },
  'chili': {'en': chili.EN, 'am': chili.AM, 'sw': chili.SW},
  'eggplant': {'en': eggplant.EN, 'am': eggplant.AM, 'sw': eggplant.SW},
  'garlic': {'en': garlic.EN, 'am': garlic.AM, 'sw': garlic.SW},
  'moringa': {'en': moringa.EN, 'am': moringa.AM, 'sw': moringa.SW},
  'pumpkin': {'en': pumpkin.EN, 'am': pumpkin.AM, 'sw': pumpkin.SW},
  'red_bell_pepper': {
    'en': red_bell_pepper.EN,
    'am': red_bell_pepper.AM,
    'red_bell_pepper': red_bell_pepper.SW
  },
  'spinach': {'en': spinach.EN, 'am': spinach.AM, 'sw': spinach.SW},
  'yellow_tomato': {
    'en': yellow_tomato.EN,
    'am': yellow_tomato.AM,
    'sw': yellow_tomato.SW
  },
};

Map<String, Map<String, Food>> foodDataFruit = {
  'apple': {'en': apple.EN, 'am': apple.AM, 'sw': apple.SW},
  'avocado': {'en': avocado.EN, 'am': avocado.AM, 'sw': avocado.SW},
  'banana': {'en': banana.EN, 'am': banana.AM, 'sw': banana.SW},
  'citrus': {'en': citrus.EN, 'am': citrus.AM, 'sw': citrus.SW},
  'coconut': {'en': coconut.EN, 'am': coconut.AM, 'sw': coconut.SW},
  'dragon_fruit': {
    'en': dragon_fruit.EN,
    'am': dragon_fruit.AM,
    'sw': dragon_fruit.SW
  },
  'grapes': {'en': grapes.EN, 'am': grapes.AM, 'sw': grapes.SW},
  'guava': {'en': guava.EN, 'am': guava.AM, 'sw': guava.SW},
  'mango': {'en': mango.EN, 'am': mango.AM, 'sw': mango.SW},
  'papaya': {'en': papaya.EN, 'am': papaya.AM, 'sw': papaya.SW},
  'starfruit': {'en': starfruit.EN, 'am': starfruit.AM, 'sw': starfruit.SW},
  'watermelon': {'en': watermelon.EN, 'am': watermelon.AM, 'sw': watermelon.SW}
};
