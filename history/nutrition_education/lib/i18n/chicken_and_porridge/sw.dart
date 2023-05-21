import 'package:flutter/material.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/ingredients_card.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

Recipe SW = Recipe(
    coverImage: 'assets/materials/chicken_and_porridge.png',
    title: 'Mapishi ya uji wa kuku na mboga',
    facts: Column(children: [
      SubTitle(text: 'Ukweli wa lishe ya kuku'),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: '485 Kalori',
              icon: 'assets/icons/meal.png'),
          CategoryButton(
              horizontal: true,
              text: '32 g Mafuta',
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
              text: '24 g Wanga',
              icon: 'assets/icons/carbohydrates.png'),
          CategoryButton(
              horizontal: true,
              text: '29 g Protini',
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
            title: 'vitunguu nyeupe',
            quantity: '3 Piece'),
        IngredientCard(
            image: 'assets/materials/red_onion.png',
            title: 'Kitunguu nyekundu',
            quantity: '3 piece'),
        IngredientCard(
            image: 'assets/materials/clove.png',
            title: 'Karafuu',
            quantity: '1 Kijiko cha chai'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'Pilipili',
            quantity: '2 cm'),
        IngredientCard(
            image: 'assets/materials/ginger.png',
            title: 'Tangawizi',
            quantity: '2 cm'),
        IngredientCard(
            image: 'assets/materials/lemon.png',
            title: 'Ndimu',
            quantity: '2 Kijiko cha supu'),
        IngredientCard(
            image: 'assets/materials/raw_chicken.png',
            title: 'Nyama ya kuku',
            quantity: '250 g'),
        IngredientCard(
            image: 'assets/materials/white_rice.png',
            title: 'Mchele mweupe',
            quantity: '750 g'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'Chumvi',
            quantity: '750 g'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'Karoti',
            quantity: '200 g'),
        IngredientCard(
            image: 'assets/materials/beans.png',
            title: 'Maharage yaliyosagwa',
            quantity: '200 g'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'Capsicum',
            quantity: '1 Kijiko cha chai'),
        IngredientCard(
            image: 'assets/materials/egg.png', title: 'Egg', quantity: '50 g'),
        IngredientCard(
            image: 'assets/materials/vegitables.png',
            title: 'Matunda',
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
