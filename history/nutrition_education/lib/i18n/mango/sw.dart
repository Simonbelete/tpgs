import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/mango.png',
  title: 'Mango',
  description: const Paragraph(
      title: '',
      body:
          'Mango sio ladha tu, bali pia ni lishe. Kama ilivyo kwa vyakula vingi, hata hivyo, kiasi ni muhimu. Matunda matamu kama maembe yanaweza kuwa na sukari nyingi. Lakini sukari ya matunda ni tofauti na sukari iliyochakatwa kwa sababu inasawazishwa na nyuzinyuzi na virutubishi vingi kwa mwili.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikana Katika Mwembe'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true,
            text: 'Magnesiamu',
            icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Mango'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamini A',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamini C',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Faida za kiafya za Mango'),
    Bullet(children: [
      'Chini katika kalori',
      'Msaada kuzuia kisukari',
      'Ina virutubisho vya kuongeza kinga',
    ])
  ]),
);
