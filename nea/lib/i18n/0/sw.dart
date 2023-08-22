import 'package:flutter/cupertino.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/food_grid_list.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  title: "UTANGULIZI",
  coverImage: "assets/materials/images/nu.jpg",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Paragraph(
          title: "Chakula ",
          body:
              "ni dutu inayojumuisha kimsingi protini, kabohaidreti, mafuta, na virutubisho vingine vinavyotumika katika mwili wa kiumbe ili kuendeleza ukuaji na michakato muhimu na kutoa nishati. Unyonyaji wa mwili na utumiaji wa chakula ni msingi wa lishe na hurahisishwa na usagaji chakula. "),
      const Paragraph(
          title: "Lishe ",
          body:
              "ni ulaji wa chakula na mwingiliano wa michakato ya kibayolojia, kijamii na kiuchumi ambayo huathiri ukuaji, utendaji na ukarabati wa mwili. "),
      const Paragraph(
          title: "Virutubisho ",
          body:
              "ni sehemu za vyakula ambavyo kiumbe hutumia kuishi na kukua. Kuna aina mbili za virutubisho: macronutrients na micronutrients. Macronutrients hutoa nishati nyingi ambayo mfumo wa kimetaboliki wa kiumbe unahitaji kufanya kazi, wakati virutubisho vidogo hutoa cofactors muhimu kwa kimetaboliki kutekelezwa. Aina zote mbili za virutubishi zinaweza kupatikana kutoka kwa lishe. Macronutrients ni pamoja na wanga, protini, mafuta, na maji, ambapo Micronutrients ni pamoja na vitamini na Macronutrients. "),
      const SubTitleText(
        text: "Macronutrients",
      ),
      const SubTitleText(
        text: "Wanga",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Wanga ",
          body:
              "kuupa mwili nishati ya kuweka hai, kujenga na kutengeneza tishu, kuwa na joto, na kusonga na kufanya kazi. Wanga ni chanzo kikubwa zaidi na cha kiuchumi cha nishati ya chakula katika mlo wa binadamu. "),
      const Paragraph(
          title: "",
          body:
              "Je, ni vyanzo gani vikuu vya vyakula vya wanga ambavyo mlo unajumuisha?"),
      const CourseBodyImage(
        image: "assets/materials/images/carbohydrates.png",
        // description: "Vyanzo vya wanga",
      ),
      const SubTitleText(
        text: "Chanzo cha Wanga",
        fontSize: 14,
      ),
      FoodGridList(foods: carbohydratesFood),
      const SubTitleText(
        text: "Protini",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Protini ",
          body:
              "kuupa mwili asidi muhimu ya amino ambayo ina kazi mbalimbali: ukuaji na maendeleo, ukarabati au uingizwaji wa tishu, uzalishaji wa vimeng'enya vya kimetaboliki na usagaji chakula, na utengenezaji wa baadhi ya homoni. "),
      const Paragraph(
          title: "",
          body:
              "Ni vyanzo gani vikuu vya chakula vya protini ambavyo lishe inajumuisha?"),
      const CourseBodyImage(
        image: "assets/materials/images/proteins.png",
        description: "Vyanzo vya protini",
      ),
      // Fats
      const SubTitleText(
        text: "Mafuta",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Mafuta ",
          body:
              "kuupa mwili asidi muhimu ya mafuta muhimu kujenga utando wa seli na kutengeneza homoni. Pia husaidia mwili kunyonya na kusafirisha vitamini muhimu. Mafuta pia huupa mwili chanzo cha nishati. Mafuta ni muhimu kwa ukuaji, uzazi, uadilifu wa ngozi, kudumisha seli, na kutumia mafuta ya mwili kwa nishati. "),
      const Paragraph(
          title: "",
          body:
              "Je, ni vyanzo gani vikuu vya vyakula vya mafuta ambavyo mlo unajumuisha?"),
      const CourseBodyImage(
        image: "assets/materials/images/fats.png",
        // description: "Vyanzo vya Mafuta",
      ),
      const SubTitleText(
        text: "Chanzo cha Mafuta",
        fontSize: 14,
      ),
      FoodGridList(foods: fatsFood),
      const SubTitleText(
        text: "Maji",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Maji ",
          body:
              "ni muhimu kwa maisha, na kupata kiasi kinachofaa cha maji ili kuwa na afya ni muhimu sana. Mwili unahitaji maji safi ya kutosha kila siku."),
      const SubTitleText(
        text: "Virutubisho vidogo",
      ),
      // Vitamins
      const SubTitleText(
        text: "Vitamini",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Vitamini ",
          body:
              "kucheza majukumu tofauti katika kusaidia mwili kwa njia muhimu. Baadhi ya mifano ni pamoja na kujenga protini na seli, kulinda seli kutokana na uharibifu, kujenga mifupa, kulinda maono, kumetaboli madini kuu, na kusaidia kuponya majeraha. Bila vitamini muhimu, magonjwa mengi ya lishe yanaweza kusababisha."),
      const CourseBodyImage(
        image: "assets/materials/images/vitamins.png",
        // description: "Vyanzo vya Vitamini",
      ),
      const SubTitleText(
        text: "Chanzo cha Vitamini",
        fontSize: 14,
      ),
      FoodGridList(foods: vitaminsFood),
      // Minerals
      const SubTitleText(
        text: "Madini",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Minerals ",
          body:
              "ni vikundi vilivyo thabiti, isokaboni vya misombo kama vile vijenzi muhimu vya aina tofauti za seli. Madini muhimu ni pamoja na chuma, zinki, kalsiamu na iodini. Kwa mfano, chuma ni sehemu ya chembe nyekundu za damu, ambazo husafirisha oksijeni kupitia mwili. Zinki ina kazi nyingi muhimu katika mwili, ikiwa ni pamoja na uundaji wa seli na mifumo ya mwili, ikiwa ni pamoja na kazi ya kinga."),
      const CourseBodyImage(
        image: "assets/materials/images/minerals.png",
        // description: "Vyanzo vya Madini",
      ),
      const SubTitleText(
        text: "Chanzo cha Madini",
        fontSize: 14,
      ),
      FoodGridList(foods: mineralsFood),
      const Paragraph(
          title: "Mahitaji ya lishe ",
          body:
              "rejea virutubishi tofauti ambavyo mwili unahitaji kwa ajili ya nishati, ukuaji na ukarabati, na ulinzi dhidi ya magonjwa. Zinatofautiana kulingana na umri, jinsia, shughuli za kimwili, urefu, uzito, na hali ya afya ya mtu binafsi. ")
    ],
  ),
);
