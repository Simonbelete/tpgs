import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/color_table.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  title: "LISHE YA FAMILIA",
  coverImage: "assets/materials/images/family_nutration.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: "MALENGO", children: [
        'Boresha uelewa juu ya vikundi vya chakula kwa mseto wa lishe'
      ]),
      CourseBodyImage(
        image: 'assets/materials/images/10.png',
        description: "Vikundi sita vya chakula",
      ),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        Bullet(children: [
          "Kuwa na lishe bora na yenye uwiano kunamaanisha kula vyakula mbalimbali vinavyotoa virutubisho ambavyo ni muhimu kwa mwili. Haimaanishi kula chakula cha gharama kubwa. Chakula tunachokula kimegawanywa katika vikundi 5"
        ])
      ]),
      // Food Groups
      SubTitleText(
        text: 'Vikundi vya chakula ni nini?',
        fontSize: 27.0,
      ),
      Paragraph(
          title: "",
          body:
              "Hakuna chakula au kikundi cha chakula kilicho na virutubishi vyote ambavyo mwili wa binadamu unahitaji kwa utendaji bora na afya njema. Mwili wa mwanadamu unahitaji virutubisho vinavyotokana na vyakula mbalimbali. Ili kufikia utofauti mzuri wa lishe, kula aina mbalimbali za vyakula mara kwa mara na kutumia vyakula kutoka kwa makundi yote ya vyakula ni muhimu."),
      SubTitleText(
        text: 'Vyakula vikuu',
      ),
      Paragraph(
          title: "",
          body:
              "Chakula katika kundi hili kinajumuisha sehemu kubwa zaidi ya chakula. Nafaka za nafaka kama vile teff, mtama, mtama, mahindi, shayiri, shayiri, ngano, teff, mchele, na mizizi ya wanga (mihogo, viazi, viazi vitamu). Matunda ni chanzo kizuri cha nishati."),
      SubTitleText(
        text: "Kunde na Karanga",
      ),
      Paragraph(
          title: "",
          body:
              "Kundi hili ni pamoja na karanga, maharagwe, mbaazi na dengu. Kundi hili la chakula ni chanzo kizuri cha protini pamoja na nishati."),
      SubTitleText(
        text: "Vyakula vya Wanyama",
      ),
      Paragraph(
          title: "",
          body:
              "Vyakula kutoka kwa wanyama, ikiwa ni pamoja na nyama, mayai, maziwa, na samaki, ni vyanzo vyema vya protini, mafuta, na micronutrients muhimu (vitamini na madini). Virutubisho hivi ni muhimu kwa ukuaji na ukuaji wa mtoto katika miaka miwili ya kwanza ya maisha."),
      SubTitleText(
        text: "Mboga",
      ),
      Paragraph(
          title: "",
          body:
              "Chakula cha kikundi hiki kinajumuisha mboga za kijani na njano, ikiwa ni pamoja na kale, mchicha, celery, tango, pilipili, brokoli, karoti, cauliflower, malenge, vitunguu na nyanya. Mboga hutoa micronutrients muhimu (vitamini na madini)."),
      SubTitleText(
        text: "Matunda",
      ),
      Paragraph(
          title: "",
          body:
              "Chakula cha kundi hili ni pamoja na ndizi, machungwa, ndimu, papai, parachichi, peach, mapera, tikiti maji, tikitimaji tamu, na vingine vingi. Wao hasa hutoa nishati na micronutrients muhimu (vitamini na madini)."),
      SubTitleText(
        text: "Mafuta",
      ),
      Paragraph(
          title: "",
          body:
              "Mafuta ni pamoja na mafuta ya kupikia, mbegu za mafuta, parachichi na mbegu za mafuta. Baadhi ya vyakula, kama vile bidhaa za wanyama (nyama, maziwa, na bidhaa za maziwa kama siagi na mtindi), pia hutoa mafuta."),
      Remember(title: "KUMBUKA", children: [
        'Hakuna chakula kinachotoa virutubisho vyote.',
        'Kula aina mbalimbali za vyakula vyenye virutubishi vingi.'
      ]),
      //
      // Dietary diversiﬁcation
      //
      SubTitleText(
        text: 'Utofauti wa vyakula',
        fontSize: 27.0,
      ),
      Objectives(
          title: "MALENGO",
          children: ['Boresha uelewa juu ya faida za mseto wa lishe']),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        Bullet(children: [
          'Kuwa na lishe bora na yenye uwiano kunamaanisha kula vyakula mbalimbali vinavyotoa virutubisho ambavyo ni muhimu kwa mwili. Haimaanishi kula chakula cha gharama kubwa.',
          'Virutubisho ambavyo mwili wa mtu unahitaji kufanya kazi, kukua na kuwa na afya nzuri vinaweza kupatikana katika vyakula vingi vinavyopatikana ndani ya nchi.',
          'Chagua vyakula kutoka kwa kila kundi la vyakula kila siku vinavyopatikana ndani ya nchi: Vyakula vikuu (nafaka/nafaka, mizizi na mizizi); mboga na matunda (aina tofauti - majani, matunda na mizizi - na rangi - kijani, nyekundu, njano / machungwa); nyama/bidhaa za wanyama na kunde/njugu (protini); mafuta nk.',
          'Tumia njia rahisi na makini za kupika ili kuhakikisha virutubisho vya juu zaidi hupatikana kutoka kwa vyakula.',
          'Kwa mfano, njia bora ya kupika mboga mboga ni kwa kuzichoma kwa maji kidogo badala ya kuzichemsha. Majani ya mboga kama vile mchicha yanaweza kuchomwa kwa muda wa dakika tano katika ungo juu ya maji yanayochemka kwa kasi.'
        ])
      ]),
      CourseBodyImage(image: "assets/materials/images/11.png"),

      Remember(title: "KUMBUKA", children: [
        'Kuwa na lishe yenye afya haimaanishi kula chakula cha bei ghali. Tumia vyakula vinavyopatikana ndani ya nchi'
      ]),

      //
      // Essential food based micronutrients: vitamins
      //
      SubTitleText(
        text: 'Chakula muhimu cha micronutrients: vitamini',
        fontSize: 27.0,
      ),
      Objectives(title: "MALENGO", children: [
        'Boresha uelewa juu ya vyanzo na faida za virutubishi vidogo'
      ]),
      CourseBodyImage(image: "assets/materials/images/12.png"),
      SubTitleText(
        text: "Vitamini A",
      ),
      SubTitleText(text: "Vitamini A - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Utendaji wa kawaida wa mfumo wa kuona",
        "Ukuaji na maendeleo",
        "kazi ya kinga na uzazi",
        "Inahakikisha ukuaji sahihi wa mifupa."
      ]),
      SubTitleText(text: "Vitamini A - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Ini, mayai, mafuta ya samaki, embe la maziwa yote, papai, viazi vitamu vya rangi ya chungwa, malenge, karoti, mafuta nyekundu ya mawese, mboga za majani zenye rangi ya kijani kibichi."),
      SubTitleText(text: "Vitamini A - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        'Upofu mbaya wa kukabiliana na giza usiku',
        'kushindwa kwa ukuaji - kudumaa',
        'kupungua kwa upinzani kwa maambukizi'
      ]),
      SubTitleText(
        text: "Vitamini Mumunyifu katika Maji Vitamini B1 (Thiamine)",
      ),
      SubTitleText(text: "Vitamini B1 - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Muhimu kwa kimetaboliki ya nishati",
        "Sababu muhimu katika kazi ya mfumo wa neva",
        "Inasaidia hamu ya kula"
      ]),
      SubTitleText(text: "Vitamini B1 - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Nafaka nzima, maharage, nyama, samaki, kuku, yai, maziwa, mafuta, mbegu, kunde"),
      SubTitleText(text: "Vitamini B1 - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        "Beriberi",
        "udhaifu wa misuli",
        "anorexia",
        "Uhifadhi wa maji mwilini-edema",
        "moyo uliopanuka",
        "mkanganyiko"
      ]),
      SubTitleText(
        text: "Vitamini B2 (Ribofi avin)",
      ),
      SubTitleText(text: "Vitamini B2 - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Muhimu kwa kimetaboliki ya nishati",
        "Inasaidia maono ya kawaida, afya na ngozi nzuri"
      ]),
      SubTitleText(text: "Vitamini B2 - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Maziwa, Yai, maini, mtindi, nyama, mboga za majani ya kijani kibichi, nafaka nzima, samaki, maharagwe."),
      SubTitleText(text: "Vitamini B2 - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        "Kuvimba kwa ulimi",
        "tumbo kuvimba",
        "edema - uhifadhi wa maji mwilini"
      ]),
      SubTitleText(
        text: "Asidi ya Folic",
      ),
      SubTitleText(text: "Asidi ya Folic - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Inahitajika kwa ajili ya kujenga seli mpya, hasa seli nyekundu za damu na seli za utumbo"
      ]),
      SubTitleText(text: "Asidi ya Folic - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Ini, nyama nyekundu, mboga za majani, samaki, kunde, karanga, nafaka zisizokobolewa, viini vya mayai, parachichi."),
      SubTitleText(text: "Asidi ya Folic - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        "Upungufu wa damu",
        "Kasoro za bomba la Neural kwa watoto wachanga."
      ]),
      SubTitleText(
        text: "Vitamini C (asidi ascorbic)",
      ),
      SubTitleText(text: "Vitamini C - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Inachangia malezi ya ulinzi dhidi ya maambukizo",
        "Husaidia na uponyaji wa majeraha",
        "Husaidia mwili kutumia kalsiamu na virutubisho vingine kujenga mifupa na kuta za mishipa ya damu",
        "Muhimu kwa kimetaboliki ya protini"
      ]),
      SubTitleText(text: "Vitamini C - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Chungwa, ndimu, tangerine, maembe, mapera, nyanya, mchicha, mbaazi mbichi, kabichi, majani mabichi, nyanya, pilipili, viazi, viazi vikuu, maziwa fresh"),
      SubTitleText(text: "Vitamini C - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        "Scurvy",
        "hamu mbaya",
        "uchovu",
        "uponyaji wa jeraha uliochelewa",
        "ufizi unaotoka damu"
      ]),
      //
      // Essential food based micronutrients: minerals
      //
      SubTitleText(
        text: 'Virutubisho muhimu vya msingi wa chakula: madini',
        fontSize: 27.0,
      ),
      SubTitleText(
        text: "Chuma",
      ),
      SubTitleText(text: "Iron - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Husafirisha oksijeni kwa damu.",
        "Huondoa seli nyekundu za damu za zamani na",
        "hutengeneza seli mpya"
      ]),
      SubTitleText(text: "Iron - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Nyama nyekundu, Ini, Kuku, Samaki, Mayai, Karanga, Mboga za majani, Dengu, Maharage, Kunde, Soya, Nafaka Matunda yaliyokaushwa"),
      SubTitleText(text: "Iron - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        "Upungufu wa damu",
        "Maduka ya Chuma cha Chini",
        "Uchovu uliokithiri"
      ]),
      SubTitleText(
        text: "Iodini",
      ),
      SubTitleText(text: "Iodini - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Inahakikisha maendeleo na utendaji mzuri wa ubongo na mfumo wa neva.",
        "Muhimu kwa ukuaji na kimetaboliki",
        "Kuharakisha mwako wa virutubisho vinavyotoa nishati."
      ]),
      SubTitleText(text: "Iodini - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Samaki na dagaa wengine, bidhaa za wanyama, mimea kutoka kwa udongo matajiri katika iodini, chumvi ya Iodized"),
      SubTitleText(text: "Iodini - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: ["Goiter"]),
      SubTitleText(
        text: "Zinki",
      ),
      SubTitleText(text: "Zinc - Kazi", fontSize: 16.0),
      Bullet(children: [
        "Ukuaji wa tishu, matengenezo",
        "uponyaji na maendeleo.",
        "Kimetaboliki ya wanga",
        "protini na mafuta",
        "Muhimu katika mgawanyiko wa seli.",
        "Kazi ya mfumo wa kinga.",
        "Harufu na ladha acuity.",
        "Uponyaji wa jeraha.",
        "Husaidia katika udhibiti wa kuhara"
      ]),
      SubTitleText(text: "Zinc - Vyanzo vya chakula", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Viungo na nyama ya mamalia, ndege, samaki, kuku, nafaka nzima, maziwa, mtindi, mboga, mahindi, mapera, mbegu za malenge, samaki wa ganda, mayai, bidhaa za maziwa, karanga na mbegu, nafaka, kunde."),
      SubTitleText(text: "Zinc - Ugonjwa wa lishe", fontSize: 16.0),
      Bullet(children: [
        "Kupunguza upinzani dhidi ya maambukizi",
        "vidonda vya ngozi",
        "Ukuaji uliodumaa"
      ]),
    ],
  ),
);
