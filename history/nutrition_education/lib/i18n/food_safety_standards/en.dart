import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/image1057.png',
  title: 'Food safety standards',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/image1057.png'),
    SubTitleText(text: 'Food safety and hygiene practices in food preparation'),
    Paragraph(
        title: '',
        body:
            'As much as we need a healthy and balanced diet for good health, we also need to remember the principles of food hygiene and safety practices. It is essential that we keep these in mind when we prepare food:'),
    Bullet(children: [
      'Make sure the kitchen tools and food materials are clean.',
      'Make sure that your place is clean of garbage and free from pests like rats, house lizards, and bugs.',
      'Refrain from using frying oil more than twice, as it is always better to use a new oil.',
      'Replace the use of artificial flavoring and MSG with a combination of salt, sugar, pepper, and other cooking spices.'
    ]),
    SubTitleText(
        text:
            '1. Wash hands with soap and running water. Wash produces before processing.'),
    CourseBodyImage(image: 'assets/materials/image1060.png'),
    SubTitleText(
        text:
            '2. Keep kitchen tools, raw food materials and cooked food in separate storage/containers.'),
    CourseBodyImage(image: 'assets/materials/image1061.png'),
    SubTitleText(
        text:
            '3. Make sure food is cooked properly and thoroughly, especially animal food products.'),
    CourseBodyImage(image: 'assets/materials/image1062.png'),
    SubTitleText(
        text: '4. Use clean water and clean, safe raw food materials.'),
    CourseBodyImage(image: 'assets/materials/image1063.png'),
    SubTitleText(
        text: '5. Store cooked food in an accurate and safe temperature.'),
    CourseBodyImage(image: 'assets/materials/image1064.png'),
    SubTitleText(
        text: 'Clean and healthy life practices are essential in the kitchen'),
    Paragraph(
        title: '',
        body:
            'Many activities inside and outside of our homes expose us to dirt and germs from various places. We need to pay attention in the kitchen and stay away from trash, smoke, and pests like rats. Always practice these clean and healthy habits while preparing food in the kitchen.'),
    Paragraph(
        title: 'The following precautions should be taken while cooking',
        body: ''),
    CourseBodyImage(image: 'assets/materials/image1134.png'),
    Paragraph(
        title: 'always use apron',
        body: 'Wash apron regularly to keep it clean when you cook.'),
    CourseBodyImage(image: 'assets/materials/image1135.png'),
    Paragraph(
        title: 'Wrap your hair',
        body:
            'Always wear hair restraints to avoid cross-contamination with food.'),
    CourseBodyImage(image: 'assets/materials/image1133.png'),
    Paragraph(
        title: 'Wash hands with soap',
        body:
            'Wash hands with running water for 60 seconds before and after cooking to avoid germs and bacteria from food.')
  ]),
);
