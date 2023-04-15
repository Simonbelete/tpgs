import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/broccoli.png',
  title: 'ብሮኮሊ',
  description: const Paragraph(
      title: '',
      body:
          'ብሮኮሊ ፋይበር፣ ቫይታሚን ሲ፣ ቫይታሚን ኬ፣ ብረት እና ፖታሺየምን ጨምሮ በብዙ ንጥረ ነገሮች የበለፀገ ነው። እንዲሁም ከሌሎች አትክልቶች የበለጠ ፕሮቲን አለው'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በብሮኮሊ ውስጥ የሚገኙ ማዕድናት'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ካልሲየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ፎስፎረስ', icon: 'assets/icons/nutrients.png')
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
            text: 'ማግኒዥየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ብረት', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በብሮኮሊ ውስጥ የሚገኙት ቫይታሚኖች'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን A',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B',
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
            text: 'ቫይታሚን C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን E',
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
            text: 'ቫይታሚን K',
            icon: 'assets/icons/vitamins.png'),
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: '',
        body:
            'ይህ አረንጓዴ አትክልት በጥሬውም ሆነ በማብስል ልንመገበው ይችላል ነገርግን በቅርብ ጊዜ የተደረጉ ጥናቶች እንደሚያሳዩት በእርጋታ በእንፋሎት ማብሰል ከፍተኛውን የጤና ጠቀሜታዎች ይሰጣል'),
    SubTitleText(text: 'የብሮኮሊ የጤና ጥቅሞች'),
    Bullet(children: ['የካንሰር መከላከል', 'ዝቅተኛ የኮሌስትሮል መጠን', 'ለአታ ለማሻሻል ይረዳል'])
  ]),
);
