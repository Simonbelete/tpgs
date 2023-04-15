import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
    coverImage: 'assets/materials/image156.png',
    title: 'የጨው፡ የስኳር እና የቅባት መጠን ስለመወሰን',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: '',
            body:
                'እነዚህን ምግቦችለሰውነታችን አስፈላጊ ናቸው፡፡ ነገር ግን የእለት ከእለት አወሳሰዳችን የሚከተለውን መጠን ያላቸውን ምግቦች ማሟላት ይኖርበታል፡፡ '),
        Paragraph(
            title: '',
            body:
                'ብዙ ጥናቶች የስኳርን አሉታዊ ተጽእኖዎች ያሳያሉ:: በስኳር የተሞላ አመጋገብ እንደ የስኳር በሽታ, ካንሰር እና የልብ ሕመም የመሳሰሉ የጤና ችግሮች ሊያስከትል ይችላል::'),
        SubTitleText(text: 'የስኳር አጠቃቀም'),
        Bullet(children: ['4 የሾርባ ማንኪያ', '50 ግ/በሰው/በቀን']),
        CourseBodyImage(image: 'assets/materials/suger_bowl.png'),
        SubTitleText(text: 'የጨው አጠቃቀም'),
        Bullet(children: ['1 የሻይ ማንኪያ', '5 ግ/በሰው/በቀን']),
        CourseBodyImage(image: 'assets/materials/salt_with_container.png'),
        SubTitleText(text: 'የቅባት አጠቃቀም'),
        Bullet(children: ['5 የሾርባ ማንኪያ', '67 ግ/በሰው/በቀን']),
        CourseBodyImage(image: 'assets/materials/fat_ic.gif'),
        SubTitleText(
            text:
                'በየቀኑ የምንመገበውን ስኳር፡ ጨው እና የቅባት መጠንን በተመለከተ ከፍተኛ ጥንቃቄ ያስፈልጋል፡፡'),
        Paragraph(title: '', body: 'ምግባችንን አብስለን መመገብ ያለብን ለምን እንደሆነ ታውቃላችሁ?'),
        Paragraph(
            title: '', body: 'ምክያቱም ምግባችን ሲበስል የተለያዩ በሽታ አምጭ ህዋሳት ይሞታሉ፡፡ '),
        Paragraph(
            title: '',
            body:
                'ገር ግን ሁሉም ምግቦች የግድ መበሰል የለባቸውም፡፡ በምግባችን ውስጥ የምንጠቀማቸውን ስኳር፡ ጨው እና ቅባት መመጠን አለብን፡፡'),
        SubTitleText(text: 'ከፍተኛ ጨውና ቅባት ምግቦች'),
        CourseBodyImage(image: 'assets/materials/fat_salty_food.png'),
        CourseBodyImage(image: 'assets/materials/salty_and_fatty_food_2.png'),
        SubTitleText(text: 'ከፍተኛ ስኳርና ቅባት ምግቦች'),
        CourseBodyImage(image: 'assets/materials/sugery_and_salty_food.png'),
        SubTitleText(text: 'ከፍተኛ ስኳር ምግቦች'),
        CourseBodyImage(image: 'assets/materials/sugrey_food.png')
      ],
    ));
