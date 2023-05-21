import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient SW = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'Protini',
    icon: 'assets/icons/meat.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      Paragraph(
          title: 'Protini ',
          body:
              'kuupa mwili asidi muhimu ya amino ambayo ina anuwai ya kazi: ukuaji na ukuzaji, ukarabati au uingizwaji wa tishu, utengenezaji wa vimeng\'enya vya kimetaboliki na usagaji chakula, na baadhi ya homoni.'),
      SubTitleText(text: 'Chanzo cha Protini'),
      FoodListTile(
          image: 'assets/materials/raw_meat.png', title: 'Nyama', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/fish.png', title: 'Samaki', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/egg.png', title: 'Yai', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/milk.png', title: 'Maziwa', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/yogurt_food.jpg',
          title: 'Mgando',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/raw_chicken.png',
          title: 'Kuku',
          subtitle: ''),
    ]));
