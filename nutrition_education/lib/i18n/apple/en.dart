import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food EN = Food(
  coverImage: 'assets/materials/apple.png',
  title: 'Apple',
  description: const Paragraph(
      title: '',
      body:
          'Apples are among the world’s most popular fruits. Apples are high in fiber, vitamin C, and various antioxidants. They are also very filling, considering their low calorie count. Studies show that eating apples can have multiple benefits for your health'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Minerals Found in Apple'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Calcium',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true,
            text: 'Magnesium',
            icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Apple'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamin A',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamin C',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Apples and weight loss'),
    Paragraph(
        title: '',
        body:
            'Two properties of apples — their high fiber and low calorie contents — make them a weight-loss-friendly food.'),
    Paragraph(
        title: '',
        body:
            'Thus, eating apples may reduce your daily calorie intake and promote long-term weight loss'),
    SubTitleText(text: 'Health benefits of apples'),
    Paragraph(
        title: '',
        body:
            'Given the immense popularity of apples, it unsurprising that they’ve been studied quite thoroughly'),
    Bullet(children: [
      'eating apples can help lower blood sugar levels and protect against diabetes ',
      'apples can reduce total cholesterol levels and lead to drastic reductions of 48% in plaque buildup inside the arteries',
      'apple phytonutrients can protect against cancers of the lungs and colon'
    ])
  ]),
);
