import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/category_button.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';
import 'package:nea/widgets/title_text.dart';

Course EN = Course(
    coverImage: 'assets/materials/foods/egg.png',
    title: 'EGG',
    // description: const Paragraph(
    //   title: '',
    //   body:
    //       'Eggs are among the most nutritious foods on the planet. A whole egg contains all the nutrients required to turn a single cell into a baby chicken A single large, boiled egg contains',
    // ),
    // facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    //   Row(
    //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
    //     children: const [
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Vitamin A 6% of the RDA (Recommended Daily Allowance) ',
    //           icon: 'assets/icons/vitamin-a.png'),
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Folate 5% of the RDA',
    //           icon: 'assets/icons/vitamins.png'),
    //     ],
    //   ),
    //   const SizedBox(
    //     height: 15,
    //   ),
    //   Row(
    //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
    //     children: const [
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Vitamin B5 7% of the RDA',
    //           icon: 'assets/icons/vitamin_b5.png'),
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Vitamin B12 9% of the RDA',
    //           icon: 'assets/icons/vitamin_b12.png'),
    //     ],
    //   ),
    //   const SizedBox(
    //     height: 15,
    //   ),
    //   Row(
    //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
    //     children: const [
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Vitamin B2 15% of the RDA',
    //           icon: 'assets/icons/vitamin_b2.png'),
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Phosphorus 9% of the RDA',
    //           icon: 'assets/icons/phosphorus.png'),
    //     ],
    //   ),
    //   const SizedBox(
    //     height: 15,
    //   ),
    //   Row(
    //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
    //     children: const [
    //       CategoryButton(
    //           horizontal: true,
    //           text: 'Selenium 22% of the RDA',
    //           icon: 'assets/icons/selenium_icon.png'),
    //     ],
    //   )
    // ]),
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CourseBodyImage(image: 'assets/materials/foods/egg.png'),
        TitleText(text: "Egg"),
        SizedBox(
          height: 30.0,
        ),
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text:
                      'Vitamin A 6% of the RDA (Recommended Daily Allowance) ',
                  icon: 'assets/icons/vitamin-a.png'),
              CategoryButton(
                  horizontal: true,
                  text: 'Folate 5% of the RDA',
                  icon: 'assets/icons/vitamins.png'),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'Vitamin B5 7% of the RDA',
                  icon: 'assets/icons/vitamin_b5.png'),
              CategoryButton(
                  horizontal: true,
                  text: 'Vitamin B12 9% of the RDA',
                  icon: 'assets/icons/vitamin_b12.png'),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'Vitamin B2 15% of the RDA',
                  icon: 'assets/icons/vitamin_b2.png'),
              CategoryButton(
                  horizontal: true,
                  text: 'Phosphorus 9% of the RDA',
                  icon: 'assets/icons/phosphorus.png'),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'Selenium 22% of the RDA',
                  icon: 'assets/icons/selenium_icon.png'),
            ],
          )
        ]),
        Paragraph(
          title: '',
          body:
              'Eggs are among the most nutritious foods on the planet. A whole egg contains all the nutrients required to turn a single cell into a baby chicken A single large, boiled egg contains',
        ),
        Paragraph(
            title: '',
            body:
                '  Eggs also contain decent amounts of vitamin D, vitamin E, vitamin K, vitamin B6, calcium, and zinc This comes with 77 calories, 6 grams of protein, and 5 grams of healthy fats. Eggs also contain various trace nutrients that are important for health In fact, eggs are pretty much the perfect food. They contain a little bit of almost every nutrient you need.'),
        SubTitleText(text: 'Eggs have more nutrients'),
        Paragraph(
            title: '',
            body:
                'That means eggs have more nutrients -- vitamins, minerals, amino acids -- per calorie than most other foods. Have an egg, and you\'ll get the following:'),
        Bullet(children: [
          'High-quality protein',
          'Selenium',
          'Phosphorus',
          'Choline',
          'Vitamin B12',
          'Multiple antioxidants, which help keep your cells healthy'
        ]),
        SubTitleText(text: 'Eggs help your eyes'),
        Paragraph(
            title: '',
            body:
                'Doctors know that the antioxidants lutein and zeaxanthin help keep you from getting eye diseases like cataracts and age-related macular degeneration. Green, leafy vegetables like spinach and kale have them, too. But eggs are a better source. That\'s because their fat makes it easier for your body to use the nutrients.'),
        SubTitleText(text: 'Eating Eggs'),
        CourseBodyImage(image: 'assets/materials/foods/egg_boiled.png'),
        Paragraph(
            title: 'Help Sharpen the Brain ',
            body:
                'Eggs have vitamin D, which is good for your gray matter and hard to get from food. And they have something called choline that helps the nerve cells (neurons) in your noggin talk to each other. Choline is also essential for pregnant women and breastfeeding women because of the significant role it plays in brain development.'),
        Paragraph(
            title: 'Source of protein and amino acids ',
            body:
                'Getting enough protein in our diets is an essential way of helping our body\'s health. Each egg contains about six grams of protein, as well as helpful amino acids. Getting our share of protein for the day can help with weight management, increase muscle mass, lower blood pressure and help our bones, as well.'),
        CourseBodyImage(image: 'assets/materials/foods/egg_scrumbled.png'),
        Paragraph(
            title: 'Good source of choline ',
            body:
                'Choline is a water-soluble vitamin that is often grouped with B vitamins. It\'s used to build cell membranes and helps produce signaling molecules in the brain. One hard-boiled egg has about 147 mg of choline, which is 27% of the daily value recommended by the U.S. Food and Drug Administration (FDA)'),
        Paragraph(
            title: 'Eggs are nutrient-rich ',
            body: 'An average serving of 2 eggs contains:'),
        Bullet(children: [
          '82% of your daily vitamin D requirements',
          '50% of your daily folate requirements',
          '25% of your daily riboflavin (Vitamin B2) requirements',
          '40% of your daily selenium requirements',
        ]),
        SubTitleText(text: 'To prepare the egg'),
        Bullet(children: [
          'Add oil.',
          'Break the egg carefully',
          'Cook it well, then mix it with the rice and serve it'
        ])
      ],
    ));
