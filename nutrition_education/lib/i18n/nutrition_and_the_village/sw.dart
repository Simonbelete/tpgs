import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
    coverImage: 'assets/materials/nutrient_village.png',
    title: 'Lishe na Kijiji cha Lishe',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
          title: 'Lishe :- ',
          body:
              'ni ulaji wa chakula na mwingiliano wa michakato ya kibayolojia, kijamii na kiuchumi ambayo huathiri ukuaji, utendaji kazi na ukarabati wa mwili.',
        ),
        Paragraph(
          title: 'Virutubisho :- ',
          body:
              'ni sehemu za vyakula ambavyo kiumbe hutumia kuishi na kukua. Kuna aina mbili za virutubisho: macronutrients na micronutrients.',
        ),
        Paragraph(
            title: 'Macronutrients :-',
            body:
                'kutoa nishati nyingi ambayo mfumo wa kimetaboliki wa kiumbe unahitaji kufanya kazi.'),
        Paragraph(
            title: 'Virutubisho vidogo :- ',
            body:
                'kutoa cofactors muhimu kwa kimetaboliki kufanyika. Aina zote mbili za virutubishi zinaweza kupatikana kutoka kwa lishe.'),
        Paragraph(
            title: 'Macronutrients :- ',
            body:
                'ni pamoja na wanga, protini, mafuta, na maji, ambapo micronutrients ni pamoja na vitamini na madini.'),
        CourseBodyImage(image: 'assets/materials/nutrient_village.png'),
        Paragraph(
            title: 'Mahitaji ya lishe ',
            body:
                'rejea virutubishi tofauti ambavyo mwili unahitaji kwa ajili ya nishati, ukuaji na ukarabati, na ulinzi dhidi ya magonjwa. Zinatofautiana kulingana na umri, jinsia, shughuli za kimwili, urefu, uzito, na hali ya afya ya mtu binafsi.'),
        Paragraph(
            title: '',
            body:
                'Kila chakula kina kiasi tofauti cha virutubisho tofauti, ambavyo wakati mwingine huingiliana katika mwili. Hali ya lishe ya mtu binafsi, kwa hiyo, inatokana na ulaji wa virutubisho, mahitaji ya virutubisho, na uwezo wa mwili wa kusaga, kutumia na kunyonya virutubisho vinavyoingizwa.'),
        SubTitleText(text: 'Macronutrients'),
        Paragraph(
            title: 'Wanga ',
            route: HomeScreen.routeName,
            body:
                'kuupa mwili nishati ya kuweka hai, kujenga na kutengeneza tishu, kuwa na joto, na kusonga na kufanya kazi. Wanga ni chanzo kikubwa zaidi na cha kiuchumi cha nishati ya chakula katika mlo wa binadamu.'),
        Paragraph(
            title: '',
            body:
                'Je, ni vyanzo gani vikuu vya vyakula vya wanga ambavyo mlo wa Ethiopia unajumuisha?'),
        CourseBodyImage(image: 'assets/materials/carbohydrates.png'),
        Paragraph(
            title: 'Protini ',
            route: HomeScreen.routeName,
            body:
                'kuupa mwili asidi muhimu ya amino ambayo ina anuwai ya kazi: ukuaji na ukuzaji, ukarabati au uingizwaji wa tishu, utengenezaji wa vimeng\'enya vya kimetaboliki na usagaji chakula, na baadhi ya homoni.'),
        CourseBodyImage(image: 'assets/materials/proteins.png'),
        Paragraph(
            title: 'Maji ',
            route: HomeScreen.routeName,
            body:
                'ni muhimu kwa maisha, na ni muhimu kupata kiasi sahihi cha maji ili kuwa na afya. Maji safi ya kutosha yanahitajika na mwili kila siku.'),
        Paragraph(
            title: 'Mafuta ',
            route: HomeScreen.routeName,
            body:
                'Mafuta hutoa mwili na asidi muhimu ya mafuta ili kujenga utando wa seli na kufanya homoni. Pia husaidia mwili kunyonya na kusafirisha baadhi ya vitamini muhimu. Mafuta pia huupa mwili chanzo cha nishati. Mafuta ni muhimu kwa ukuaji, uzazi, uadilifu wa ngozi, kudumisha seli, na kutumia mafuta ya mwili kwa nishati. '),
        CourseBodyImage(image: 'assets/materials/fats.png'),
        SubTitleText(text: 'Virutubisho vidogo'),
        Paragraph(
            title: 'Vitamini ',
            route: HomeScreen.routeName,
            body:
                'ni kundi la misombo ya kikaboni ambayo hufanya kazi muhimu katika mwili lakini haiwezi kufanywa na mwili. Vitamini vingine vinaweza kuhifadhiwa mwilini, kwa hivyo zinahitaji kuliwa mara nyingi lakini sio kila siku (vitamini zenye mumunyifu wa mafuta A, D, E, na K). Kinyume chake, vingine haviwezi kuhifadhiwa na vinapaswa kuliwa kila siku (vitamini B zisizo na maji, vitamini C).'),
        Paragraph(
            title: 'Vitamini ',
            route: HomeScreen.routeName,
            body:
                'kucheza majukumu tofauti katika kusaidia mwili kwa njia muhimu. Baadhi ya mifano ni pamoja na kujenga protini na seli, kulinda seli kutokana na uharibifu, kujenga mifupa, kulinda maono, kumetaboli madini kuu, na kusaidia kuponya majeraha. Bila vitamini muhimu, magonjwa mengi ya lishe yanaweza kusababisha.'),
        CourseBodyImage(image: 'assets/materials/vitamins.png'),
        Paragraph(
            title: 'Madini ',
            route: HomeScreen.routeName,
            body:
                'ni vikundi dhabiti, vya isokaboni vya misombo ambayo ni vijenzi muhimu vya aina tofauti za seli. Madini muhimu ni pamoja na chuma, zinki, kalsiamu, na iodini, kati ya zingine. Kwa mfano, chuma ni sehemu ya chembe nyekundu za damu, ambazo husafirisha oksijeni kupitia mwili. Zinki ina kazi nyingi muhimu katika mwili, ikiwa ni pamoja na uundaji wa seli na mifumo ya mwili, ikiwa ni pamoja na kazi ya kinga.'),
        CourseBodyImage(image: 'assets/materials/minerals.png')
      ],
    ));
