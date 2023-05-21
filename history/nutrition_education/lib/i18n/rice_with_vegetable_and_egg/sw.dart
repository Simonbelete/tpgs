import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/ingredients_card.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Recipe SW = Recipe(
  coverImage: 'assets/materials/rice_with_vegitables.png',
  title: 'Mchele wa kukaanga wa mboga na mayai',
  facts: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [Paragraph(title: '', body: 'Viungo kwa milo 10')]),
  ingredients: GridView(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 5, mainAxisSpacing: 2, mainAxisExtent: 200),
      children: const [
        IngredientCard(
            image: 'assets/materials/sorghum.png',
            title: 'Mtama',
            quantity: '250 g'),
        IngredientCard(
            image: 'assets/materials/carot.png',
            title: 'Karoti',
            quantity: '250 g'),
        IngredientCard(
            image: 'assets/materials/clove.png',
            title: 'Karafuu',
            quantity: '1 kipande'),
        IngredientCard(
            image: 'assets/materials/garlic_image.png',
            title: 'Kitunguu saumu',
            quantity: '3 kipande'),
        IngredientCard(
            image: 'assets/materials/red_pepper.png',
            title: 'pilipili nyekundu',
            quantity: '5 kipande'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'Pilipili',
            quantity: '1 Kijiko cha Chai'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'Chumvi',
            quantity: '1 Tea Spoon'),
        IngredientCard(
            image: 'assets/materials/vegetable_oil.png',
            title: 'Vegetable oil',
            quantity: '3 Kijiko cha Chai'),
        IngredientCard(
            image: 'assets/materials/white_rice.png',
            title: 'Wali kupikwa',
            quantity: '1.5 Kg '),
        IngredientCard(
            image: 'assets/materials/red_onion.png',
            title: 'Kitunguu nyekundu',
            quantity: '3 kipande'),
        IngredientCard(
            image: 'assets/materials/egg.png',
            title: 'Yai',
            quantity: '10 kipande'),
        IngredientCard(
            image: 'assets/materials/banana.png',
            title: 'Ndizi',
            quantity: '10 kipande'),
      ]),
  instructions:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Kuandaa mchele na mboga'),
    Bullet(children: [
      'Osha vizuri na chuja mchele.',
      'Osha karoti na uikate vipande vidogo.',
      'Changanya vitunguu, pilipili na chumvi na uikate.',
      'Ongeza mafuta na viungo.',
      'Ongeza mboga iliyokatwa',
      'Changanya mchele na pilipili ya ardhini, vitunguu na chumvi.',
      'Koroga vizuri hadi mchele uive',
      'Changanya na yai na uitumie'
    ]),
    SubTitleText(text: 'Ili kuandaa yai'),
    Bullet(children: [
      'Ongeza mafuta.',
      'Vunja yai kwa uangalifu',
      'Pika vizuri, kisha changanya na wali na uitumie'
    ])
  ]),
  body: Column(
    children: [],
  ),
);
