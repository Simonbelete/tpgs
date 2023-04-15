import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/eggplant.png',
  title: 'ደበርጃን',
  description: const Paragraph(
      title: '',
      body:
          'ደበርጃን፣ በተጨማሪም ኣኡበርጊነስ በመባል የሚታወቀው፣ የሌሊት ሼድ ተክሎች ቤተሰብ አባል እና በዓለም ላይ በተለያዩ ምግቦች ውስጥ ጥቅም ላይ ይውላሉ። በመጠን እና በቀለም የሚለያዩ ብዙ ዓይነቶች አሉ። እና ጥልቅ ወይን ጠጅ ቆዳ ያላቸው የእንቁላል ተክሎች በጣም የተለመዱ ሲሆኑ ቀይ፣ አረንጓዴ ወይም ጥቁር ሊሆኑ ይችላሉ'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'Minerals Found in '),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ካልሲየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ፖታሽየም', icon: 'assets/icons/nutrients.png')
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
            horizontal: true, text: 'ፎስፈረስ', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'Vitamins Found in Carrot'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B9',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን K',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'የደበርጃን የጤና ጥቅሞች'),
    Bullet(children: [
      'የደም ስኳር ለመቆጣር ይረዳል።',
      'በክብደት መቀነስ ያግዛል',
      'በከፍተኛ መጠን አንቲኦክሲደንጽ ይዟል'
    ])
  ]),
);
