import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food EN = Food(
  coverImage: 'assets/materials/yellow_tomato.png',
  title: 'Yellow tomato',
  description: const Paragraph(
      title: '',
      body:
          'Some yellow tomato varieties are lower in acid, making them easier on sensitive stomachs and less likely to cause heartburn. Compared to red varieties, they contain more cholesterol-lowering niacin, as well as potassium (which helps with muscle contraction), phosphorus for bone health, and folate — which is vital for blood-cell formation and cellular function.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Minerals Found in Yellow tomato'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Potassium',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Yellow tomato'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'Vitamin C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'Vitamin B9',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const []),
);
