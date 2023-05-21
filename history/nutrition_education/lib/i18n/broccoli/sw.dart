import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/broccoli.png',
  title: 'Brokoli',
  description: const Paragraph(
      title: '',
      body:
          'Brokoli ina virutubisho vingi, ikiwa ni pamoja na nyuzinyuzi, vitamini C, vitamini K, chuma na potasiamu. Pia ina protini nyingi kuliko mboga nyingine nyingi.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikanayo kwenye Brokoli'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true,
            text: 'Fosforasi',
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
            text: 'Magnesiamu',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'Iron', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamini vinavyopatikana katika Brokoli'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamini A',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini B',
            icon: 'assets/icons/vitamins.png')
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
            text: 'Vitamini C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini E',
            icon: 'assets/icons/vitamins.png')
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
            text: 'Vitamini K',
            icon: 'assets/icons/vitamins.png'),
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: '',
        body:
            'Mboga hii ya kijani kibichi inaweza kufurahia mbichi na kupikwa, lakini utafiti wa hivi majuzi unaonyesha kuwa kuanika kwa upole hutoa manufaa zaidi kiafya.'),
    Bullet(children: [
      'Kuzuia saratani',
      'Viwango vya chini vya cholesterol',
      'Afya ya macho'
    ])
  ]),
);
