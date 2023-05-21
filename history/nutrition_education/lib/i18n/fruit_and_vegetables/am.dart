import 'package:flutter/material.dart';
import 'package:nutrition_education/i18n/food.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/course_grid%20_list.dart';
import 'package:nutrition_education/widgets/food_grid_list.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/vegetables_image.png',
  title: 'በየቀኑ በቂ አትክልትና ፍራፍሬ መመገባችሁን እርግጠኛ ሁኑ',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const CourseBodyImage(image: 'assets/materials/vegetables_image.png'),
    const Paragraph(
        title: '',
        body:
            'አትክልትና ፍራፍሬ የቫይታሚንና ማዕድናት ምንጮች ናቸው፡፡ ከዚህ በተጨማሪም አትክልትና ፍራፍሬ ዋናዎቹ የፋይቨር ምንጮችም ናቸው፡፡በአትክልትና ፍራፍሬ ውስጥ የሚገኙ  የቫይታሚንና ማዕድናት በሽታ የመከላከል አቅማችንን ያዳብራሉ፡፡'),
    const Paragraph(
        title: '',
        body:
            'ፍራፍሬዎችና አትክልቶች ከቫይታሚኖች እና ማዕድናት በተጨማሪ  የእፅዋት ኬሚካሎችንም ይዘዋል፡፡ ከዚህ በተጨማሪም ፋይበር ይይዛሉ፡፡  በአትክልትና ፍራፍሬ የበለፀገ አመጋገብ እርስዎን ከካንሰር፣ ከስኳር ህመም እና ከልብ ህመም ለመጠበቅ ይረዳዎታል። ለጤናዎ በየቀኑ 5 አይነት አትክልት እና 2 አይነት ፍራፍሬ ይመገቡ።'),
    const SubTitleText(text: 'አትክልቶችና ጥቅሞቻቸው'),
    FoodGridList(foods: foodDataVegetables),
    const SubTitleText(text: 'ፍራፍሬዎችና ጥቅሞቻቸው'),
    FoodGridList(foods: foodDataFruit),
  ]),
);
