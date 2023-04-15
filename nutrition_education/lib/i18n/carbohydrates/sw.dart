import 'package:flutter/material.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient SW = Nutrient(
    coverImage:
        'assets/materials/do-probiotics-help-your-immune-system-1440x810.jpg',
    name: 'wanga',
    icon: 'assets/icons/carbohydrates.png',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: 'wanga ',
            body:
                'kuupa mwili nishati ya kuweka hai, kujenga na kutengeneza tishu, kuwa na joto, na kusonga na kufanya kazi. Wanga ni chanzo kikubwa zaidi na cha kiuchumi cha nishati ya chakula katika mlo wa binadamu. '),
        SubTitleText(text: 'Chanzo cha Wanga'),
        FoodListTile(
            image: 'assets/materials/banana.png', title: 'Ndizi', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/Teff-Grain.jpg',
            title: 'Teff',
            subtitle: ''),
        FoodListTile(
            image: 'assets/materials/corn.png', title: 'Mahindi', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/bread.png', title: 'Mkate', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/beans.png',
            title: 'Maharage',
            subtitle: ''),
        FoodListTile(
            image: 'assets/materials/potatoes.png',
            title: 'Viazi',
            subtitle: ''),
      ],
    ));
