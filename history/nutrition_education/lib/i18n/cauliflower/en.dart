import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food EN = Food(
  coverImage: 'assets/materials/cauliflower.png',
  title: 'Cauliflower',
  description: const Paragraph(
      title: '',
      body:
          'Cauliflower is one of several vegetables in the species Brassica oleracea in the genus Brassica, which is in the Brassicaceae (or mustard) family. It is an annual plant that reproduces by seed. Typically, only the head is eaten – the edible white flesh is sometimes called "curd" (with a similar appearance to cheese curd)'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Minerals Found in '),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'Iron', icon: 'assets/icons/nutrients.png')
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
            text: 'Sodium',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Cauliflower'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamin C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamin K',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const []),
);
