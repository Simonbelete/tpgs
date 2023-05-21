import 'package:flutter/material.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient EN = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'Proteins',
    icon: 'assets/icons/meat.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      Paragraph(
          title: 'Proteins ',
          body:
              'provide the body with essential amino acids that have a range of functions: growth and development, repair or replacement of tissues, production of metabolic and digestive enzymes, and some hormones.'),
      SubTitleText(text: 'Source of Proteins'),
      FoodListTile(
          image: 'assets/materials/raw_meat.png', title: 'Meat', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/fish.png', title: 'Fish', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/egg.png', title: 'Egg', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/milk.png', title: 'Milk', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/yogurt_food.jpg',
          title: 'Yogurt',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/raw_chicken.png',
          title: 'Chicken',
          subtitle: ''),
    ]));
