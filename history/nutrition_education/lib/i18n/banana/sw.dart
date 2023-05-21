import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/banana.png',
  title: 'Ndizi',
  description: const Paragraph(
      title: '',
      body:
          'Ndizi ni miongoni mwa mazao muhimu ya chakula duniani. Ndizi ni chanzo chenye afya cha nyuzinyuzi, potasiamu, vitamini B6, vitamini C, na antioxidants mbalimbali na phytonutrients.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikana Katika Ndizi'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Magnesiamu',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true,
            text: 'Potasiamu',
            icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Banana'),
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
    SubTitleText(text: 'Faida za ndizi kiafya'),
    Bullet(children: ['Afya ya usagaji chakula', 'Afya ya moyo'])
  ]),
);
