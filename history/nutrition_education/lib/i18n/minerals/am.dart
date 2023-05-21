import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient AM = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'ማዕድናት',
    icon: 'assets/icons/nutrients.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
      Paragraph(
          title: 'ማዕድናት ',
          body:
              'ለተለያዩ የሕዋስ አካሎች አስፈላጊ የግንባታ ብሎኮች ፣ ኦርጋኒክ ያልሆኑ ውህዶች ናቸው። አስፈላጊ ማዕድናት ብረት፣ ዚንክ፣ ካልሲየም ፣ አዮዲን እና ሌሎችም ያካትታሉ። ለምሳሌ ብረት በሰውነት ውስጥ ኦክስጅንን የሚያጓጉዙ ቀይ የደም ሴሎች አካል ነው። ዚንክ በሰውነት ውስጥ ብዙ ወሳኝ ተግባራት አሉት፣የሴሎች እና የሰውነት ስርአቶችን፣የመከላከያ ተግባራትን ጨምሮ።'),
      SubTitleText(text: 'የማዕድን ምንጮች'),
      FoodListTile(
          image: 'assets/materials/carot.png', title: 'ካሮት', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/tomato.png', title: 'ቲማቲም', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/watermelon.png',
          title: 'ሐብሐብ',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/avocado.png', title: 'አቮካዶ', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/banana.png', title: 'ሙዝ', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/orange.png', title: 'ብርቱካን', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/pumpkin.png', title: 'ዱባ', subtitle: '')
    ]));
