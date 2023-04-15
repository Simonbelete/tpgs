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
  coverImage: 'assets/materials/carot.png',
  title: 'ካሮት',
  description: const Paragraph(
      title: '',
      body:
          'ካሮት ሥር አትክልት ነው፣ በተለይም ብርቱካንማ ቀለም፣ ምንም እንኳን ወይንጠጅ፣ ጥቁር፣ ቀይ፣ ነጭ እና ቢጫ ዝርያዎች ቢኖሩም ሁሉም የዱር ካሮት፣ ዳውከስ ካሮታ፣ አውሮፓ እና ደቡብ ምዕራብ እስያ ተወላጅ የሆኑ የቤት ውስጥ ዝርያዎች ናቸው። ተክሉ የመነጨው ከፋርስ ሊሆን ይችላል እና በመጀመሪያ የሚመረተው በቅጠሎች እና በዘሮቹ ነው። በአብዛኛው የሚበላው የእጽዋቱ ክፍል taproot ነው, ምንም እንኳን ግንዶች እና ቅጠሎች ይበላሉ.'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በካሮት ውስጥ የሚገኙ ማዕድናት'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ፖታስየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ፎስፈረስ', icon: 'assets/icons/nutrients.png')
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
            text: 'ካልሲየም',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በካሮት ውስጥ የሚገኙት ቫይታሚኖች'),
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
    const SizedBox(
      height: 15,
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B8',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B9',
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
            text: 'ቫይታሚን K1',
            icon: 'assets/icons/vitamins.png'),
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'የካሮት የጤና ጥቅሞች'),
    Bullet(children: [
      'የካንሰር ተጋላጭነት ይቀንሷል',
      'ዝቅተኛ የደም ኮሌስትሮል',
      'ክብደት መቀነስ',
      'የዓይን ጤና'
    ]),
  ]),
);
