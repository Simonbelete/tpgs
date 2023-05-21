import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
    coverImage: 'assets/materials/image156.png',
    title:
        'Let\'s limit our consumption of food high in Sugar, Salt, and Fat (SSF)',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: '',
            body:
                'Do you know why we should cook our meals every day? Because we can be sure of what is in our food. So many of the food shown below are easily found sold in various places, and they contain sugar, salt, and fat exceeding our daily needs.'),
        Paragraph(
            title: 'Salt',
            body:
                'can come into the diet from processed foods like ready-to-eat meals, noodles, and cheese, salty snacks like chips and mixtures, processed meats like bacon, ham, salami, etc., or through preservative-laden foods such as pickles, jam, jelly, sauces, etc. Similarly, free sugar can be added to gravies, sodas, shakes, concentrated fruit juices, candies, sugary snacks, etc.'),
        Paragraph(
            title: 'Salt and sugar',
            body:
                'play an essential role in the smooth functioning of the body. Salt is a mineral required to maintain fluid levels and acid-base balance, conduct nerve impulses, and regulate muscle contractions. On the other hand, sugar is a form of carbohydrate and a good source of energy for our day-to-day activities.'),
        SubTitleText(text: 'Some tips to control excessive intake:'),
        Bullet(children: [
          'Avoid using table salt shakers at the dining table',
          'Watch, read, and analyze food labels before buying the product',
          'Limit salty snack consumption',
          'Prefer home-cooked meals over ready-to-eat meals',
          'Limit processed and preservative-laden foods in your diet',
          'Added sugar has no advantage, so avoid adding sugar to beverages and other foods',
          'Avoid refined white sugar and replace it with healthy substitutes like nuts, raisins, figs, manuka, organic jaggery, honey, coconut sugar, etc',
          'Eat small frequent meals to avoid sugar cravings',
        ]),
        SubTitleText(text: 'Sugar consumption'),
        Bullet(children: ['4 Soup spoon', '50 g/person/day']),
        CourseBodyImage(image: 'assets/materials/suger_bowl.png'),
        SubTitleText(text: 'Salt consumption'),
        Bullet(children: ['1 Tea spoon', '5 g/person/day']),
        CourseBodyImage(image: 'assets/materials/salt_with_container.png'),
        SubTitleText(text: 'Oil consumption'),
        Bullet(children: ['5 Soup spoon', '50 g/person/day']),
        CourseBodyImage(image: 'assets/materials/fat_ic.gif'),
        SubTitleText(text: 'High in salt and fat'),
        CourseBodyImage(image: 'assets/materials/fat_salty_food.png'),
        CourseBodyImage(image: 'assets/materials/salty_and_fatty_food_2.png'),
        SubTitleText(text: 'High in sugar and fat'),
        CourseBodyImage(image: 'assets/materials/sugery_and_salty_food.png'),
        SubTitleText(text: 'High in sugar'),
        CourseBodyImage(image: 'assets/materials/sugrey_food.png')
      ],
    ));
