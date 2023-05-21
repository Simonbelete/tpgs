import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/ingredients_card.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Recipe AM = Recipe(
    coverImage: 'assets/materials/rice_with_vegitables.png',
    title: 'የበሰለ ሩዝ በአትክልት ከዕንቁላል ጋር ለመመገብ አዘገጃጀት',
    facts: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [Paragraph(title: '', body: 'ለ 10 ምግብ የሚሆን ግብዓት')]),
    ingredients: GridView(
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 5, mainAxisSpacing: 2, mainAxisExtent: 200),
        children: const [
          IngredientCard(
              image: 'assets/materials/sorghum.png',
              title: 'ማሽላ',
              quantity: '250 ግራም'),
          IngredientCard(
              image: 'assets/materials/carot.png',
              title: 'ካሮት',
              quantity: '250 ግራም'),
          IngredientCard(
              image: 'assets/materials/clove.png',
              title: 'ቅርንፉድ',
              quantity: '1 ራስ'),
          IngredientCard(
              image: 'assets/materials/garlic_image.png',
              title: 'ነጭ ሽንኩርት',
              quantity: '3 ራስ'),
          IngredientCard(
              image: 'assets/materials/red_pepper.png',
              title: 'ቀይ ቃሪያ',
              quantity: '5 ፍሬ'),
          IngredientCard(
              image: 'assets/materials/capsicum.jpeg',
              title: 'በርበሬ',
              quantity: '1 የሻየ ማንኪያ'),
          IngredientCard(
              image: 'assets/materials/salt.png',
              title: 'ጨው',
              quantity: '1 የሻይ ማንኪያ'),
          IngredientCard(
              image: 'assets/materials/vegetable_oil.png',
              title: 'የአትክልት ዘይት',
              quantity: '3 የሻይ ማንኪያ'),
          IngredientCard(
              image: 'assets/materials/white_rice.png',
              title: 'የበሰለ ሩዝ',
              quantity: '1.5 ኪግ '),
          IngredientCard(
              image: 'assets/materials/red_onion.png',
              title: 'ቀይ ሽንኩርት',
              quantity: '3 ራስ'),
          IngredientCard(
              image: 'assets/materials/egg.png',
              title: 'እንቁላል',
              quantity: '10 ንጥል'),
          IngredientCard(
              image: 'assets/materials/banana.png',
              title: 'ሙዝ',
              quantity: '10 ንጥል'),
        ]),
    instructions:
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      SubTitleText(text: 'ሩዝ በአትክልት ለማዘጋጀት'),
      Bullet(children: [
        'ሩዙን በሚገባ በማጠብ ያጥልሉት::',
        'ካሮቱን በማጠብ በትናንሹ ይቁረጡት::',
        'ነጭ ሽንኩርቱን ቃሪያዉንና ጨውን ቀላቅለው ይፍጩት፡፡',
        'ዘይትና ቅመሞችን ይጨምሩበት::',
        'የተፈጨውን አትክልት ይጨምሩበት::',
        'ሩዙን በመቀላቀል ከተፈጨው ቃሪያ ሽንኩርትና ጨዉ ጋር ይቀላቅሉት::',
        'ሩዙ እስኪበስል በደንብ ያማስሉት::',
        'ከእንቁላሉ ጋር ቀላቅለው ያቅርቡት::'
      ]),
      SubTitleText(text: 'እንቁላሉን ለማዘጋጀት'),
      Bullet(children: [
        'ዘይት ያቁላሉ::',
        'እንቁላሉን በጥንቃቄ ይስበሩ::',
        'በሚገባ ያብስሉት, ከዛም ከሩዙ ጋር ቀላቅለው ያቅርቡት፡'
      ])
    ]),
    body: Column(
      children: [],
    ));
