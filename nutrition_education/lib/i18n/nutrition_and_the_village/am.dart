import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/utils/open_url.dart';
import 'package:nutrition_education/widgets/course_video_player.dart';
import 'package:nutrition_education/widgets/color_table.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
    coverImage: 'assets/materials/family_nutration.png',
    title: 'የቤተሰብ ስርዓተ ምግብ',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CourseVideoPlayer(video: 'assets/videos/food_groups.mp4'),
        InkWell(
          onTap: () {
            openUrl(
                'https://www.youtube.com/watch?v=Y3dtjjO4Kk4&t=2s&ab_channel=CertaNutritio');
          },
          child: const Text(
            'ምንጭ - Youtube Certa Nutritio',
            style: TextStyle(color: Colors.blueAccent),
          ),
        ),
        // CourseBodyImage(image: 'assets/materials/family_nutration.png'),
        const SubTitleText(text: 'ሳንመገብ ምን አንሆናለን'),
        const CourseBodyImage(image: 'assets/materials/img_3.png'),
        const Paragraph(
            title: '',
            body:
                'የምትመለከቷቸዉ አራቱ ሕጻናት በእኩል እድሜ ቢኖራቸዉም በስርዓተ ምግባቸዉ የተለያዩ ናቸዉ፡፡ ሕጻን ሐ ብቻ ነዉ ጤናማ ልጅ'),
        const ColorTable(children: [
          [
            Text(''),
            Text('ህጻን ሀ'),
            Text('ህጻን ለ'),
            Text('ህጻን ሐ'),
            Text('ህጻን መ')
          ],
          [Text('የመነመነ'), Text('ነው'), Text('አደለም'), Text('አደለም'), Text('አደለም')],
          [Text('የቀነጨረ'), Text('አደለም'), Text('ነው'), Text('አደለም'), Text('አደለም')],
          [Text('በጣም የከሳ'), Text('ነው'), Text('ነው'), Text('አደለም'), Text('አደለም')],
          [
            Text('በጣም የወፈረ'),
            Text('አደለም'),
            Text('አደለም'),
            Text('አደለም'),
            Text('ነው')
          ],
          [
            Text('የተስተካከለ'),
            Text('አደለም'),
            Text('አደለም'),
            Text('ነው'),
            Text('አደለም')
          ]
        ]),
        const Paragraph(
            title: 'አነዚሀ ሕጻናት የንጥንረ አጥረት ገጥሟ ሊሆንም ይችላል፥፥', body: ''),
        const Paragraph(
            title: '',
            body:
                'በአመጋገብ የተጎዳች ነብሰ ጡር እናት አነስተኛ ክብደት ያላት ህጻን ትወልዳለች፡፡ ይች ደካማ አስተዳደግ ያላት ልጅ ወደፊት አነስተኛ ክብት ያለዉ ልጅ ተወልዳለች፡፡'),
        const CourseBodyImage(image: 'assets/materials/imag_4.png'),
        const Paragraph(
            title: '',
            body:
                '2 የምግብ አይነት የያዘ መሶብ፡ እንጀራና ሽሮ፡፡ ይህ መሶብ የተመጣጠነ እንዲሆን ሌሎች ምግቦች መጨመር አለባቸዉ'),
        const CourseBodyImage(image: 'assets/materials/img_6.png'),
        const Paragraph(
            title: '',
            body:
                '5 የምግብ አይነት የያዘ መሶብ፡ እንጀራና (የጤፍ) ዶሮ (ከእንስሳት) የጓሮ አትክልት፤ ሽሮ እና ፍራፍሬ'),
        const CourseBodyImage(image: 'assets/materials/img_7.png'),
        const Paragraph(
            title: '',
            body: 'በየቀኑ እነዚህን 6 ቱን የምግብ አይነቶች ይመገቡ። ካላመረቱ የተመጣጠነ ምግብ ይመገቡ።'),
        const CourseBodyImage(image: 'assets/materials/img_1.png'),
        const Paragraph(
            title: '',
            body:
                'የተስተካከለ ስርዓተ ምግብ የሚመገቡ ህጻናት በትምህርታችው ጎበዝ ጤናማና ዘወትር ትምህርት ቤት የሚገኙ ናቸው'),
        const CourseBodyImage(image: 'assets/materials/img_8.png'),
        const Paragraph(title: '', body: 'ምግብ ለግብርናችን ሃይል ይስጣል'),
        const CourseBodyImage(image: 'assets/materials/img_9.png'),
        const Paragraph(
            title: '',
            body:
                'ሁልጊዜም በተቆፈረ መፀዳጃ ቤት ይጠቀሙ፥፥ ሲመለሱ አጅወን በውሃና በሳሙና ይታጠቡ፥፥ ምግብን ሁሌም ከድነው በማስቀመጥ አንደ አይጥና ዝንብ ከመሳሰሉት በሽታ አስተላላፊ ተሃዋሲያን ይከላከሉ'),
        const CourseBodyImage(image: 'assets/materials/img_10.png'),
      ],
    ));
