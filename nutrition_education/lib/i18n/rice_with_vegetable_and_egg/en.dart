import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/ingredients_card.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Recipe EN = Recipe(
  coverImage: 'assets/materials/rice_with_vegitables.png',
  title: 'Vegetable and egg Fried Rice',
  facts: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [Paragraph(title: '', body: 'Ingredients for 10 meals')]),
  ingredients: GridView(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 5, mainAxisSpacing: 2, mainAxisExtent: 200),
      children: const [
        IngredientCard(
            image: 'assets/materials/sorghum.png',
            title: 'Sorghum',
            quantity: '250 g'),
        IngredientCard(
            image: 'assets/materials/carot.png',
            title: 'Carrot',
            quantity: '250 g'),
        IngredientCard(
            image: 'assets/materials/clove.png',
            title: 'Cloves',
            quantity: '1 piece'),
        IngredientCard(
            image: 'assets/materials/garlic_image.png',
            title: 'Garlic',
            quantity: '3 piece'),
        IngredientCard(
            image: 'assets/materials/red_pepper.png',
            title: 'Red pepper',
            quantity: '5 piece'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'Pepper',
            quantity: '1 Tea Spoon'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'Salt',
            quantity: '1 Tea Spoon'),
        IngredientCard(
            image: 'assets/materials/vegetable_oil.png',
            title: 'Vegetable oil',
            quantity: '3 Tea Spoon'),
        IngredientCard(
            image: 'assets/materials/white_rice.png',
            title: 'Cooked rice',
            quantity: '1.5 Kg '),
        IngredientCard(
            image: 'assets/materials/red_onion.png',
            title: 'Red onion',
            quantity: '3 piece'),
        IngredientCard(
            image: 'assets/materials/egg.png',
            title: 'Egg',
            quantity: '10 piece'),
        IngredientCard(
            image: 'assets/materials/banana.png',
            title: 'Banana',
            quantity: '10 piece'),
      ]),
  instructions:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'To prepare rice with vegetables'),
    Bullet(children: [
      'Wash well and strain the rice.',
      'Wash the carrot and cut it into small pieces.',
      'Mix the garlic, pepper and salt and grind it.',
      'Add oil and spices.',
      'Add the chopped vegetables',
      'Mix the rice with ground pepper, onion and salt.',
      'Stir well until the rice is cooked',
      'Mix it with the egg and serve it'
    ]),
    SubTitleText(text: 'To prepare the egg'),
    Bullet(children: [
      'Add oil.',
      'Break the egg carefully',
      'Cook it well, then mix it with the rice and serve it'
    ])
  ]),
  body: Column(
    children: [],
  ),
);
