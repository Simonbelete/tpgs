import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  title: "UWEZESHAJI WA WANAWAKE NA", // UCHUMBA
  coverImage: "assets/materials/images/4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: "MALENGO", children: [
        "Kuongeza uelewa wa wanaume juu ya jukumu lao katika kukuza lishe bora ya familia na Kuwawezesha wanawake kufanya maamuzi kuhusu rasilimali za familia ili kupata lishe bora."
      ]),
      CourseBodyImage(
        image: "assets/materials/images/4.png",
      ),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Mume na mke wanapaswa kujadiliana kwa pamoja jinsi ya kutumia mapato yanayopatikana kunufaisha lishe ya familia",
        "Mume anapaswa kuhakikisha kuwa familia ina vyakula vya kutosha vya aina mbalimbali ndani ya nyumba",
        "Mume anapaswa kutegemeza mzigo wa kazi wa mke inapohitajika ili kumsaidia mke wake kutumia wakati na nguvu zake ili awe na wakati wa kutosha wa kuandaa milo ya familia yenye lishe.",
        "Mume na mke wanapaswa kujadili kwa pamoja na kupanga milo yao ya familia ili kutambua mapungufu katika kutafuta chakula",
      ]),
      SubTitleText(text: 'Kwa nini uwezeshaji wa wanawake'),
      Bullet(children: [
        'Wanawake hawana uwakilishi mdogo katika madaraka na majukumu ya kufanya maamuzi.',
        'Wanawake hupokea malipo yasiyo sawa kwa kazi sawa.',
        'Pata ukatili wa kimwili na/au kingono.',
        'Hazipewi nafasi sawa za kazi, elimu, mafunzo, na fursa za maendeleo ya kitaaluma.',
        'Wanawake wana hali duni kiuchumi na wanakosa fursa sawa za kushindana kwa biashara.',
        'Usawa wa kijinsia unaendelea kutopewa kipaumbele na watoa maamuzi.'
      ]),
      SubTitleText(text: 'Fursa'),
      Bullet(children: [
        'Kusaidia afya ya wanawake husababisha faida kubwa na kupunguza utoro.',
        'Kushughulikia unyanyasaji dhidi ya wanawake hupunguza gharama za kampuni.',
        'Kujenga maeneo mbalimbali ya kazi huongeza tija.',
        'Uwekezaji katika biashara zinazomilikiwa na wanawake huleta faida kubwa kwenye uwekezaji.',
        'Kuchukua faida ya nguvu ya watumiaji wa wanawake ni uamuzi wa biashara wenye busara.',
        'Kuongezeka kwa wanawake katika uongozi husababisha ufanisi wa shirika na msingi wa mafanikio.'
      ]),
      Paragraph(
          title:
              'Uwezeshaji wa wanawake ni kichocheo muhimu cha maendeleo endelevu. Kuwawezesha wanawake kushiriki kikamilifu katika maisha ya kiuchumi katika sekta zote na katika ngazi zote za shughuli za kiuchumi ni muhimu kwa:',
          body: ""),
      Bullet(children: [
        "Kupanua ukuaji wa uchumi na kujenga uchumi imara.",
        "Kukuza maendeleo ya kijamii na kuanzisha jamii imara zaidi na za haki.",
        "Kuboresha ubora wa maisha kwa wanawake, wanaume, familia na jamii.",
        "Boresha shughuli na malengo ya biashara na kuboresha utendaji wa biashara."
      ])
    ],
  ),
);
