import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/images/image1057.png',
  title: 'የምግብ ዝግጅት የጥንቃቄ መስፈርቶች',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/images/image1057.png'),
    SubTitleText(text: 'በምግብ ዝግጅት ጊዜ መወሰድ ያለባቸው የንጽህና ጥንቃቄዎች'),
    Paragraph(
        title: '',
        body:
            'ጤናማ እና የተመጣጠነ ምግብ ለጤና አስፈላጊ እንደሆነ ሁሉ የምግብ ንጽህናን መጠበቅም እንደ መርህ መከተል አለብን፡፡ የሚከተሉትን ተግባራዊ አድርጉ'),
    Bullet(children: [
      'የማዕድ ቤት እቃዎች እና ሌሎች የመመገቢያ እቃዎች ንጹህ መሆናቸውን ያረጋግጡ፡፡',
      'ምግብ የሚያበስሉበት ቦታ ከቆሻሻ ንጹህ መሆኑን፡ ከአይጦች፡ ከእንሽላሊቶች፡ ከበረሮዎች የጸዳ መሆኑን ያረጋግጡ፡፡',
      'የመጥበሻ ዘይት ከሁለት ጊዜ በላይ አትጠቀሙ፡፡ ሁሌም አዲስ ዘይት ተጠቀሙ፡፡',
      'አርቴፊሻል ማጣፈጫዎችን ከመጠቀም በመቆጠብ ጨው፡ ስኳር፡ እና በርበሬ ተጠቀሙ፡፡'
    ]),
    SubTitleText(
        text:
            '1. እጃችሁን ዘወትር በውሃና በሳሙና ታጠቡ፡፡ አትክልት ከማዘጋጀቱ በፊት በዉሃና በአጃክስ እጠቡት፡፡'),
    CourseBodyImage(image: 'assets/materials/images/image1060.png'),
    SubTitleText(
        text: '2. የማድ ቤት እቃዎች በንጽህና በመያዝ የበሰሉና ያልበሰሉ ምግቦችን በመለየት አስቀምጡ፡፡'),
    CourseBodyImage(image: 'assets/materials/images/image1061.png'),
    SubTitleText(
        text:
            '3. ምግባችሁ በአግባቡ መብሰሉን አረጋግጡ፡፡ በተለይ የእንስሳት ተዋጽኦ ምግቦች በአግባቡ መብሰል አለባቸው፡'),
    CourseBodyImage(image: 'assets/materials/images/image1062.png'),
    SubTitleText(text: '4. ንጹህ ዉሃ፡ ትኩስ እና ያልተበላሸ የምግብ ጥሬ ዕቃ ተጠቀሙ፡፡'),
    CourseBodyImage(image: 'assets/materials/images/image1063.png'),
    SubTitleText(text: '5. የበሰለን ምግብ በንጹህ ቦታ ያስቀምጡ፡፡ ከተቻለ በፍሪጅ ውስጥ ያስቀምጡ፡፡'),
    CourseBodyImage(image: 'assets/materials/images/image1064.png'),
    SubTitleText(text: 'ምግብ በምናበስልብት ጊዜ መዉስድ ያለብን ጥንቃቄ'),
    Paragraph(
        title: '',
        body:
            'በቤት ውስጥ እና ውጭ የምናደርጋቸው እንቅስቃሴዎቻችን ከተለያዩ ቦታዎቸ ለሚመጡ ጀርሞች እና ተሃዋሲያን ተጋላጭ ያደርጉናል፡፡ ይህን ለመከላከል ማድ ቤታችን ከጭስ፡ ከቆሻሻና ከተባይ የጸዳ መሆን አለበት፡፡'),
    Paragraph(title: 'ምግብ በሚበሰልበት ጊዜ የሚከተሉት ጥንቃቄዎች መወሰድ አለባቸው', body: ''),
    CourseBodyImage(image: 'assets/materials/images/image1134.png'),
    Paragraph(
        title: 'የማብሰያ ልብስ ለብሰዉ ያብስሉ',
        body: 'ለማብሰያነት የሚጠቀሙበትን ጋዋን ዘወትር በማጠብ ንጹህ ያድርጉ'),
    CourseBodyImage(image: 'assets/materials/images/image1135.png'),
    Paragraph(
        title: 'ጸጉርዎን በመጠቅለያ ይሰሩ',
        body: 'የምግብ ብክለትን ለመከላከል ጸጉርወትን በመጠቅለያ ይጠቅሉ'),
    CourseBodyImage(image: 'assets/materials/images/image1133.png'),
    Paragraph(
        title: 'እጅዎትን በውሃና በሳሙና ይታጠቡ',
        body:
            'ምግብዎትን ከጀርሞች ለመከላከል እጅወትን ከምግብ በፊትና ከምግብ በኋላ ለ 60 ሰከንድ በውሃና በሳሙና ይታጠቡ')
  ]),
);
