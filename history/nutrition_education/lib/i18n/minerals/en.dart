import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient EN = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'Minerals',
    icon: 'assets/icons/nutrients.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      Paragraph(
          title: 'Minerals ',
          body:
              'are solid, inorganic groups of compounds that are essential building blocks of different types of cells. Essential minerals include iron, zinc, calcium, and iodine, among others. For example, iron is part of red blood cells, which transport oxygen through the body. Zinc has many critical functions in the body, including the make-up of cells and body systems, including immune function. '),
      SubTitleText(text: 'Source of Minerals'),
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
    ]));
