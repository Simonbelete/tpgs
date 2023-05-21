import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient EN = Nutrient(
  coverImage: 'assets/materials/vitamind_opengraph.jpg',
  name: 'Vitamins',
  icon: 'assets/icons/supplement.png',
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Paragraph(
          title: 'Vitamins ',
          body:
              'are a group of organic compounds that play essential functions in the body but cannot be made by the body. Some vitamins can be stored in the body, so they need to be eaten often but not every day (fat-soluble vitamins A, D, E, and K). In contrast, others cannot be stored and should be eaten daily (water-soluble B vitamins, vitamin C). '),
      SubTitleText(text: 'Sources of vitamins'),
      FoodListTile(
          image: 'assets/materials/carot.png', title: 'Carrot', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/tomato.png', title: 'Tomato', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/watermelon.png',
          title: 'Watermelon',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/avocado.png',
          title: 'Avocado',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/banana.png', title: 'Banana', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/orange.png', title: 'Orange', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/pumpkin.png', title: 'Pumpkin', subtitle: '')
    ],
  ),
);
