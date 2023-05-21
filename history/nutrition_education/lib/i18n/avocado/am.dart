import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/avocado.png',
  title: 'አቮካዶ',
  description: const Paragraph(
      title: '',
      body:
          'አቮካዶ ጤናማ ስብ እና ፋይበርን ጨምሮ ቁልፍ የሆኑ ንጥረ ነገሮች ምንጭ ነው። በተጨማሪም ፀረ-ብግነት እና አንቲኦክሲደንትስ ውህዶች ይዘዋል እና የልብ ሕመም አደጋን ለመቀነስ ሊረዱ ይችላሉ።'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በአቮካዶ ውስጥ የሚገኙ ማዕድናት'),
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
    const SubTitleText(text: 'በአቮካዶ ውስጥ የሚገኙ ቫይታሚኖች'),
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
    SubTitleText(text: 'የአቮካዶ የጤና ጥቅሞች'),
    Bullet(children: ['የምግብ መፈጨትን ማሻሻል', 'ለአታ ለማሻሻል ይረዳል', 'ለልብ ጤና ለመጠበቅ ይረዳል'])
  ]),
);
