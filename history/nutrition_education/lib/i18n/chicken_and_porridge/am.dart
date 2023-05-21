import 'package:flutter/material.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/ingredients_card.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

Recipe AM = Recipe(
    coverImage: 'assets/materials/chicken_and_porridge.png',
    title: 'የዶሮ እና የአትክልት ገንፎ አዘገጃጀት',
    facts: Column(children: [
      SubTitle(text: 'አንዴ የምንመገበው የዶሮ ስጋ ንጥረ ነገር ይዘት'),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: '485 ካሎሪዎች',
              icon: 'assets/icons/meal.png'),
          CategoryButton(
              horizontal: true,
              text: '32 ግ ስብ',
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
              text: '24 ግ ካርቦሃይድሬት',
              icon: 'assets/icons/carbohydrates.png'),
          CategoryButton(
              horizontal: true,
              text: '29 ግ ፕሮቲን',
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
            title: 'ድፍን ነጭ ሽንኩርት',
            quantity: '3 ንጥል'),
        IngredientCard(
            image: 'assets/materials/red_onion.png',
            title: 'ቀይ ሽንኩርት',
            quantity: '3 ንጥል'),
        IngredientCard(
            image: 'assets/materials/clove.png',
            title: 'ቅርንፉድ',
            quantity: '1 የሻይ ማንኪያ'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'በርበሬ',
            quantity: '2 ሴሜ'),
        IngredientCard(
            image: 'assets/materials/ginger.png',
            title: 'ጅንጅብል',
            quantity: '2 ሴሜ'),
        IngredientCard(
            image: 'assets/materials/ginger.png',
            title: 'የሎሚ ቅጠል',
            quantity: '2 የሾርባ ማንኪያ'),
        IngredientCard(
            image: 'assets/materials/raw_chicken.png',
            title: 'የዶሮ ስጋ',
            quantity: '250 ግራም'),
        IngredientCard(
            image: 'assets/materials/white_rice.png',
            title: 'ነጭ ሩዝ',
            quantity: '750 ግራም'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'ጨው',
            quantity: '750 ግራም'),
        IngredientCard(
            image: 'assets/materials/salt.png',
            title: 'ካሮት',
            quantity: '200 ግራም'),
        IngredientCard(
            image: 'assets/materials/beans.png',
            title: 'የተፈጨ ባቄላ',
            quantity: '200 ግራም'),
        IngredientCard(
            image: 'assets/materials/capsicum.jpeg',
            title: 'በርበሬ',
            quantity: '1 የሻየ ማንኪያ'),
        IngredientCard(
            image: 'assets/materials/egg.png',
            title: 'እንቁላል',
            quantity: '50 ግራም'),
        IngredientCard(
            image: 'assets/materials/vegitables.png',
            title: 'ፍራፍሬ',
            quantity: '650 ግራም'),
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
                'የቀቀሉትን የዶሮ ስጋ ለሁለት ይከፋፍሉት፡ ግማሹን ለሾርባ የቀረውን ለገንፎ እንዲሆን፡፡  ሩዙን ያብስሉ፡፡ በበሰለው የዶሮ ስጋ ላይ  ጨው እና ቅጠላ ቅጠሎችን ይጨምሩ፡፡ ገንፎ እስኪሆን ድረስ ማማሰሉን ይቀጥሉ፡፡ ከዚያም ካሮቱን እና አረንጓዴ ባቄላዎችን ይቀቅሉ፡፡ አትክልቶቹ በሳቱ እንዳይጎድ እሳቱን ያጥፉ፡፡ የበሰለውን ሩዝ፡ የዶሮ ስጋ፡ አትክልት፡ ከተቁላላው ሽንኩርትና ዘይት ላይ በመጨመር ገንፎ እስኪሆን በማማሰል ያዘጋጁ፡፡ ለሾርባ የቀረውን ስጋ በቅመማ ቅመሞች ማብሰል፡፡ ጨው፡ በርበሬ እና የተከተፈ ነጭ ሽንኩርት ይጨምሩ፡፡  በተዘጋጀው ሾርባ ላይ   የተቀቀለ እና የተላጠ እንቁላል ይጨምሩ፡፡ ተዘጋጅቶ እንዳለቀ ልጅዎን እና ሌሎች ቤተሰብዎን ይመግቡ፡፡')
      ],
    ),
    body: Column(
      children: [],
    ));
