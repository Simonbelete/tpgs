import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/cauliflower.png',
  title: 'የአበባ ጎመን',
  description: const Paragraph(
      title: '',
      body:
          'የአበባ ጎመን በብራስሲካ (ወይም ሰናፍጭ) ቤተሰብ ውስጥ ባለው ብራሲካ ውስጥ ብራሲካ ኦሌሬሴያ ከሚባሉት በርካታ አትክልቶች ውስጥ አንዱ ነው። በዘር የሚራባ አመታዊ ተክል ነው። በተለምዶ ጭንቅላት ብቻ ነው የሚበላው - የሚበላው ነጭ ሥጋ አንዳንድ ጊዜ "ከርጎም" ይባላል (ከአይብ እርጎ ጋር ተመሳሳይ ነው)'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በአበባ ጎመን ውስጥ የሚገኙ ማዕድናት'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ካልሲየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ብረት', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true, text: 'ሶዲየም', icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በአበባ ጎመን ውስጥ የሚገኙት ቫይታሚኖች'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን K',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body:
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: const []),
);
