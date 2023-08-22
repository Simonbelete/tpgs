import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/images/image1057.png',
  title: 'VIWANGO VYA USALAMA WA CHAKULA',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/images/image1057.png'),
    SubTitleText(
        text:
            'Usalama wa chakula na mazoea ya usafi katika utayarishaji wa chakula'),
    Paragraph(
        title: '',
        body:
            'Kadiri tunavyohitaji lishe bora na yenye usawa kwa afya bora, tunahitaji pia kukumbuka kanuni za usafi wa chakula na mazoea ya usalama. Ni muhimu kuzingatia haya tunapotayarisha chakula:'),
    Bullet(children: [
      'Hakikisha zana za jikoni na vifaa vya chakula ni safi.',
      'Hakikisha kuwa mahali pako ni safi bila takataka na hakuna wadudu kama vile panya, mijusi na wadudu.',
      'Epuka kutumia mafuta ya kukaanga zaidi ya mara mbili, kwani daima ni bora kutumia mafuta mapya.',
      'Badilisha matumizi ya ladha ya bandia na MSG kwa mchanganyiko wa chumvi, sukari, pilipili na viungo vingine vya kupikia.'
    ]),
    SubTitleText(
        text:
            '1. Nawa mikono kwa sabuni na maji yanayotiririka. Osha mazao kabla ya usindikaji.'),
    CourseBodyImage(image: 'assets/materials/images/image1060.png'),
    SubTitleText(
        text:
            '2. Weka zana za jikoni, malighafi ya chakula na chakula kilichopikwa katika hifadhi/kontena tofauti.'),
    CourseBodyImage(image: 'assets/materials/images/image1061.png'),
    SubTitleText(
        text:
            '3. Hakikisha chakula kimepikwa vizuri na kwa ukamilifu, hasa bidhaa za vyakula vya wanyama.'),
    CourseBodyImage(image: 'assets/materials/images/image1062.png'),
    SubTitleText(
        text: '4. Tumia maji safi na malighafi safi na salama ya chakula.'),
    CourseBodyImage(image: 'assets/materials/images/image1063.png'),
    SubTitleText(
        text: '5. Hifadhi chakula kilichopikwa kwenye joto sahihi na salama.'),
    CourseBodyImage(image: 'assets/materials/images/image1064.png'),
    SubTitleText(text: 'Mazoea safi na yenye afya ni muhimu jikoni'),
    Paragraph(
        title: '',
        body:
            'Shughuli nyingi ndani na nje ya nyumba zetu hutuweka wazi kwa uchafu na vijidudu kutoka sehemu mbalimbali. Tunahitaji kuwa makini jikoni na kujiepusha na takataka, moshi na wadudu kama panya. Jizoeze kila mara tabia hizi safi na zenye afya unapotayarisha chakula jikoni.'),
    Paragraph(
        title: 'Tahadhari zifuatazo zinapaswa kuchukuliwa wakati wa kupikia',
        body: ''),
    CourseBodyImage(image: 'assets/materials/images/image1134.png'),
    Paragraph(
        title: 'Tumia apron kila wakati',
        body: 'Osha aproni mara kwa mara ili iwe safi unapopika.'),
    CourseBodyImage(image: 'assets/materials/images/image1135.png'),
    Paragraph(
        title: 'Funga nywele zako',
        body:
            'Vaa vizuizi vya nywele kila wakati ili kuzuia uchafuzi wa chakula.'),
    CourseBodyImage(image: 'assets/materials/images/image1133.png'),
    Paragraph(
        title: 'Nawa mikono kwa sabuni',
        body:
            'Nawa mikono kwa maji yanayotiririka kwa sekunde 60 kabla na baada ya kupika ili kuepuka vijidudu na bakteria kutoka kwenye chakula.')
  ]),
);
