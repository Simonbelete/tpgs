import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient EN = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'Fats',
    icon: 'assets/icons/lipid.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      Paragraph(
          title: 'Fats ',
          body:
              'provide the body with essential fatty acids to build cell membranes and make hormones. They also help the body absorb and transport some of the essential vitamins. Fats also provide the body with a concentrated source of energy. Fats are necessary for growth, reproduction, skin integrity, maintaining cells, and using body fat for energy.'),
      SubTitleText(text: 'Source of Fats'),
      FoodListTile(
          image: 'assets/materials/vegetable_oil.png',
          title: 'Cooking oil',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/egg.png', title: 'Egg', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/avocado.png',
          title: 'Avocado',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/milk.png', title: 'Milk', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/fish.png', title: 'Fish', subtitle: ''),
    ]));
