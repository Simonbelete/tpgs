import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient SW = Nutrient(
  coverImage: 'assets/materials/vitamind_opengraph.jpg',
  name: 'vitamini',
  icon: 'assets/icons/supplement.png',
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Paragraph(
          title: 'vitamini ',
          body:
              'ni kundi la misombo ya kikaboni ambayo hufanya kazi muhimu katika mwili lakini haiwezi kufanywa na mwili. Vitamini vingine vinaweza kuhifadhiwa mwilini, kwa hivyo zinahitaji kuliwa mara nyingi, lakini sio kila siku (vitamini zenye mumunyifu wa mafuta A, D, E, na K). Kinyume chake, vingine haviwezi kuhifadhiwa na vinapaswa kuliwa kila siku (vitamini B, mumunyifu wa maji, vitamini C).'),
      SubTitleText(text: 'Sources of vitamins'),
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
    ],
  ),
);
