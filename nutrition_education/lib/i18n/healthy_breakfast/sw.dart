import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/color_table.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/image900.png',
  title: 'Kifungua kinywa cha afya',
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      CourseBodyImage(image: 'assets/materials/image900.png'),
      Paragraph(
          title: 'Anza siku na kifungua kinywa cha afya',
          body:
              'Anza siku kila wakati kwa kiamsha kinywa chenye afya na lishe. Kiamsha kinywa ni muhimu katika kutoa nishati kwa mwili wetu kufanya shughuli zetu za kila siku. Mwili wetu unahitaji nishati ya kutosha kutekeleza shughuli zetu zote asubuhi, na nishati hiyo hutoka kwa kifungua kinywa. Inaweka mwili wetu kuwa sawa na wenye nguvu.'),
      SubTitleText(text: 'Faida za Kula Kifungua kinywa'),
      Bullet(children: [
        'Husaidia kukidhi mahitaji ya kila siku ya lishe',
        'Husaidia kuweka nishati ya kutosha ili kukaa safi wakati wa kusonga',
        'Husaidia kuongeza umakini katika kusoma na kufanya kazi',
        'Husaidia kudumisha uzito wenye afya'
      ]),
      SubTitleText(text: 'Mifano ya kifungua kinywa cha afya'),
      CourseBodyImage(image: 'assets/materials/chicken_porage.png'),
      Paragraph(title: 'Uji wa kuku', body: ''),
      CourseBodyImage(image: 'assets/materials/egg_sandwich.png'),
      Paragraph(title: 'Sandwich ya yai', body: ''),
      CourseBodyImage(image: 'assets/materials/carot_and_rice_cacke.png'),
      Paragraph(title: 'Keki ya mchele wa nyama na karoti', body: ''),
      Paragraph(
          title: '',
          body:
              'Kuifanya familia kuhusika katika kuandaa aina mbalimbali za kifungua kinywa kutajenga ari ya ubunifu na shughuli za kusaidia familia nzima.'),
      SubTitleText(text: 'Umuhimu wa Kifungua kinywa'),
      Paragraph(
          title: '',
          body:
              'Mahitaji ya nishati kwa watoto wenye umri wa miaka 7-12 ni 1,600-2,000 kcal / siku. Kiamsha kinywa kinachopendekezwa kina asilimia 15-30 ya RDA ili kuwapa watoto nishati ya kutosha kufanya shughuli zao za kila siku.'),
      Paragraph(
          title: '',
          body:
              'Shughuli mbalimbali za watoto zinasaidiwa na kalori za kutosha kila siku. Kama mlo wa kwanza wa siku, kifungua kinywa ni muhimu kwa wavulana na wasichana, ingawa kwa kiasi tofauti, kulingana na uzito wa mwili wao na shughuli za kila siku.'),
      Paragraph(
          title: '',
          body:
              'Kuandaa milo yenye afya nyumbani kunaweza kusaidia mfumo wa kinga ya mtoto wako na kutoa mahitaji yake ya nishati kila siku. Washirikishe watoto wako katika kuchagua menyu yenye afya. Wanapenda kuelewa umuhimu wa kula milo yenye afya iliyopikwa nyumbani.'),
      Paragraph(title: '', body: 'Mahitaji ya Nishati kwa Watoto 7-12'),
      ColorTable(children: [
        [Text(''), Text('Wavulana'), Text('Wasichana')],
        [Text('Nishati'), Text('500-600 kcaL'), Text('400-550 kcaL')],
        [Text('Protini'), Text('15-18 Grams'), Text('10-14 Grams')]
      ]),
    ],
  ),
);
