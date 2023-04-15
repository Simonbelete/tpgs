import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/mango.png',
  title: 'ማንጎ',
  description: const Paragraph(
      title: '',
      body:
          'ማንጎ ጣፋጭ ብቻ ሳይሆን ገንቢም ነው። ልክ እንደ ብዙዎቹ ምግቦች ሁሉ, ግን ልከኝነት ቁልፍ ነው. እንደ ማንጎ ያሉ ጣፋጭ ፍራፍሬዎች ብዙ ስኳር ሊኖራቸው ይችላል. ነገር ግን የፍራፍሬ ስኳር ከተቀነባበረ ስኳር የተለየ ነው ምክንያቱም በፋይበር እና ለሰውነት ብዙ ጠቃሚ ንጥረ ነገሮች የተመጣጠነ ነው.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በማንጎ ውስጥ የሚገኙ ማዕድናት'),
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
    const SubTitleText(text: 'በማንጎ ውስጥ የሚገኙ ቫይታሚኖች'),
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
    SubTitleText(text: 'የማንጎ የጤና ጥቅሞች'),
    Bullet(children: [
      'ዝቅተኛ የካሎሪ ይዘት',
      'የስኳር በሽታን ለመከላከል ያግዙ',
      'በሽታ የመከላከል አቅምን የሚጨምሩ ንጥረ ነገሮችን ይይዛል',
    ])
  ]),
);
