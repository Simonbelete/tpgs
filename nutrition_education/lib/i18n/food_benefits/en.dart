import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/image105.png',
  title: 'Functions of food',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: '',
        body:
            'A balanced diet should include all of the necessary nutrients for our body in the right proportions. The more diversified and balanced the food we consume, the greater the chance for our body to meet our daily nutritional needs.'),
    Paragraph(title: 'Three Functions of Food', body: ''),
    SubTitleText(text: '1. Energy'),
    SubTitleText(text: 'What are food groups?'),
    Paragraph(
        title: '',
        body:
            'To provide energy to fuel our activities such as working, thinking and performing other physical activities'),
    CourseBodyImage(image: 'assets/materials/image101.jpg'),
    SubTitleText(text: '2. Growth'),
    Paragraph(
        title: '',
        body:
            'To repair and build our bodies’ tissues, necessary for the formation of bones, teeth, muscles, skin, and blood'),
    CourseBodyImage(image: 'assets/materials/image99.jpg'),
    SubTitleText(text: '3. Regulation'),
    Paragraph(
        title: '',
        body: 'To regulate various activities of our bodies to function well'),
    CourseBodyImage(image: 'assets/materials/image102.jpg'),
    Paragraph(
        title: '',
        body:
            'No single food or food group contains all the nutrients the human body requires for optimal function and good health. The human body requires nutrients that come from a variety of foods. To achieve good dietary diversity, it is essential to eat a variety of foods regularly and to consume foods from all food groups.'),
    CourseBodyImage(image: 'assets/materials/food_groups.png'),
    SubTitleText(text: 'Staples'),
    Paragraph(
        title: '',
        body:
            'Foods in this group comprise the largest part of the diet. Cereal grains such as teff, sorghum, millet, maize, barley, oats, wheat, teff, rice and starchy roots (cassava, potato, sweet potato) are included. Staples are a good source of energy. '),
    SubTitleText(text: 'Legumes and Nuts'),
    Paragraph(
        title: '',
        body:
            'This group includes ground nuts, beans, chickpeas, and lentils. This food groups are a good source of protein in addition to energy.  '),
    SubTitleText(text: 'Animal-Source Foods'),
    Paragraph(
        title: '',
        body:
            ' Foods from animals including meats, eggs, dairy and fish are good sources of protein, fats, and essential micronutrients (vitamins and minerals). These nutrients are especially critical for child growth and development in the first two years of life. '),
    SubTitleText(text: 'Vegetables'),
    Paragraph(
        title: '',
        body:
            'Foods in this group include green leaf and yellow vegetables including kale, spinach, celery, cucumber, peppers, broccoli, carrots, cauliflower, pumpkin, onion, tomatoes, and others. Vegetables provide essential micronutrients (vitamins and minerals). They also provide. '),

    SubTitleText(text: 'Fruits'),
    Paragraph(
        title: '',
        body:
            'Foods in this group include bananas, oranges, lemons, papaya, avocado, peach, guava, watermelon, sweet melon, and many others. They mainly provide energy and essential micronutrients (vitamins and minerals).'),
    SubTitleText(text: 'Fats'),
    Paragraph(
        title: '',
        body:
            ' Fats include cooking oils, oil seeds, avocado, and oil seeds. Some foods such as animal-source products (meat, milk, and dairy products like butter and yoghurt) also provide fat.'),
    // CourseBodyImage(image: 'assets/materials/food_groups_in_meal.png')
  ]),
);
