import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient AM = Nutrient(
    coverImage:
        'assets/materials/do-probiotics-help-your-immune-system-1440x810.jpg',
    name: 'ካርቦሃይድሬት',
    icon: 'assets/icons/carbohydrates.png',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: 'ካርቦሃይድሬት ',
            body:
                'ለሰው አካል ዋና የኃይል ምንጭ ነው። ከዕለታዊ የካሎሪ አወሳሰዳችን 50% ያህሉን ይይዛል። ቀሪው 60% በፕሮቲን እና በስብ መካከል በ 40፥20 ወይም 30፥30 ጥምርታ ተከፋፍሏል። ይሁን እንጂ ካርቦሃይድሬት ወደ ቀላል እና ውስብስብ መከፋፈሉን ማወቅ አስፈላጊ ነው። ቀላል ካርቦሃይድሬት በፍጥነት በሰውነት ውስጥ ይዋሃዳሉ፣ በዚህም ምክንያት በደም ውስጥ ያለው የስኳር እና የኃይል መጠን በከፍተኛ ደረጃ ይቀንሳል። በውጤቱም፣ የድካም ስሜት፣ ረሃብ እና ጣፋጭ ነገርን ለመብላት ከፍተኛ ፍላጎት ያሳድራል። በቂ ያልሆነ ካርቦሃይድሬጽ ዝቅተኛ የአመጋገብ ጥቅም አላቸው፣ እና የእነሱ ጥቅም ከሞላ ጎደል ባዶ ነው። እንደ ከረሜላ፣ አይስ ክሬም፣ ለስላሳ ፣ ነጭ ዳቦ፣ ነጭ ሩዝ እና ሌሎችም ባሉ ምግቦች ውስጥ ይገኛሉ። (ከተጣራ ስኳር፣ ነጭ ዱቄት፣ ነጭ ሩዝ የተሰሩ ምርቶች)። ፍራፍሬዎች የቀላል ካርቦሃይድሬጽ ቡድን አካል ናቸው፣ ነገር ግን በተለያዩ ንጥረ ነገሮች የበለፀጉ ተፈጥሯዊ ስኳሮች እንዲሁም ሰውነታችን የሚፈልገውን ፋይበር ይይዛሉ። ሆኖም ግን፣ በዋነኝነት በጠዋት እንዲመገቡት ይመከራል።'),
        SubTitleText(text: 'ካርቦሃይድሬት በሦስት ዋና ዋና ምድቦች ይከፈላል-'),
        Paragraph(
            title: 'ስኳር:- ',
            body: 'ጣፋጭ, አጭር ሰንሰለት ካርቦሃይድሬት. ለምሳሌ, ግሉኮስ, ፍሩክቶስ, ጋላክቶስ እና ሱክሮስ.'),
        Paragraph(
            title: 'ስታርች፡- ',
            body: ' ረጅም ሰንሰለት ያለው ካርቦሃይድሬት በምግብ መፍጫ ሥርዓት ውስጥ ወደ ግሉኮስነት የሚቀየሩ።'),
        Paragraph(
            title: 'ፋይበር:- ',
            body: 'የሰው አካል ፋይበርን አይወስድም, ነገር ግን ለ "ጥሩ" አንጀት ማይክሮፋሎራ አስፈላጊ ነው.'),
        SubTitleText(text: 'የካርቦሃይድሬት ምንጭ'),
        FoodListTile(
            image: 'assets/materials/banana.png', title: 'ሙዝ', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/Teff-Grain.jpg',
            title: 'ጤፍ',
            subtitle: ''),
        FoodListTile(
            image: 'assets/materials/corn.png', title: 'በቆሎ', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/bread.png', title: 'ዳቦ', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/beans.png', title: 'ባቄላ', subtitle: ''),
        FoodListTile(
            image: 'assets/materials/potatoes.png', title: 'ድንች', subtitle: ''),
      ],
    ));
