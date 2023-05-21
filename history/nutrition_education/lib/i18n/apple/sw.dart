import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food SW = Food(
  coverImage: 'assets/materials/apple.png',
  title: 'Apple',
  description: const Paragraph(
      title: '',
      body:
          'Maapulo ni kati ya matunda maarufu zaidi ulimwenguni. Tufaha zina nyuzinyuzi nyingi, vitamini C, na antioxidants mbalimbali. Pia hujaa sana, kwa kuzingatia hesabu yao ya chini ya kalori. Uchunguzi unaonyesha kuwa kula tufaha kunaweza kuwa na faida nyingi kwa afya yako'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Madini Yapatikanayo kwenye Apple'),
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
    const SubTitleText(text: 'Vitamini vinavyopatikana katika Apple'),
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
    SubTitleText(text: 'Maapulo na kupoteza uzito'),
    Paragraph(
        title: '',
        body:
            'Sifa mbili za tufaha - nyuzinyuzi nyingi na maudhui ya chini ya kalori - huwafanya kuwa chakula cha kupunguza uzito.'),
    Paragraph(
        title: '',
        body:
            'Kwa hivyo, kula maapulo kunaweza kupunguza ulaji wako wa kalori ya kila siku na kukuza kupoteza uzito kwa muda mrefu'),
    SubTitleText(text: 'Faida za kiafya za apples'),
    Paragraph(
        title: '',
        body:
            'Kwa kuzingatia umaarufu mkubwa wa tufaha, haishangazi kwamba yamesomwa kabisa'),
    Bullet(children: [
      'kula tufaha kunaweza kusaidia kupunguza viwango vya sukari kwenye damu na kulinda dhidi ya ugonjwa wa kisukari',
      'tufaha zinaweza kupunguza kiwango cha jumla cha kolesteroli na kusababisha kupunguzwa kwa kasi kwa 48% katika mkusanyiko wa plaque ndani ya mishipa.',
      'apple phytonutrients inaweza kulinda dhidi ya saratani ya mapafu na koloni'
    ])
  ]),
);
