import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/image105.png',
  title: 'Kazi za chakula',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: '',
        body:
            'Lishe bora inapaswa kujumuisha virutubishi vyote muhimu kwa mwili wetu kwa idadi inayofaa. Kadiri chakula tunachotumia kikiwa mseto na chenye uwiano, ndivyo uwezekano wa miili yetu kukidhi mahitaji yetu ya kila siku ya lishe.'),
    Paragraph(title: 'Kazi Tatu za Chakula', body: ''),
    SubTitleText(text: '1. Nishati'),
    SubTitleText(text: 'Vikundi vya chakula ni nini?'),
    Paragraph(
        title: '',
        body:
            'Kutoa nishati ya kuchochea shughuli zetu kama vile kufanya kazi, kufikiri na kufanya shughuli nyingine za kimwili'),
    CourseBodyImage(image: 'assets/materials/image101.jpg'),
    SubTitleText(text: '2. Ukuaji'),
    Paragraph(
        title: '',
        body:
            'Kurekebisha na kujenga tishu za miili yetu, muhimu kwa malezi ya mifupa, meno, misuli, ngozi na damu.'),
    CourseBodyImage(image: 'assets/materials/image99.jpg'),
    SubTitleText(text: '3. Udhibiti'),
    Paragraph(
        title: '',
        body:
            'Kudhibiti shughuli mbalimbali za miili yetu kufanya kazi vizuri'),
    CourseBodyImage(image: 'assets/materials/image102.jpg'),
    Paragraph(
        title: '',
        body:
            'Hakuna chakula kimoja au kikundi cha chakula kilicho na virutubishi vyote ambavyo mwili wa binadamu unahitaji kwa utendaji bora na afya njema. Mwili wa mwanadamu unahitaji virutubisho vinavyotokana na vyakula mbalimbali. Ili kupata utofauti mzuri wa lishe, ni muhimu kula aina mbalimbali za vyakula mara kwa mara na kula vyakula kutoka kwa makundi yote ya vyakula.'),
    CourseBodyImage(image: 'assets/materials/food_groups.png'),
    SubTitleText(text: 'Vyakula vikuu'),
    Paragraph(
        title: '',
        body:
            'Chakula katika kundi hili kinajumuisha sehemu kubwa zaidi ya chakula. Nafaka za nafaka kama vile teff, mtama, mtama, mahindi, shayiri, shayiri, ngano, teff, mchele na mizizi ya wanga (mihogo, viazi, viazi vitamu) zimejumuishwa. Matunda ni chanzo kizuri cha nishati. '),
    SubTitleText(text: 'Kunde na Karanga'),
    Paragraph(
        title: '',
        body:
            'Kundi hili ni pamoja na karanga, maharagwe, mbaazi na dengu. Makundi haya ya chakula ni chanzo kizuri cha protini pamoja na nishati.'),
    SubTitleText(text: 'Vyakula vya Wanyama'),
    Paragraph(
        title: '',
        body:
            'Vyakula kutoka kwa wanyama ikiwa ni pamoja na nyama, mayai, maziwa na samaki ni vyanzo vyema vya protini, mafuta, na micronutrients muhimu (vitamini na madini). Virutubisho hivi ni muhimu sana kwa ukuaji na ukuaji wa mtoto katika miaka miwili ya kwanza ya maisha. '),
    SubTitleText(text: 'Mboga'),
    Paragraph(
        title: '',
        body:
            'Vyakula katika kundi hili ni pamoja na majani ya kijani na mboga za njano ikiwa ni pamoja na kale, mchicha, celery, tango, pilipili, brokoli, karoti, cauliflower, malenge, vitunguu, nyanya na wengine. Mboga hutoa micronutrients muhimu (vitamini na madini). Pia hutoa. '),

    SubTitleText(text: 'Matunda'),
    Paragraph(
        title: '',
        body:
            'Vyakula vya kundi hili ni pamoja na ndizi, machungwa, ndimu, papai, parachichi, peach, mapera, tikiti maji, tikitimaji tamu na vingine vingi. Wao hasa hutoa nishati na micronutrients muhimu (vitamini na madini).'),
    SubTitleText(text: 'Mafuta'),
    Paragraph(
        title: '',
        body:
            ' Mafuta ni pamoja na mafuta ya kupikia, mbegu za mafuta, parachichi na mbegu za mafuta. Baadhi ya vyakula kama vile bidhaa za wanyama (nyama, maziwa, na bidhaa za maziwa kama siagi na mtindi) pia hutoa mafuta.'),
    // CourseBodyImage(image: 'assets/materials/food_groups_in_meal.png')
  ]),
);
