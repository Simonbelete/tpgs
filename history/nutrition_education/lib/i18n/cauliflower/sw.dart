import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/cauliflower.png',
  title: 'Cauliflower',
  description: const Paragraph(
      title: '',
      body:
          'Cauliflower ni mojawapo ya mboga kadhaa katika spishi Brassica oleracea katika jenasi Brassica, ambayo iko katika familia ya Brassicaceae (au haradali). Ni mmea wa kila mwaka ambao huzaa kwa mbegu. Kwa kawaida, kichwa pekee ndicho huliwa - nyama nyeupe inayoweza kuliwa wakati mwingine huitwa "curd" (yenye mwonekano sawa na jibini la jibini)'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikanayo kwenye Cauliflower'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'chuma', icon: 'assets/icons/nutrients.png')
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
            text: 'Sodiamu',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamini vinavyopatikana kwenye cauliflower'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamini C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini K',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const []),
);
