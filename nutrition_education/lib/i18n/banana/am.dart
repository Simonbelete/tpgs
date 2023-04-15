import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/banana.png',
  title: 'ሙዝ',
  description: const Paragraph(
      title: '',
      body:
          'ሙዝ በፕላኔታችን ላይ በጣም አስፈላጊ ከሆኑ የምግብ ሰብሎች መካከል አንዱ ነው. ሙዝ ጤናማ የፋይበር፣ የፖታስየም፣ የቫይታሚን B6፣ የቫይታሚን ሲ እና የተለያዩ አንቲኦክሲዳንት እና የፋይቶኒተሪን ንጥረ ነገሮች ምንጭ ነው።'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በሙዝ ውስጥ የሚገኙ ማዕድናት'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ማግኒዥየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ፖታሽየም', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በሙዝ ውስጥ የሚገኙ ቫይታሚኖች'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን A',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B6',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'የሙዝ የጤና ጥቅሞች'),
    Bullet(children: ['የምግብ መፈጨትን ማሻሻል', 'ለልብ ጤና ለመጠበቅ ይረዳል'])
  ]),
);
