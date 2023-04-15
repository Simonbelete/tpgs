import 'package:flutter/material.dart';
import 'package:nutrition_education/i18n/food.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/food_grid_list.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/vegetables_image.png',
  title: 'Matunda na mboga kwa watoto wa shule',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const CourseBodyImage(image: 'assets/materials/vegetables_image.png'),
    const Paragraph(
        title: '',
        body:
            'Matunda na mboga ni vyanzo bora vya vitamini na madini. Aidha, matunda na mboga mboga pia ni vyanzo vya msingi vya fiber, muhimu kwa mlo wetu.'),
    const Paragraph(
        title: '',
        body:
            'Ukweli mwingine muhimu ni kwamba vitamini na madini katika matunda na mboga pia ni vyanzo vyema vya antioxidants. Antioxidants hufikiriwa kuwa na athari ya kinga dhidi ya radicals bure katika mwili wetu na kusaidia kuboresha mifumo yetu ya kinga, kupunguza hatari yetu ya kupata magonjwa mbalimbali ya muda mrefu.'),
    const SubTitleText(text: 'Wacha tufurahie upinde wa mvua wa mboga'),
    FoodGridList(foods: foodDataVegetables),
    const SubTitleText(text: 'Wacha tufurahie upinde wa mvua wa matunda'),
    FoodGridList(foods: foodDataFruit),
  ]),
);
