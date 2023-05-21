import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/eggplant.png',
  title: 'Mbilingani',
  description: const Paragraph(
      title: '',
      body:
          'Biringanya, pia inajulikana kama mbilingani, ni ya familia ya nightshade ya mimea na hutumiwa katika sahani nyingi tofauti duniani kote. Kuna aina nyingi ambazo zina ukubwa na rangi. Na ingawa biringanya zilizo na ngozi ya zambarau ni za kawaida, zinaweza kuwa nyekundu, kijani kibichi au hata nyeusi'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yanayopatikana Katika Biringanya'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
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
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Manganese',
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
    const SubTitleText(text: 'Vitamini vinavyopatikana kwenye Biringanya'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamini B9',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini K',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Faida za Biringanya kiafya'),
    Bullet(children: [
      'Yenye lishe sana',
      'Athari za antibacterial',
      'Ina antioxidants yenye nguvu'
    ])
  ]),
);
