import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/sanittion_image.png',
  title: 'Hygiene and Sanitation',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/sanittion_image.png'),
    SubTitleText(text: 'What is Hygiene'),
    Paragraph(
        title: '',
        body:
            'Hygiene is the practice of maintaining cleanliness to preserve health and prevent the spread of diseases. The most common acts of personal hygiene include washing your hands, taking a bath, and brushing your teeth. Besides personal hygiene, food hygiene is also crucial. Standard food hygiene practices include cleaning your food, using clean utensils, proper cooking, storing, and proper reheating.  Like personal hygiene, being reckless with food hygiene also increases the risk of spreading disease. Contaminated food may contain viruses or bacteria in it. If you eat one of these, you will likely get sick. There are many different aspects to hygiene, but some of the most important include: '),
    Bullet(children: [
      'Showering or bathing regularly',
      'Washing your hands often, especially after using the restroom or handling food',
      'Brushing and flossing your teeth daily',
      'Wearing clean clothes and changing them regularly',
      'Cleaning your home and living space to prevent the buildup of dirt, dust, and other potential health hazards',
    ]),
    CourseBodyImage(image: 'assets/materials/hand_washing_steps.png'),
    Paragraph(title: 'Hand washing steps', body: ''),
    SubTitleText(text: 'What Is Sanitation?'),
    CourseBodyImage(image: 'assets/materials/what_is_higine.png'),
    Paragraph(
        title: '',
        body:
            'According to the World Health Organization, sanitation means proper and safe management of human waste, from the toilet to solid waste disposal. Improper sanitation is a leading cause of disease and death worldwide, particularly among children. Sanitation also includes solid waste, animal waste, and biowaste in a broader context. There are many different ways to practice sanitation, and it is important to find the method that works best for you. There are four main types of sanitation: personal, food, water, and waste.'),
    Bullet(children: [
      'There are different sanitation systems, and the most common ones are sewers, septic tanks, and pit latrines. Each type has its advantages and disadvantages.',
      'The most crucial factor to consider is the environment where it will be used. For example, sewer systems are unsuitable for areas with high groundwater levels because they can contaminate the water.'
    ])
  ]),
);
