import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient SW = Nutrient(
  coverImage: 'assets/materials/vitamind_opengraph.jpg',
  name: 'Mafuta',
  icon: 'assets/icons/lipid.png',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: 'Mafuta ',
        body:
            'kuupa mwili asidi muhimu ya mafuta ili kujenga utando wa seli na kutengeneza homoni. Pia husaidia mwili kunyonya na kusafirisha baadhi ya vitamini muhimu. Mafuta pia huupa mwili chanzo cha nishati. Mafuta ni muhimu kwa ukuaji, uzazi, uadilifu wa ngozi, kudumisha seli, na kutumia mafuta ya mwili kwa nishati.'),
    SubTitleText(text: 'Chanzo cha Protini'),
    FoodListTile(
        image: 'assets/materials/raw_meat.png', title: 'Nyama', subtitle: ''),
    FoodListTile(
        image: 'assets/materials/fish.png', title: 'Samaki', subtitle: ''),
    FoodListTile(
        image: 'assets/materials/vegetable_oil.png',
        title: 'Mafuta ya kupikia',
        subtitle: ''),
    FoodListTile(image: 'assets/materials/egg.png', title: 'Yai', subtitle: ''),
    FoodListTile(
        image: 'assets/materials/avocado.png',
        title: 'Parachichi',
        subtitle: ''),
    FoodListTile(
        image: 'assets/materials/milk.png', title: 'Maziwa', subtitle: ''),
  ]),
);
