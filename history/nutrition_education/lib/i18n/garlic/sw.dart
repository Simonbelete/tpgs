import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/garlic_image.png',
  title: 'Kitunguu saumu',
  description: const Paragraph(
      title: '',
      body:
          'For thousands of years, before this spice was used to flavor your favorite dishes, it was employed as a medical treatment in ancient cultures. The health benefits of garlic were used by Chinese, Egyptian, and Roman civilizations. There is substantial documentation of their usage of garlic for its medicinal properties.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikanayo kwenye Kitunguu saumu'),
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
            horizontal: true,
            text: 'Chuma',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'Zinki', icon: 'assets/icons/nutrients.png')
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
            text: 'Fosforasi',
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
            text: 'Vitamini C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini B6',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Faida za kiafya za vitunguu'),
    Bullet(children: [
      'Kitunguu saumu Husaidia Kuongeza Kinga ya Mwili Wako',
      'Kitunguu saumu Husaidia Kupunguza Shinikizo la Damu',
      'Kitunguu saumu Husaidia Kupunguza Viwango vya Cholesterol',
      'Kitunguu saumu kina sifa ya viuatilifu',
      'Kitunguu saumu kinaweza Kuboresha Utendaji wa Kiriadha'
    ])
  ]),
);
