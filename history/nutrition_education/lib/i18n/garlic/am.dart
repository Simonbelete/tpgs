import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/category_button.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Food AM = Food(
  coverImage: 'assets/materials/garlic_image.png',
  title: 'ነጭ ሽንኩርት',
  description: const Paragraph(
      title: '',
      body:
          'ለብዙ ሺህ ዓመታት ይህ ቅመም የእርስዎን ተወዳጅ ምግቦች ለማጣፈጥ ጥቅም ላይ ከመዋሉ በፊት በጥንታዊ ባህሎች ውስጥ እንደ ሕክምና ይሠራ ነበር. የነጭ ሽንኩርት የጤና ጠቀሜታዎች በቻይና፣ በግብፅ እና በሮማውያን ሥልጣኔዎች ይጠቀሙበት ነበር። ነጭ ሽንኩርት ለመድኃኒትነት ንብረታቸው ስለመጠቀማቸው በቂ ሰነድ አለ።'),
  facts: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const SubTitleText(text: 'በነጭ ሽንኩርት ውስጥ የሚገኙ ማዕድናት'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ማግኒዥየም',
            icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ካልሲየም', icon: 'assets/icons/nutrients.png')
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true, text: 'ብረት', icon: 'assets/icons/nutrients.png'),
        CategoryButton(
            horizontal: true, text: 'ዚንክ', icon: 'assets/icons/nutrients.png')
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
            text: 'ፎስፈረስ',
            icon: 'assets/icons/nutrients.png'),
      ],
    ),
    const SizedBox(
      height: 15,
    ),
    const SubTitleText(text: 'በነጭ ሽንኩርት ውስጥ የሚገኙት ቫይታሚኖች'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: const [
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን C',
            icon: 'assets/icons/vitamins.png'),
        CategoryButton(
            horizontal: true,
            text: 'ቫይታሚን B6',
            icon: 'assets/icons/vitamins.png')
      ],
    ),
  ]),
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    SubTitleText(text: 'Health benefits of garlic'),
    Bullet(children: [
      'ነጭ ሽንኩርት የሰውነትን በሽታ የመከላከል ስርዓትን ለማጠናከር ይረዳል',
      'ነጭ ሽንኩርት ከፍተኛ የደም ግፊትን ለመቀነስ ይረዳል',
      'ነጭ ሽንኩርት የኮሌስትሮል መጠንን ለመቀነስ ይረዳል',
      'ነጭ ሽንኩርት አንቲባዮቲክ ባህሪያት አሉት',
    ])
  ]),
);
