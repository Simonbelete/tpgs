import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/utils/open_url.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/course_video_player.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/sanittion_image.png',
  title: 'የግልና የአካባቢ ንጽህና',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const CourseBodyImage(image: 'assets/materials/img_12.png'),
    const Paragraph(
        title: '',
        body:
            'የልጅዎን ዳይፐር ከቀየሩ በኋላ የህጻናትን ሰገራ ከጠረጉና ከመጸዳጃ ቤት ከተመለሱ በኋላ እጅወን በዉሃና በሳሙና ይታጠቡ'),
    const Paragraph(
        title: '',
        body:
            'ምግብ ከማዘጋጀትወ በፊት ህጻናትን ከመመገብወ በፊትና ምግብ ከተመገቡ በኋላ እጅወን በዉሃና በሳሙና ይታጠቡ፡'),
    CourseVideoPlayer(video: 'assets/videos/hyigene_food.mp4'),
    InkWell(
      onTap: () {
        openUrl(
            'https://www.youtube.com/watch?v=TDFB75pMqx0&list=PLOS5MMmDL-YfeyCd_9XH9OroWjFENho6P&index=7&ab_channel=CertaNutritio');
      },
      child: const Text(
        'ምንጭ - Youtube Certa Nutritio',
        style: TextStyle(color: Colors.blueAccent),
      ),
    ),
    const SubTitleText(text: 'የምግብና የውሃ ብክለትን ለመከላከል የሚወሰዱ ጥንቃቄወች'),
    const CourseBodyImage(image: 'assets/materials/img_13.png'),
    const Bullet(children: [
      'ለመፀዳዳት በተቆፈረ ሽንት ቤት ይጠቀሙ፡፡ ሜዳ ወይም ጓሮ ላይ አይጠቀሙ፡፡ ሜዳ ወይም ጓሮ ላይ መፀዳዳት ለበሽታ አምጭ ተሃዋስያን(ጀርሞች) ያጋልጣል፡',
      'ጀርሞች በዝንብ፤ ባልታጠበ እጅ፤ በቆሻሻ ዉሃና በሰብል ንክኪ አማካኝነት ይተላለፋሉ፡፡',
      'እነዚህ ጀርሞች ወደ ምግባችን ሊገቡ ይችላሉ፡፡ ይህ እንዳይሆን እጅን መታጠብ፡ ምግብን መክደንና ዉሃን ማከም ያስፈልጋል፡፡',
      'ህጻናትን ከተቅማጥና ከሌሎች በሽታወች ለመከላከል መግባቸዉንና የመጫወቻ ቦታቸዉን በንጽህና መያስ አለብን፡፡'
    ]),
    const CourseBodyImage(image: 'assets/materials/img_14.png'),
    const Paragraph(title: '', body: 'የሚጠጣ ዉሃ ጀርሞች እንዳይገቡበት ክፍት መተዉ የለበትም፡፡'),
    const CourseBodyImage(image: 'assets/materials/img_15.png'),
    const Paragraph(title: '', body: 'ብክለትን ለመከላከል የሚጠጣ ውሃ አንደዚህ መክደን ይኖርበታል'),
    const CourseBodyImage(image: 'assets/materials/img_16.png'),
    const Paragraph(
        title: '', body: 'የሚጠጣ ዉሃን በዉሃ አጋር በማከም ወይም አፍልተን በማቀዝቀዝ መጠጣት አለብን፡፡'),
    const CourseBodyImage(image: 'assets/materials/hand_washing_steps.png'),
    const Paragraph(
        title: '',
        body:
            'እጅወን ከላይ በምስሉ እንደሚታየዉ ለብ ባለ ዉሃና በሳሙና መታጠብ ከዛም በነፋስ ወይም በንፁህ ፎጣ ማድረቅ፡፡')
  ]),
);
