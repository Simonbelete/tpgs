import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/red_pepper.png',
  title: 'Pilipili nyekundu',
  description: Paragraph(title: '', body: ''),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikanayo kwenye Pilipili Nyekundu'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Potasiamu',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(
        text: 'Vitamini vinavyopatikana katika pilipili nyekundu'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamini C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini B6',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const []),
);
