import 'package:flutter/material.dart';
import 'package:nutrition_education/i18n/food.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/food_grid_list.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/vegetables_image.png',
  title: 'Fruit and vegetables for schoolchildren',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const CourseBodyImage(image: 'assets/materials/vegetables_image.png'),
    const Paragraph(
        title: '',
        body:
            'Fruit and vegetables are the best sources of vitamins and minerals. In addition, fruit and vegetables are also the primary sources of fiber, essential to our diet.'),
    const Paragraph(
        title: '',
        body:
            'Another important fact is that vitamins and minerals in fruit and vegetables are also good sources of antioxidants. Antioxidants are thought to have a protective effect against free radicals in our body and help improve our immune systems, lowering our risk of catching various chronic diseases.'),
    const SubTitleText(text: 'Let\'s enjoy the rainbow of vegetables'),
    FoodGridList(foods: foodDataVegetables),
    const SubTitleText(text: 'Let\'s enjoy the rainbow of fruit'),
    FoodGridList(foods: foodDataFruit),
  ]),
);
