import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/sanittion_image.png',
  title: 'Usafi na Usafi wa Mazingira',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/sanittion_image.png'),
    SubTitleText(text: 'Usafi ni nini'),
    Paragraph(
        title: '',
        body:
            'Usafi ni tabia ya kudumisha usafi ili kuhifadhi afya na kuzuia kuenea kwa magonjwa. Matendo ya kawaida ya usafi wa kibinafsi ni pamoja na kuosha mikono yako, kuoga, na kupiga mswaki. Mbali na usafi wa kibinafsi, usafi wa chakula pia ni muhimu. Mazoea ya kawaida ya usafi wa chakula ni pamoja na kusafisha chakula chako, kutumia vyombo safi, kupika vizuri, kuhifadhi, na kupasha moto upya vizuri. Kama vile usafi wa kibinafsi, kutojali na usafi wa chakula pia huongeza hatari ya kueneza magonjwa. Chakula kilichochafuliwa kinaweza kuwa na virusi au bakteria ndani yake. Ukila mojawapo ya haya, huenda ukaugua. Kuna mambo mengi tofauti ya usafi, lakini baadhi ya muhimu zaidi ni pamoja na: '),
    Bullet(children: [
      'Kuoga au kuoga mara kwa mara',
      'Osha mikono yako mara kwa mara, haswa baada ya kutumia choo au kushughulikia chakula',
      'Kusafisha na kupiga mswaki meno yako kila siku',
      'Kuvaa nguo safi na kuzibadilisha mara kwa mara',
      'Kusafisha nyumba yako na nafasi ya kuishi ili kuzuia mkusanyiko wa uchafu, vumbi, na hatari zingine za kiafya',
    ]),
    CourseBodyImage(image: 'assets/materials/hand_washing_steps.png'),
    Paragraph(title: 'Hatua za kuosha mikono', body: ''),
    SubTitleText(text: 'Usafi wa Mazingira ni Nini?'),
    CourseBodyImage(image: 'assets/materials/what_is_higine.png'),
    Paragraph(
        title: '',
        body:
            'Kulingana na Shirika la Afya Ulimwenguni, usafi wa mazingira unamaanisha udhibiti sahihi na salama wa kinyesi cha binadamu, kutoka chooni hadi utupaji wa taka ngumu. Usafi wa mazingira usiofaa ni sababu kuu ya magonjwa na vifo duniani kote, hasa miongoni mwa watoto. Usafi wa mazingira pia unajumuisha taka ngumu, taka za wanyama, na takataka katika muktadha mpana. Kuna njia nyingi tofauti za kufanya usafi wa mazingira, na ni muhimu kutafuta njia ambayo inafaa zaidi kwako. Kuna aina nne kuu za usafi wa mazingira: kibinafsi, chakula, maji, na taka.'),
    Bullet(children: [
      'Kuna mifumo tofauti ya usafi wa mazingira, na inayojulikana zaidi ni mifereji ya maji machafu, matangi ya maji taka, na vyoo vya shimo. Kila aina ina faida na hasara zake.',
      'Jambo muhimu zaidi la kuzingatia ni mazingira ambayo itatumika. Kwa mfano, mifumo ya maji taka haifai kwa maeneo yenye viwango vya juu vya maji chini ya ardhi kwa sababu yanaweza kuchafua maji.'
    ])
  ]),
);
