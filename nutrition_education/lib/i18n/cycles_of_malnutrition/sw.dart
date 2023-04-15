import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
    coverImage: 'assets/materials/nutrition_status_same_age_children.png',
    title: 'Mzunguko wa utapiamlo',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      CourseBodyImage(
          image: 'assets/materials/nutrition_status_same_age_children.png'),
      Paragraph(
          title: 'Utapiamlo ',
          body: 'ni neno linalojumuisha utapiamlo na utapiamlo.'),
      Paragraph(
          title: 'Lishe kupita kiasi ',
          body:
              'hutokana na ulaji mwingi wa virutubishi unaohusiana na mahitaji ya virutubisho kulingana na umri, jinsia, shughuli za kimwili, urefu, uzito, na hali ya afya ya mtu binafsi. Nchini Ethiopia, hii bado ni nadra, lakini inazidi kuwa ya kawaida katika idadi ya watu na kuongezeka kwa mfiduo wa vyakula vyenye nishati, ambayo mara nyingi huishi katika maeneo ya mijini. Madhara ya lishe kupita kiasi ni pamoja na kuongezeka kwa hatari ya maisha yote ya magonjwa sugu, pamoja na ugonjwa wa sukari, ugonjwa wa moyo na mishipa, unene kupita kiasi, na saratani.'),
      Paragraph(
          title: 'Utapiamlo ',
          body:
              'ni, kwa ujumla, matokeo ya kiasi cha kutosha na ubora wa chakula na matukio ya mara kwa mara ya magonjwa ya kuambukiza.'),
      Paragraph(
          title: 'Undernutrition ',
          body:
              'inaelezea hali mbalimbali, ikiwa ni pamoja na kuwa na uzito mdogo, mfupi, mwembamba, na upungufu wa vitamini na madini. Mtoto hufafanuliwa kuwa mwenye lishe duni ikiwa ni mwembamba sana au mfupi sana kuliko wastani wa umri wake. Viashiria vinavyotumika sana vya ukosefu wa lishe bora ni:'),
      Bullet(children: [
        'Kupoteza: kwa kawaida ni matokeo ya ulaji wa chakula cha papo hapo au cha muda mfupi, mara nyingi pamoja na ugonjwa wa mara kwa mara. Matokeo katika mtoto ambaye ni hatari nyembamba (yaani, wana uzito mdogo sana kwa urefu wao).',
        'Kudumaa: kwa kawaida ni kiashirio cha upungufu wa muda mrefu au wa muda mrefu wa nishati ya kutosha au ulaji wa virutubishi vidogo, ingawa ina sababu nyingi zisizo za lishe kama vile uvamizi wa helminth na maambukizi ya mara kwa mara au sugu. Matokeo katika mtoto mfupi sana (yaani, wana urefu mfupi sana kwa umri wao).',
        'Uzito wa chini: kiashirio kinachotathmini utoshelevu wa uzito-kwa-umri. Sababu za ambayo inaweza kuwa ya muda mfupi au ya muda mrefu na ni vigumu kufafanua.'
      ]),
      Paragraph(
          title: '',
          body:
              'Watoto wote walioonyeshwa hapa chini wana umri sawa. Ni nani kati yao anayeugua malnu'),
      CourseBodyImage(
          image: 'assets/materials/malnutration_children_picture.png'),
      Paragraph(
          title: '',
          body:
              'Mvulana wa tatu tu, kushoto kwenda kulia, yuko chini ya hali nzuri ya lishe'),
    ]));
