import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/color_table.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/image900.png',
  title: 'Healthy breakfast',
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      CourseBodyImage(image: 'assets/materials/image900.png'),
      Paragraph(
          title: 'Start the day with a healthy breakfast',
          body:
              'Always start the day with a healthy and nutritionally balanced breakfast. Breakfast is essential in providing the energy for our body to do our daily activities. Our body needs sufficient energy to carry out all of our activities in the morning, and that energy comes from breakfast. It keeps our body fit and energized.'),
      SubTitleText(text: 'Benefits of Eating Breakfast'),
      Bullet(children: [
        'Helps meet daily nutritional needs',
        'Helps keep enough energy to stay fresh while on the move',
        'Helps increase concentration in studying and working',
        'Helps maintain healthy weight'
      ]),
      SubTitleText(text: 'Examples of a healthy breakfast'),
      CourseBodyImage(image: 'assets/materials/chicken_porage.png'),
      Paragraph(title: 'Chicken porridge', body: ''),
      CourseBodyImage(image: 'assets/materials/egg_sandwich.png'),
      Paragraph(title: 'Egg sandwich', body: ''),
      CourseBodyImage(image: 'assets/materials/carot_and_rice_cacke.png'),
      Paragraph(title: 'Beef and carrot rice cake', body: ''),
      Paragraph(
          title: '',
          body:
              'Getting the family to be involved in preparing a variety of breakfasts will build the spirit of creativity and support  activities for the whole family.'),
      SubTitleText(text: 'The Importance of Breakfast'),
      Paragraph(
          title: '',
          body:
              'The energy requirement for children aged 7-12 is 1,600-2,000 kcal/day. The recommended breakfast contains 15-30 percent RDA to give children sufficient energy to do their daily activities.'),
      Paragraph(
          title: '',
          body:
              'Various children\'s activities are supported by adequate calories daily. As the first meal of the day, breakfast is essential for boys and girls, although in different amounts, depending on their body weight and daily activities.'),
      Paragraph(
          title: '',
          body:
              'Preparing healthy meals at home can support your child\'s immune systems and provide for their energy requirement each day. Involve your children in choosing a healthy menu. They like to understand the importance of consuming healthy home-cooked meals.'),
      Paragraph(title: '', body: 'Energy Requirement for Children 7-12 '),
      ColorTable(children: [
        [Text(''), Text('Boys'), Text('Girls')],
        [Text('Energy'), Text('500-600 kcaL'), Text('400-550 kcaL')],
        [Text('Protein'), Text('15-18 Grams'), Text('10-14 Grams')]
      ]),
    ],
  ),
);
