import 'package:flutter/material.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/ingredients_card.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

Recipe EN = Recipe(
    coverImage: 'assets/materials/chicken_and_porridge.png',
    title: 'Chicken and vegetable porridge recipe',
    facts: Column(children: [
      SubTitle(text: 'Chicken nutrition facts'),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: '485 Calories',
              icon: 'assets/icons/meal.png'),
          CategoryButton(
              horizontal: true,
              text: '32 g Fat',
              icon: 'assets/icons/trans-fat.png'),
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
              text: '24 g Carbohydrate',
              icon: 'assets/icons/carbohydrates.png'),
          CategoryButton(
              horizontal: true,
              text: '29 g Protein',
              icon: 'assets/icons/protein-shake.png'),
        ],
      ),
    ]),
    ingredients: GridView(
      physics: NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 5, mainAxisSpacing: 2, mainAxisExtent: 200),
      children: const [
        IngredientCard(
            image: 'assets/materials/garlic_image.png',
            title: 'White garlic',
            quantity: '3 Piece'),
        IngredientCard(
            image: 'assets/materials/red_onion.png',
            title: 'Red onion',
            quantity: '3 piece'),
        IngredientCard(
            image: 'assets/materials/clove.png',
            title: 'Cloves',
            quantity: '1 Tea spoon'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'Pepper',
            quantity: '2 cm'),
        IngredientCard(
            image: 'assets/materials/ginger.png',
            title: 'Ginger',
            quantity: '2 cm'),
        IngredientCard(
            image: 'assets/materials/lemon.png',
            title: 'Lemon',
            quantity: '2 Soup spoon'),
        IngredientCard(
            image: 'assets/materials/raw_chicken.png',
            title: 'Chicken meat',
            quantity: '250 g'),
        IngredientCard(
            image: 'assets/materials/white_rice.png',
            title: 'White rice',
            quantity: '750 g'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'Salt',
            quantity: '750 g'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'Carrot',
            quantity: '200 g'),
        IngredientCard(
            image: 'assets/materials/beans.png',
            title: 'Grounded bean',
            quantity: '200 g'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'Capsicum',
            quantity: '1 Tea spoon'),
        IngredientCard(
            image: 'assets/materials/egg.png', title: 'Egg', quantity: '50 g'),
        IngredientCard(
            image: 'assets/materials/vegitables.png',
            title: 'Fruit',
            quantity: '650 g'),
        SizedBox(
          height: 10,
        )
      ],
    ),
    instructions: Column(
      children: const [
        Paragraph(
            title: '',
            body:
                'Divide the boiled chicken meat in half: half for the soup and the other half for the porridge. Cook the rice. Add salt and herbs to the cooked chicken. Continue kneading until it becomes a porridge. Then boil the carrots and green beans. Turn off the heat so that the vegetables don\'t burn. Add the cooked rice, chicken meat, vegetables, onion and oil to the mixture and make it into porridge. Cook the remaining meat for the soup with spices. Add salt: pepper and chopped garlic. Add boiled and peeled egg to the prepared soup. Once it\'s ready, feed it to your child and the rest of your family.')
      ],
    ),
    body: Column(
      children: [],
    ));
