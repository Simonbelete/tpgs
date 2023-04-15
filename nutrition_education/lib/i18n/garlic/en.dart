import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food EN = Food(
  coverImage: 'assets/materials/garlic_image.png',
  title: 'Garlic',
  description: const Paragraph(
      title: '',
      body:
          'For thousands of years, before this spice was used to flavor your favorite dishes, it was employed as a medical treatment in ancient cultures. The health benefits of garlic were used by Chinese, Egyptian, and Roman civilizations. There is substantial documentation of their usage of garlic for its medicinal properties.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Minerals Found in Garlic'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Manganese',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
            icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true, text: 'Iron', icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'Zinc', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Phosphorus',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Garlic'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamin C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamin B6',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Health benefits of garlic'),
    Bullet(children: [
      'Garlic Helps Boost Your Body\'s Immune System',
      'Garlic Helps Reduce High Blood Pressure',
      'Garlic Helps Reduce Cholesterol Levels',
      'Garlic Has Antibiotic Properties',
      'Garlic Can Improve Athletic Performance'
    ])
  ]),
);
