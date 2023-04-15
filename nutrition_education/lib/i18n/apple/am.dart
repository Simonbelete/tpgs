import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/apple.png',
  title: 'አፕል',
  description: const Paragraph(
      title: '',
      body:
          'አፕል በዓለም ላይ በጣም ተወዳጅ ከሆኑት ፍራፍሬዎች መካከል አንዱ ነው። በፋይበር፣ በቫይታሚን ሲ እና በተለያዩ አንቲኦክሲደንትስ የበለፀገ ነው። ጥናቶች እንደሚያሳዩት አፕል መመገብ ለጤናዎ በርካታ ጥቅሞችን ያስገኛል።'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በስፒናች ውስጥ የሚገኙ አፕል'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ካልሲየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true,
            text: 'ማግኒዥየም',
            icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በአፕል ውስጥ የሚገኙ ቫይታሚኖች'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን A',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን C',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'የአፕል የጤና ጥቅሞች'),
    Bullet(children: [
      'የደም ስኳር መጠን መቀነስ እና ከስኳር በሽታ መከላከል',
      'አጠቃላይ የኮሌስትሮል መጠንን በመቀነስ በደም ወሳጅ ቧንቧዎች ውስጥ 48% የፕላክ ክምችት እንዲቀንስ ያደርጋል',
      'የአፕል ፋይቶኒትረንት ከሳንባ እና አንጀት ካንሰር ሊከላከል ይችላል።'
    ])
  ]),
);
