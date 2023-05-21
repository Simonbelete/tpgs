import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
    coverImage: 'assets/materials/image156.png',
    title:
        'Wacha tupunguze matumizi yetu ya chakula chenye Sukari, Chumvi na Mafuta mengi (SSF)',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: '',
            body:
                'Je! unajua kwa nini tunapaswa kupika milo yetu kila siku? Kwa sababu tunaweza kuwa na uhakika wa kile kilicho katika chakula chetu. Kwa hiyo vyakula vingi vilivyoonyeshwa hapa chini vinapatikana kwa urahisi vinauzwa katika sehemu mbalimbali, na vina sukari, chumvi, na mafuta yanayozidi mahitaji yetu ya kila siku.'),
        Paragraph(
            title: 'Chumvi',
            body:
                'inaweza kuingia kwenye mlo kutoka kwa vyakula vilivyochakatwa kama vile vyakula vilivyo tayari kuliwa, tambi, na jibini, vitafunio vyenye chumvi nyingi kama chipsi na mchanganyiko, nyama iliyochakatwa kama vile Bacon, ham, salami, n.k., au kupitia vyakula vilivyosheheni vihifadhi kama vile kachumbari, jamu, jeli, michuzi, nk Vile vile, sukari ya bure inaweza kuongezwa kwa gravies, soda, shakes, juisi za matunda zilizojilimbikizia, pipi, vitafunio vya sukari, nk.'),
        Paragraph(
            title: 'Chumvi na sukari',
            body:
                'ina jukumu muhimu katika utendaji mzuri wa mwili. Chumvi ni madini yanayohitajika ili kudumisha viwango vya maji na usawa wa msingi wa asidi, kufanya msukumo wa neva, na kudhibiti mikazo ya misuli. Kwa upande mwingine, sukari ni aina ya wanga na chanzo kizuri cha nishati kwa shughuli zetu za kila siku.'),
        SubTitleText(text: 'Some tips to control excessive intake:'),
        Bullet(children: [
          'Epuka kutumia shakers za chumvi kwenye meza ya chakula',
          'Tazama, soma na uchanganue lebo za vyakula kabla ya kununua bidhaa',
          'Punguza matumizi ya vitafunio vyenye chumvi',
          'Pendelea milo iliyopikwa nyumbani kuliko milo iliyo tayari kuliwa',
          'Punguza vyakula vilivyochakatwa na vilivyosheheni vihifadhi katika mlo wako',
          'Sukari iliyoongezwa haina faida, hivyo epuka kuongeza sukari kwenye vinywaji na vyakula vingine',
          'Epuka sukari nyeupe iliyosafishwa na ibadilishe na vibadala vya afya kama vile karanga, zabibu kavu, tini, manuka, jager hai, asali, sukari ya nazi, n.k.',
          'Kula milo midogo midogo ya mara kwa mara ili kuepuka matamanio ya sukari',
        ]),
        SubTitleText(text: 'Matumizi ya sukari'),
        Bullet(children: ['Vijiko 4 vya supu', '50 g kwa mtu kwa siku']),
        CourseBodyImage(image: 'assets/materials/suger_bowl.png'),
        SubTitleText(text: 'Matumizi ya chumvi'),
        Bullet(children: ['Kijiko 1 cha chai', '5 g / mtu kwa siku']),
        CourseBodyImage(image: 'assets/materials/salt_with_container.png'),
        SubTitleText(text: 'Matumizi ya mafuta'),
        Bullet(children: ['Vijiko 5 vya supu', '50 g kwa mtu kwa siku']),
        CourseBodyImage(image: 'assets/materials/fat_ic.gif'),
        SubTitleText(text: 'Kiasi kikubwa cha chumvi na mafuta'),
        CourseBodyImage(image: 'assets/materials/fat_salty_food.png'),
        CourseBodyImage(image: 'assets/materials/salty_and_fatty_food_2.png'),
        SubTitleText(text: 'Kiasi kikubwa cha sukari na mafuta'),
        CourseBodyImage(image: 'assets/materials/sugery_and_salty_food.png'),
        SubTitleText(text: 'Kiasi kikubwa cha sukari'),
        CourseBodyImage(image: 'assets/materials/sugrey_food.png')
      ],
    ));
