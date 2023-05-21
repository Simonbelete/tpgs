import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient SW = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'Madini',
    icon: 'assets/icons/nutrients.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      Paragraph(
          title: 'Madini ',
          body:
              'ni vikundi dhabiti, vya isokaboni vya misombo ambayo ni vijenzi muhimu vya aina tofauti za seli. Madini muhimu ni pamoja na chuma, zinki, kalsiamu, na iodini, kati ya zingine. Kwa mfano, chuma ni sehemu ya chembe nyekundu za damu, ambazo husafirisha oksijeni kupitia mwili. Zinki ina kazi nyingi muhimu katika mwili, ikiwa ni pamoja na uundaji wa seli na mifumo ya mwili, ikiwa ni pamoja na kazi ya kinga.'),
      SubTitleText(text: 'Chanzo cha Madini'),
      FoodListTile(
          image: 'assets/materials/carot.png', title: 'Karoti', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/tomato.png', title: 'Nyanya', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/watermelon.png',
          title: 'Tikiti maji',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/avocado.png',
          title: 'Parachichi',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/banana.png', title: 'Ndizi', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/orange.png', title: 'Chungwa', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/pumpkin.png', title: 'Malenge', subtitle: '')
    ]));
