import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/utils/open_url.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';
import 'package:nutrition_education/widgets/course_video_player.dart';

Course EN = Course(
    coverImage: 'assets/materials/nutrient_village.png',
    title: 'Nutrition and the Nutrient Village',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CourseVideoPlayer(video: 'assets/videos/food_groups_en.mp4'),
        InkWell(
          onTap: () {
            openUrl(
                'https://www.youtube.com/watch?v=Z51bWG17m-Q&t=78s&ab_channel=ClickView');
          },
          child: const Text(
            'Credit - Youtube ClickView',
            style: TextStyle(color: Colors.blueAccent),
          ),
        ),
        const Paragraph(
          title: 'Nutrition :- ',
          body:
              'is the intake of food and the interplay of biological, social, and economic processes that influence the growth, function, and repair of the body. ',
        ),
        const Paragraph(
          title: 'Nutrients :- ',
          body:
              'are components in foods that an organism uses to survive and grow. There are two types of nutrients: Macronutrients and micronutrients.',
        ),
        const Paragraph(
            title: 'Macronutrients :-',
            body:
                'provide the bulk energy an organism\'s metabolic system needs to function.'),
        const Paragraph(
            title: 'Micronutrients :- ',
            body:
                'provide the necessary cofactors for metabolism to be carried out. Both types of nutrients can be acquired from the diet.'),
        const Paragraph(
            title: 'Macronutrients :- ',
            body:
                'include carbohydrates, proteins, fats, and water, whereas micronutrients include vitamins and minerals.'),
        const CourseBodyImage(image: 'assets/materials/nutrient_village.png'),
        const Paragraph(
            title: 'Nutrient requirements ',
            body:
                'refer to the different nutrients the body requires for energy, growth and repair, and protection from disease. They differ according to age, gender, physical activity, height, weight, and health status of the individual. '),
        const Paragraph(
            title: '',
            body:
                'Each food has different quantities of different nutrients, which sometimes interact with each other in the body. The nutritional status of an individual person, therefore, results from nutrient intake, nutrient requirements, and the body’s ability to digest, use and absorb the nutrients that are ingested.'),
        const SubTitleText(text: 'Macronutrients'),
        const Paragraph(
            title: 'Carbohydrates ',
            route: HomeScreen.routeName,
            body:
                'provide the body with energy to keep alive, build and repair tissues, stay warm, and move and work. Carbohydrates are the most abundant and economical source of food energy in the human diet.'),
        const Paragraph(
            title: '',
            body:
                'What major food sources of carbohydrates does the Ethiopian diet include?'),
        const CourseBodyImage(image: 'assets/materials/carbohydrates.png'),
        const Paragraph(
            title: 'Proteins ',
            route: HomeScreen.routeName,
            body:
                'provide the body with essential amino acids that have a range of functions: growth and development, repair or replacement of tissues, production of metabolic and digestive enzymes, and some hormones.'),
        const CourseBodyImage(image: 'assets/materials/proteins.png'),
        const Paragraph(
            title: 'Water ',
            route: HomeScreen.routeName,
            body:
                'is essential for life, and it is essential to get the right amount of fluid to be healthy. Adequate fresh water is required by the body daily.'),
        const Paragraph(
            title: 'Fats ',
            route: HomeScreen.routeName,
            body:
                'Fats provide the body with essential fatty acids to build cell membranes and make hormones. They also help the body absorb and transport some of the essential vitamins. Fats also provide the body with a concentrated source of energy. Fats are necessary for growth, reproduction, skin integrity, maintaining cells, and using body fat for energy. '),
        const CourseBodyImage(image: 'assets/materials/fats.png'),
        const SubTitleText(text: 'Micronutrients'),
        const Paragraph(
            title: 'Vitamins ',
            route: HomeScreen.routeName,
            body:
                'are a group of organic compounds that play essential functions in the body but cannot be made by the body. Some vitamins can be stored in the body, so they need to be eaten often but not every day (fat-soluble vitamins A, D, E, and K). In contrast, others cannot be stored and should be eaten daily (water-soluble B vitamins, vitamin C). '),
        const Paragraph(
            title: 'Vitamins ',
            route: HomeScreen.routeName,
            body:
                'play different roles in helping the body in important ways. Some examples include building protein and cells, protecting cells from damage, building bones, protecting vision, metabolizing macronutrients, and helping to heal wounds. Without essential vitamins, multiple nutritional diseases can result.'),
        const CourseBodyImage(image: 'assets/materials/vitamins.png'),
        const Paragraph(
            title: 'Minerals ',
            route: HomeScreen.routeName,
            body:
                'are solid, inorganic groups of compounds that are essential building blocks of different types of cells. Essential minerals include iron, zinc, calcium, and iodine, among others. For example, iron is part of red blood cells, which transport oxygen through the body. Zinc has many critical functions in the body, including the make-up of cells and body systems, including immune function. '),
        const CourseBodyImage(image: 'assets/materials/minerals.png')
      ],
    ));
