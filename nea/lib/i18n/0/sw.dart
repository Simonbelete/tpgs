import 'package:flutter/cupertino.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/food_grid_list.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';
import 'package:nea/widgets/remember.dart';

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
      // const CourseBodyImage(
      //   image: "assets/materials/images/carbohydrates.png",
      //   // description: "Vyanzo vya wanga",
      // ),
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
      // const CourseBodyImage(
      //   image: "assets/materials/images/proteins.png",
      //   description: "Vyanzo vya protini",
      // ),
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
      // const CourseBodyImage(
      //   image: "assets/materials/images/fats.png",
      //   // description: "Vyanzo vya Mafuta",
      // ),
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
      // const CourseBodyImage(
      //   image: "assets/materials/images/vitamins.png",
      //   // description: "Vyanzo vya Vitamini",
      // ),
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
      // const CourseBodyImage(
      //   image: "assets/materials/images/minerals.png",
      //   // description: "Vyanzo vya Madini",
      // ),
      const SubTitleText(
        text: "Chanzo cha Madini",
        fontSize: 14,
      ),
      FoodGridList(foods: mineralsFood),
      const Paragraph(
          title: "Mahitaji ya lishe ",
          body:
              "rejea virutubishi tofauti ambavyo mwili unahitaji kwa ajili ya nishati, ukuaji na ukarabati, na ulinzi dhidi ya magonjwa. Zinatofautiana kulingana na umri, jinsia, shughuli za kimwili, urefu, uzito, na hali ya afya ya mtu binafsi. "),

      // RDA
      const SubTitleText(
        text:
            "Posho za Lishe (RDAs) Zinazopendekezwa kwa watoto wenye virutubishi vidogo",
      ),
      const Paragraph(
          title: "",
          body:
              "Posho za Lishe Zinazopendekezwa (RDAs) za virutubishi vidogo, ikijumuisha vitamini na madini, kwa watoto zinaweza kutofautiana kulingana na umri, jinsia na hali mahususi za kiafya. RDA zimeundwa na mashirika ya afya ya serikali na zimeundwa kukidhi mahitaji ya lishe ya watu wengi. Ni muhimu kutambua kwamba mahitaji ya mtu binafsi yanaweza kutofautiana, na ni vyema kushauriana na mtaalamu wa afya kwa ushauri unaokufaa."),
      const Paragraph(
          title: "Hapa kuna RDA kwa baadhi ya virutubishi muhimu kwa watoto:",
          body: ""),
      const SubTitleText(
        text: "Vitamini",
        fontSize: 16.0,
      ),
      const SubTitleText(
        text: "Vitamini A",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: mikrogram 300 (mcg) kwa siku',
        'Miaka 4-8: 400 mcg kwa siku',
        'Miaka 9-13: 600 mcg kwa siku'
      ]),
      const SubTitleText(
        text: "Vitamini C",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: miligramu 15 (mg) kwa siku',
        'Miaka 4-8: 25 mg kwa siku',
        'Miaka 9-13: 45 mg kwa siku'
      ]),
      const SubTitleText(
        text: "Vitamini D",
        fontSize: 14,
      ),
      const Bullet(
          children: ['Miaka 1-18: Vitengo 600 vya Kimataifa (IU) kwa siku']),
      const SubTitleText(
        text: "Vitamini E",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: 6 mg kwa siku',
        'Miaka 4-8: 7 mg kwa siku',
        'Miaka 9-13: 11 mg kwa siku',
      ]),
      const SubTitleText(
        text: "Vitamini K",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: 30 mcg kwa siku',
        'Miaka 4-8: 55 mcg kwa siku',
        'Miaka 9-13: 60 mcg kwa siku',
        'Vitamini B (Thiamine, Riboflauini, Niasini, B6, B12, Folate): RDA mahususi hutofautiana kwa kila vitamini B na kundi la umri.',
      ]),

      const SubTitleText(
        text: "Madini",
        fontSize: 16.0,
      ),

      const SubTitleText(
        text: "Calcium",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: 700 mg kwa siku',
        'Miaka 4-8: 1,000 mg kwa siku',
        'Miaka 9-18: 1,300 mg kwa siku'
      ]),

      const SubTitleText(
        text: "Chuma",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: 7 mg kwa siku',
        'Miaka 4-8: 10 mg kwa siku',
        'Miaka 9-13: 8 mg kwa siku',
        'Miaka 14-18: 11 mg kwa siku'
      ]),

      const SubTitleText(
        text: "Zinki",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: 3 mg kwa siku',
        'Miaka 4-8: 5 mg kwa siku',
        'Miaka 9-13: 8 mg kwa siku',
        'Miaka 14-18: 11 mg kwa siku;'
      ]),

      const SubTitleText(
        text: "Iodini",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-8: 90 mcg kwa siku',
        'Miaka 9-13: 120 mcg kwa siku',
        'Miaka 14-18: 150 mcg kwa siku'
      ]),

      const SubTitleText(
        text: "Magnesiamu",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Miaka 1-3: 80 mg kwa siku',
        'Miaka 4-8: 130 mg kwa siku',
        'Miaka 9-13: 240 mg kwa siku',
        'Miaka 14-18: 410 mg kwa siku'
      ]),

      const SubTitleText(
        text:
            "Posho za Chakula zinazopendekezwa (RDAs) kwa ajili ya virutubisho kuu vya watoto.",
      ),

      const Paragraph(
          title: "",
          body:
              "Posho za Lishe Zinazopendekezwa (RDAs) kwa ajili ya virutubisho kuu vya watoto, ikijumuisha wanga, protini na mafuta, hutolewa kulingana na umri na jinsia. Kumbuka kwamba maadili haya ni miongozo ya jumla, na mahitaji ya mtu binafsi ya lishe yanaweza kutofautiana. Zaidi ya hayo, watoto walio na hali mahususi za afya au viwango vya juu vya shughuli wanaweza kuhitaji marekebisho ya ulaji wao wa virutubishi vingi. Inashauriwa kushauriana na mtaalamu wa afya au mtaalamu wa lishe aliyesajiliwa kwa ushauri wa kibinafsi. Hapa kuna RDA za jumla za virutubisho kwa watoto:"),
      const SubTitleText(
        text: "Wanga",
        fontSize: 14,
      ),
      const Paragraph(
          title: "", body: "Wanga ni chanzo kikuu cha nishati kwa mwili."),
      const SubTitleText(
        text: "Protini",
        fontSize: 14,
      ),
      const Paragraph(
          title: "", body: "Protini ni muhimu kwa ukuaji na maendeleo."),
      const Paragraph(
          title: "",
          body:
              "Posho ya Chakula Iliyopendekezwa (RDA) ya protini inategemea umri:"),
      const Bullet(children: [
        'Miaka 1-3: gramu 13 kwa siku',
        'Miaka 4-8: gramu 19 kwa siku',
        'Miaka 9-13: gramu 34 kwa siku',
        'Miaka 14-18: gramu 46-52 kwa siku (inatofautiana na jinsia)'
      ]),
      const SubTitleText(
        text: "Mafuta",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "Mafuta ni muhimu kwa ukuaji wa ubongo na unyonyaji wa vitamini vyenye mumunyifu."),
      const Paragraph(
          title: "",
          body:
              "Miongozo ya Chakula kwa Wamarekani inapendekeza kwamba 25-35% ya jumla ya kalori za kila siku zinatokana na mafuta."),
      const Bullet(children: [
        'Kwa watoto wa miaka 1-3, mafuta yanapaswa kutoa 30-40% ya jumla ya kalori ya kila siku.',
        'Kwa watoto wa miaka 4-18, mafuta yanapaswa kutoa kuhusu 25-35% ya jumla ya kalori ya kila siku.'
      ]),
      const SubTitleText(
        text: "Mafuta Yaliyojaa",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "Ulaji wa mafuta unapaswa kuwa chini ya 10% ya jumla ya kalori."),
      const SubTitleText(
        text: "Mafuta ya Trans",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body: "Ulaji wa mafuta ya ziada unapaswa kuwa mdogo iwezekanavyo."),
      const SubTitleText(text: "Cholesterol ya chakula", fontSize: 14),
      const Paragraph(
          title: "",
          body:
              "Hakuna RDA maalum kwa cholesterol ya chakula, lakini kuweka ulaji wa chini iwezekanavyo wakati kudumisha chakula cha afya kunapendekezwa."),
      const Remember(children: [
        "Ni muhimu kutambua kwamba mapendekezo haya ni miongozo ya jumla, na mahitaji ya mtu binafsi yanaweza kutofautiana. Mambo kama vile kiwango cha shughuli za kimwili, kasi ya ukuaji, na afya kwa ujumla inapaswa kuzingatiwa wakati wa kubainisha ulaji unaofaa wa virutubishi kwa mtoto. Tena, kushauriana na mtaalamu wa afya au mtaalamu wa lishe aliyesajiliwa kunaweza kutoa mwongozo unaokufaa zaidi kulingana na mahitaji mahususi ya lishe ya mtoto."
      ]),

      const SubTitleText(
        text:
            "Posho za Chakula zinazopendekezwa (RDAs) za virutubishi vidogo kwa watu wazima.",
      ),
      const Paragraph(
          title: "",
          body:
              "Posho za Lishe Zinazopendekezwa (RDAs) ni mapendekezo ya ulaji wa virutubishi yaliyowekwa na mamlaka ya afya ili kukidhi mahitaji ya watu wengi wenye afya bora. Virutubisho vidogo ni vitamini na madini muhimu ambayo mwili unahitaji kwa kiasi kidogo kwa kazi mbalimbali za kisaikolojia. Hizi hapa ni RDA za virutubishi vidogo vilivyochaguliwa kwa watu wazima nchini Marekani:"),
      const SubTitleText(
        text: "Vitamini",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Vitamini A: 900 micrograms (mcg) kwa wanaume, 700 mcg kwa wanawake',
        'Vitamini C: miligramu 90 (mg) kwa wanaume, 75 mg kwa wanawake',
        'Vitamini D: mikrogramu 15 (600 IU) kwa watu wazima hadi umri wa miaka 70, mikrogramu 20 (800 IU) kwa watu wazima zaidi ya miaka 70',
        'Vitamini E: miligramu 15 (22.4 IU) kwa wanaume na wanawake',
        'Vitamini K: 120 mcg kwa wanaume, 90 mcg kwa wanawake',
        'Thiamini (Vitamini B1): 1.2 mg kwa wanaume, 1.1 mg kwa wanawake',
        'Riboflauini (Vitamini B2): 1.3 mg kwa wanaume, 1.1 mg kwa wanawake',
        'Niasini (Vitamini B3): 16 mg kwa wanaume, 14 mg kwa wanawake',
        'Vitamini B6: 1.7 mg kwa wanaume, 1.5 mg kwa wanawake',
        'Folate (Vitamini B9): 400 mcg kwa wanaume na wanawake',
        'Vitamini B12: 2.4 mcg kwa wanaume na wanawake',
        'Asidi ya Pantothenic (Vitamini B5): 5 mg kwa wanaume na wanawake',
        'Biotin (Vitamini B7): 30 mcg kwa wanaume na wanawake',
      ]),
      const SubTitleText(
        text: "Madini",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Calcium: 1000 mg kwa watu wazima hadi umri wa miaka 50, 1200 mg kwa watu wazima zaidi ya 50',
        'Iron: 8 mg kwa wanaume, 18 mg kwa wanawake (wanawake waliokoma hedhi: 8 mg)',
        'Magnesiamu: 400 mg kwa wanaume, 310 mg kwa wanawake',
        'Fosforasi: 700 mg kwa wanaume na wanawake',
        'Potasiamu: 3400 mg kwa wanaume na wanawake',
        'Sodiamu: Ulaji wa Kutosha (AI) ni miligramu 1500 kwa wanaume na wanawake (sio RDA, kwani inaweza kutofautiana sana kati ya watu binafsi)',
        'Zinki: 11 mg kwa wanaume, 8 mg kwa wanawake',
      ]),
      const Remember(children: [
        'Maadili haya hutofautiana kulingana na umri, jinsia, ujauzito, na kunyonyesha. Ni lazima watu binafsi wawasiliane na wataalamu wa afya kwa ushauri wa kibinafsi, haswa ikiwa wana hali mahususi za kiafya au vizuizi vya lishe. Zaidi ya hayo, mapendekezo yanaweza kutofautiana katika nchi tofauti, kwa hivyo ni vyema kurejelea miongozo ya eneo inapopatikana.',
      ]),

      const SubTitleText(
          text:
              'Posho za Chakula Zinazopendekezwa (RDAs) za virutubisho kuu kwa watu wazima.'),
      const Paragraph(
          title: "",
          body:
              "Posho za Lishe (RDAs) zinazopendekezwa kwa ajili ya virutubishi vingi ni miongozo iliyowekwa na mamlaka za afya ili kuongoza wastani wa ulaji wa kila siku wa virutubishi muhimu vinavyohitajika ili kukidhi mahitaji ya lishe ya watu wengi wenye afya bora. Kufikia sasisho langu la mwisho la maarifa mnamo Januari 2022, zifuatazo ni RDAs za virutubishi vikuu kwa watu wazima:"),
      const SubTitleText(
        text: "Protini",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "RDA kwa watu wazima: gramu 0.8 kwa kilo ya uzani wa mwili kwa siku. Wanariadha na watu binafsi wanaohusika katika shughuli nzito za kimwili wanaweza kuhitaji ulaji wa juu wa protini."),
      const SubTitleText(
        text: "Mafuta",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "Hakuna RDA mahususi kwa ajili ya mafuta, lakini Viwango Vinavyokubalika vya Usambazaji wa Macronutrient (AMDRs) zinaonyesha kuwa mafuta yanapaswa kuwa 20-35% ya jumla ya ulaji wa kalori ya kila siku. Ndani ya safu hii, mafuta yaliyojaa inashauriwa kuwa chini ya 10% ya jumla ya kalori ya kila siku."),
      const SubTitleText(
        text: "Wanga",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "Hakuna RDA maalum kwa wanga, lakini AMDRs inapendekeza kwamba wanga huchangia 45-65% ya ulaji wa kalori ya kila siku. Mkazo unapaswa kuwa juu ya ulaji wa wanga tata (nafaka nzima, matunda, mboga) badala ya sukari rahisi."),
      const Remember(children: [
        'Mapendekezo haya yanaweza kutofautiana kulingana na umri, jinsia, kiwango cha shughuli za kimwili na afya kwa ujumla. Ni muhimu kutambua kwamba mahitaji ya mtu binafsi ya lishe yanaweza kutofautiana, na kushauriana na mtaalamu wa afya au mtaalamu wa lishe aliyesajiliwa kwa ushauri wa kibinafsi kunapendekezwa.',
        'Tafadhali kumbuka kuwa miongozo ya lishe inaweza kusasishwa baada ya muda, kwa hivyo ni vyema kuwasiliana na rasilimali za hivi punde au mamlaka ya afya ili kupata maelezo ya hivi punde.'
      ]),

      const SubTitleText(
          text:
              "Posho ya Chakula Iliyopendekezwa (RDA) kwa virutubishi vidogo wakati wa ujauzito."),
      const Paragraph(
          title: "",
          body:
              "Posho ya Lishe Iliyopendekezwa (RDA) ya virutubishi vidogo wakati wa ujauzito ni muhimu ili kuhakikisha afya ya mama na mtoto anayekua. Ni muhimu kutambua kwamba mahitaji ya mtu binafsi ya virutubisho yanaweza kutofautiana, na wanawake wajawazito wanapaswa kushauriana na wataalamu wa afya kwa ushauri wa kibinafsi. RDA zinazotolewa hapa ni miongozo ya jumla kwa wanawake wajawazito wenye afya nzuri:"),
      const SubTitleText(
        text: "Folate (Folic Acid)",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "Mikrogramu 600 (mcg) kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Folate ni muhimu kwa ukuaji wa mapema wa mirija ya neva, ambayo huunda ubongo na uti wa mgongo wa mtoto."),
      const SubTitleText(
        text: "Chuma",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "miligramu 27 (mg) kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Iron inahitajika ili kuongeza uzalishaji wa damu wakati wa ujauzito na kuzuia anemia ya upungufu wa chuma."),
      const SubTitleText(text: "Calcium"),
      const Paragraph(
          title: "",
          body: "1,000 mg kwa siku (kwa wanawake wenye umri wa miaka 19-50)"),
      const Paragraph(
          title: "",
          body: "Calcium ni muhimu kwa ukuaji wa mifupa na meno ya mtoto."),
      const SubTitleText(
        text: "Vitamin D",
        fontSize: 14,
      ),
      const Paragraph(
          title: "", body: "vitengo 600 vya kimataifa (IU) kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Vitamini D husaidia mwili kunyonya kalsiamu na ni muhimu kwa afya ya mifupa."),
      const SubTitleText(
        text: "Iodini",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "220 mcg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Iodini ni muhimu ili kukuza ubongo na mfumo wa neva wa mtoto."),
      const SubTitleText(
        text: "Vitamini A",
        fontSize: 14,
      ),
      const Paragraph(
          title: "", body: "770 mcg RAE (Retinol Shughuli Sawa) kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Vitamini A ni muhimu kwa maono, kazi ya kinga, na afya ya ngozi. Walakini, ulaji mwingi wa vitamini A, haswa katika mfumo wa retinol, unaweza kudhuru fetus, kwa hivyo ni muhimu kutozidi viwango vilivyopendekezwa."),
      const SubTitleText(
        text: "Vitamini C",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "85 mg kwa siku"),
      const Paragraph(
          title: "",
          body: "Vitamini C ni muhimu kwa ukuaji na ukarabati wa tishu."),
      const SubTitleText(
        text: "Vitamini E",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "15 mg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Vitamini E ina mali ya antioxidant na ni muhimu kwa ukuaji wa mtoto."),
      const SubTitleText(
        text: "Thiamine (Vitamini B1)",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "1.4 mg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Thiamine ni muhimu kwa ukuaji wa ubongo wa mtoto na ukuaji wa jumla."),
      const SubTitleText(
        text: "Riboflauini (Vitamini B2)",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "1.4 mg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Riboflauini ni muhimu kwa kukuza mifupa, misuli na neva za mtoto."),
      const SubTitleText(
        text: "Niacin (Vitamin B3):",
        fontSize: 14,
      ),
      const Paragraph(title: "", body: "18 mg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Niasini ni muhimu kwa ukuaji wa mtoto na husaidia kubadilisha chakula kuwa nishati."),
      const SubTitleText(
        text: "Vitamini B6:",
        fontSize: 14,
      ),
      const Paragraph(
          title: "1.9 mg kwa siku",
          body:
              "Vitamini B6 ni muhimu kwa ukuaji wa ubongo wa mtoto na husaidia mwili kubadilisha chakula kuwa nishati."),
      const SubTitleText(text: "Vitamini B12"),
      const Paragraph(title: "", body: "2.6 mcg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Vitamini B12 ni muhimu kwa maendeleo ya mfumo wa neva wa mtoto."),
      const SubTitleText(text: "Zinki"),
      const Paragraph(title: "", body: "11 mg kwa siku"),
      const Paragraph(
          title: "",
          body:
              "Zinki ni muhimu kwa ukuaji wa mtoto na utendaji wa mfumo wa kinga."),
      const Remember(children: [
        'Wanawake wajawazito wanapaswa kupata virutubishi hivi kupitia lishe bora na, ikiwa ni lazima, virutubisho kama mtoa huduma wao wa afya anapendekeza. Ni muhimu kuepuka ulaji mwingi wa vitamini na madini fulani, kwa kuwa hii inaweza kuwadhuru mama na mtoto. Daima wasiliana na mtaalamu wa afya kwa ushauri wa kibinafsi kulingana na mahitaji ya mtu binafsi ya afya.'
      ]),

      const SubTitleText(
          text:
              "Pendekezo la Posho ya Chakula (RDA) kwa virutubisho vingi wakati wa ujauzito."),
      const Paragraph(
          title: "",
          body:
              "Posho ya Lishe Inayopendekezwa (RDA) ya virutubishi vingi wakati wa ujauzito hutofautiana kulingana na mambo ya mtu binafsi kama vile umri, uzito, kiwango cha shughuli na afya kwa ujumla. Hata hivyo, kuna miongozo ya jumla iliyotolewa na mamlaka za afya ambayo wajawazito wanaweza kufuata ili kuhakikisha wanakidhi mahitaji yao ya lishe. Kumbuka kwamba kushauriana na mtaalamu wa afya kwa ushauri wa kibinafsi ni muhimu."),
      const SubTitleText(
        text: "Protini",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body: "RDA ya protini wakati wa ujauzito ni gramu 71 kwa siku."),
      const Paragraph(
          title: "",
          body:
              "Vyanzo vyema vya protini ni pamoja na nyama konda, kuku, samaki, mayai, bidhaa za maziwa, kunde, karanga, na mbegu."),
      const SubTitleText(
        text: "Wanga",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "Hakuna RDA maalum kwa ajili ya wanga wakati wa ujauzito, lakini wanapaswa kufanya juu ya 45-65% ya ulaji wa kalori ya kila siku."),
      const Paragraph(
          title: "",
          body:
              "Chagua kabohaidreti changamano kama vile nafaka zisizokobolewa, matunda, mboga mboga, na kunde ili kupata nishati endelevu."),
      const SubTitleText(
        text: "Mafuta",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "RDA ya mafuta wakati wa ujauzito ni karibu 20-35% ya jumla ya ulaji wa kalori ya kila siku."),
      const Paragraph(
          title: "",
          body:
              "Zingatia mafuta yenye afya, ikijumuisha vyanzo kama vile parachichi, karanga, mbegu, mafuta ya zeituni na samaki wenye mafuta mengi kama lax."),
      const Remember(children: [
        'Ni muhimu kutambua kwamba lishe ya kabla ya kuzaa sio tu kuhusu macronutrients. Virutubisho vidogo, kama vile asidi ya foliki, chuma, kalsiamu, vitamini D, na vingine, pia ni muhimu wakati wa ujauzito. Vitamini vya ujauzito mara nyingi hupendekezwa ili kusaidia kuhakikisha kwamba wajawazito wanapata vitamini na madini muhimu.',
        'Zaidi ya hayo, kukaa vizuri-hydrated ni muhimu wakati wa ujauzito. Kunywa maji ya kutosha husaidia kusaidia kuongezeka kwa kiasi cha damu na maji ya amniotic, kati ya kazi nyingine.',
        'Daima wasiliana na mtoa huduma wako wa afya kwa ushauri wa kibinafsi na ushughulikie wasiwasi wowote maalum wa lishe au hali ambazo unaweza kuwa nazo wakati wa ujauzito. Wanaweza kutoa mwongozo kulingana na hali yako ya afya na mahitaji.'
      ]),

      const SubTitleText(
          text:
              'Posho ya Chakula Iliyopendekezwa (RDA) kwa virutubishi vidogo wakati wa kunyonyesha.'),
      const Paragraph(
          title: '',
          body:
              'Posho ya Lishe Inayopendekezwa (RDA) ya virutubishi vidogo wakati wa kunyonyesha inaweza kutofautiana kulingana na umri, uzito na hali ya afya ya mtu binafsi. Walakini, hapa kuna mapendekezo ya jumla ya virutubishi muhimu wakati wa kunyonyesha:'),
      const Paragraph(
          title: "Vitamini A:",
          body:
              " RDA: mikrogramu 1,300 (mcg) kila siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Vitamin C:",
          body:
              " RDA: miligramu 120 (mg) kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Vitamini D:",
          body:
              " RDA: mikrogram 15 (mcg) kila siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Vitamini E:",
          body: "RDA: 19 mg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Vitamini K:",
          body: " RDA: 90 mcg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Thiamine (Vitamini B1):",
          body: " RDA: 1.4 mg kila siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Riboflauini (Vitamini B2):",
          body: " RDA: 1.6 mg kila siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Niasini (Vitamini B3):",
          body: " RDA: 17 mg kila siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Vitamini B6:",
          body: " RDA: 2 mg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Folate (Vitamini B9):",
          body: " RDA: 500 mcg kila siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Vitamini B12:",
          body: " RDA: 2.8 mcg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Calcium:",
          body: " RDA: 1,000 mg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Chuma:",
          body: " RDA: 9 mg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Zinki:",
          body: " RDA: miligramu 12 kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Shaba:",
          body: " RDA: 1,300 mcg kwa siku kwa wanawake wanaonyonyesha."),
      const Paragraph(
          title: "Iodini:",
          body: " RDA: 290 mcg kwa siku kwa wanawake wanaonyonyesha."),
      const Remember(children: [
        'Wanawake wanaonyonyesha wanahitaji kudumisha lishe bora na yenye lishe ili kukidhi mahitaji yao ya virutubisho katika kipindi hiki. Hata hivyo, mahitaji ya mtu binafsi yanaweza kutofautiana, na inashauriwa kila mara kushauriana na mhudumu wa afya au mtaalamu wa lishe aliyesajiliwa ili kurekebisha mapendekezo ya lishe kulingana na mahitaji na hali mahususi.'
      ]),

      const SubTitleText(
          text:
              'Posho ya Chakula Iliyopendekezwa (RDA) kwa virutubisho vingi wakati wa kunyonyesha.'),
      const Paragraph(
          title: "",
          body:
              "Posho ya Lishe Inayopendekezwa (RDA) ya virutubisho vikubwa wakati wa kunyonyesha inaweza kutofautiana kulingana na umri wa mama, uzito, kiwango cha shughuli na kiasi cha maziwa ya mama kinachozalishwa. Walakini, hapa kuna mapendekezo ya jumla ya ulaji wa macronutrient wakati wa kunyonyesha:"),
      const Paragraph(
          title: "Protini:",
          body:
              " RDA ya protini wakati wa kunyonyesha ni kubwa kuliko wakati wa ujauzito au wakati si mjamzito. Kwa wastani, wanawake wanaonyonyesha wanashauriwa kutumia takriban gramu 71 za protini kila siku. Vyanzo vyema vya protini ni pamoja na nyama konda, kuku, samaki, bidhaa za maziwa, mayai, kunde, na karanga."),
      const Paragraph(
          title: "Wanga:",
          body:
              " Mahitaji ya wanga wakati wa kunyonyesha ni sawa na yale wakati wa ujauzito. RDA ya wanga ni karibu 210 hadi 175 gramu kwa siku, kulingana na mambo ya mtu binafsi. Nafaka nzima, matunda, mboga mboga, na kunde ni vyanzo bora vya wanga."),
      const Paragraph(
          title: "Mafuta:",
          body:
              " RDA ya mafuta wakati wa kunyonyesha ni takriban gramu 44 hadi 55 kwa siku. Ni muhimu kuzingatia mafuta yenye afya, kama vile yale yanayopatikana kwenye parachichi, karanga, mbegu, mafuta ya zeituni na samaki wenye mafuta mengi. Asidi ya mafuta ya Omega-3, haswa DHA (docosahexaenoic acid), ni muhimu kwa kukuza mfumo wa neva wa mtoto na hupatikana katika samaki wenye mafuta, mbegu za kitani na walnuts."),
      const Paragraph(
          title: "Kalori:",
          body:
              " Wanawake wanaonyonyesha kwa kawaida huhitaji kalori za ziada ili kusaidia uzalishaji wa maziwa. Kwa wastani, kalori 500 za ziada kwa siku zinaweza kupendekezwa, ingawa mahitaji ya mtu binafsi yanaweza kutofautiana. Ni muhimu kuzingatia dalili za njaa na utimilifu na kurekebisha ulaji wa kalori ipasavyo."),
      const Remember(children: [
        'Wanawake wanaonyonyesha lazima wakae na maji mengi, hivyo kunywa maji mengi pia ni muhimu. Zaidi ya hayo, inapendekezwa kuwa wanawake wanaonyonyesha waendelee kutumia vitamini kabla ya kuzaa, hasa zile zenye chuma na asidi ya foliki.',
        'Akina mama wanaonyonyesha lazima washauriane na watoa huduma zao za afya au mtaalamu wa lishe aliyesajiliwa ili kubaini mahitaji yao ya lishe kulingana na mambo binafsi. Mahitaji ya virutubisho yanaweza kutofautiana, na ushauri wa kibinafsi unaweza kuhakikisha kwamba mama na mtoto wanapata lishe ya kutosha katika kipindi hiki muhimu.'
      ]),
    ],
  ),
);
