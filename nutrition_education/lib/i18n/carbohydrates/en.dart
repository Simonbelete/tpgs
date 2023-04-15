import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient EN = Nutrient(
    coverImage:
        'assets/materials/do-probiotics-help-your-immune-system-1440x810.jpg',
    name: 'Carbohydrates',
    icon: 'assets/icons/carbohydrates.png',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: 'Carbohydrates ',
            body:
                'provide the body with energy to keep alive, build and repair tissues, stay warm, and move and work. Carbohydrates are the most abundant and economical source of food energy in the human diet. '),
        SubTitleText(text: 'Source of Carbohydrates'),
        FoodListTile(
            image: 'assets/materials/banana.png',
            title: 'Banana',
            subtitle: ''),
        FoodListTile(
            image: 'assets/materials/Teff-Grain.jpg',
            title: 'Teff',
            subtitle: ''),
        FoodListTile(
            image: 'assets/materials/corn.png', title: 'Corn', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/bread.png', title: 'Bread', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/beans.png', title: 'Beans', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/potatoes.png',
            title: 'Potatoes',
            subtitle: ''),
      ],
    ));
