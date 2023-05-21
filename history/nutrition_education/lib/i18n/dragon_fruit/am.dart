import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/dragon_fruit.png',
  title: 'የድራጎን ፍሬ',
  description: Paragraph(title: '', body: ''),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በስፒናች ውስጥ የሚገኙ ማዕድናት'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ማግኒዥየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ካልሲየም', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true, text: 'ብረት', icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በስፒናች ውስጥ የሚገኙ ቫይታሚኖች'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B2',
            icon: 'assets/icons/vitamins.png')
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
            text: 'ቫይታሚን B3',
            icon: 'assets/icons/vitamins.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
  ]),
  body:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const []),
);
