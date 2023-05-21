import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/color_table.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/image900.png',
  title: 'ቁርስ የመመገብ ጥቅም',
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      CourseBodyImage(image: 'assets/materials/image900.png'),
      Paragraph(
          title: 'ቁርስ የመመገብ ጥቅም',
          body:
              'ሁል ጊዜ ቀኑን በተመጣጠነና በጤናማ ቁርስ ስንጀምር ሰዉነታችን የዕለት ከዕለት ተግባሩን ለማከናወን በቂ ሀይልና ጉልበት ያገኛል፡፡ ይህ ሀይልና ጉልበት ከምንመገበው ምግብ ይመጣል፡፡ ቁርሳችን የተመጣጠነ ምግብ ተመገብን ለማለት የግድ የእንስሳት ተዋፅኦ ምግባችን ላይ መጨመር አለብን፡፡'),
      SubTitleText(text: 'ቁርስ የመመገብ ጥቅሞች'),
      Bullet(children: [
        'እለታዊ የስርዓተ ምግብ ፍላጎታችንን ያሟላልናል፡፡',
        'በዕንቅስቃሴ ጊዜ ንቁና ቀልጣፋ እንድንሆን ይረዳናል',
        'ጤናማ ክብደት እንዲኖረን ያደርጋል'
      ]),
      SubTitleText(text: 'የጤናማ ቁርስ ምሳሌዎችን ከታች ይመልከቱ'),
      CourseBodyImage(image: 'assets/materials/chicken_porage.png'),
      Paragraph(title: 'ከዶሮ የተሰራ ገንፎ', body: ''),
      CourseBodyImage(image: 'assets/materials/egg_sandwich.png'),
      Paragraph(title: 'እንቁላል ሳንድዊች', body: ''),
      CourseBodyImage(image: 'assets/materials/carot_and_rice_cacke.png'),
      Paragraph(title: 'ከስጋ  ከካሮት እና  ከሩዝ የተሰራ ኬክ', body: ''),
      Paragraph(
          title: '',
          body:
              'ቤተሰቡ የተለያየ ቁርሶችን በማዘጋጀት እንዲሳተፍ ማድረግ ለመላው ቤተሰብ የፈጠራ እና የመደጋገፍ መንፈስን ይገነባል፡፡'),
      SubTitleText(text: 'የቁርስ ጥቅም'),
      CourseBodyImage(image: 'assets/materials/image1059.png'),
      Paragraph(
          title: '',
          body:
              'ከ 7-12 አመት አእድሜ ላላቸው ህጻናት የሃይል ፍላጎት በቀን ከ 1600-2200 kcaL ነው፡፡ ልጆች የእለት ተዕለት ተግባራቸዉን ለማከናወን በቂ ጉልበት እንዲኖራቸው ለማድረግ ቁርስ በቀን እንዲያገኙት ከሚጠበቀዉ መጠን ዉስጥ ክ 15-30% ይይዛል፡'),
      Paragraph(
          title: '',
          body:
              'የተለያዩ የልጆች እንቅስቃሴ በየቀኑ በቂ ካሎሪ ይፈልጋል፡፡ ቁርስ የቀኑ  የመጀመሪያ ምግብ እንደመሆኑ መጠን ለወንዶች እና ልጃገረዶች አስፈላጊ ነው፡፡ ምንም እንኳን በተለያየ መጠን እንደ ልጆች ክብደት እና የዕለት ከዕለት እንቅስቃሴ የተለያየ ቢሆንም፡፡'),
      Paragraph(
          title: '',
          body:
              'በቤት ዉስጥ ጤናማ ምግቦችን ማዘጋጀት እና መመገብ የልጆችን በሽታ የመከላከል አቅም ሊደግፍ እና በየቀኑ የሀይል ፍላጎታቸውን ሊያሟላ ይችላል፡፡ ጤናማ ልጆች እንዲኖሩን ጤናማ አመጋገብ ተግባራዊ እናድርግ፡፡ '),
      Paragraph(title: '', body: 'ከ 7-12 ዓመት ያሉ ህጻናት የሃይል ፍላጎት'),
      ColorTable(children: [
        [Text(''), Text('ወንዶች'), Text('ልጃገረዶች')],
        [Text('የሃይል ፍላጎት'), Text('500-600 kcaL'), Text('400-550 kcaL')],
        [Text('የፕሮቲን ፍላጎት'), Text('15-18 Grams'), Text('10-14 Grams')]
      ]),
      Paragraph(title: 'አስታዉሱ የሰውነት ድርቀትን ለመከላከል በቂ ውሃ መጠጣት አለባችሁ!! ', body: '')
    ],
  ),
);
