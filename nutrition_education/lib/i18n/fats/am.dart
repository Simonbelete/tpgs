import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient AM = Nutrient(
  coverImage: 'assets/materials/vitamind_opengraph.jpg',
  name: 'ስብ',
  icon: 'assets/icons/lipid.png',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: 'ስብ ',
        body:
            'የሴል ሽፋኖችን ለመገንባት እና ሆርሞኖችን ለማምረት ለሰውነት አስፈላጊ የሆኑ ቅባት አሲዶችን ይሰጣል። በተጨማሪም የሰውነት አንዳንድ አስፈላጊ ቪታሚኖችን እንዲስብ እና እንዲያጓጉዝ ይረዳሉ። ቅባት(ስብ) ለሰውነታችን የኃይል ምንጭ ነው። ስብ ለእድገት፣ ለመራባት፣ ለቆዳ፣ ሴሎችን ለመጠበቅ እና የሰውነት ስብን ለኃይል ለመጠቀም አስፈላጊ ናቸው።'),
    SubTitleText(text: 'የስብ ምንጮች'),
    FoodListTile(
        image: 'assets/materials/vegetable_oil.png',
        title: 'የማብሰያ ዘይት',
        subtitle: ''),
    FoodListTile(
        image: 'assets/materials/egg.png', title: 'እንቁላል', subtitle: ''),
    FoodListTile(
        image: 'assets/materials/avocado.png', title: 'አቮካዶ', subtitle: ''),
    FoodListTile(image: 'assets/materials/fish.png', title: 'ዓሳ', subtitle: ''),
    FoodListTile(
        image: 'assets/materials/milk.png', title: 'ወተት', subtitle: ''),
  ]),
);
