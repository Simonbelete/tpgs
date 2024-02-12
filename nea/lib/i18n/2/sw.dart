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
        image: 'assets/materials/images/10_sw.png',
        description: "Vikundi sita vya chakula",
      ),
      Paragraph(
          title: "",
          body:
              "Miongoni mwa aina za makundi ya chakula yaliyoorodheshwa kwenye picha hapo juu, kuna makundi mawili ya chakula katika orodha ya bidhaa za nyama na nyama."),
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
      // RDA
      SubTitleText(
        text:
            "Posho za Lishe (RDAs) Zinazopendekezwa kwa watoto wenye virutubishi vidogo",
      ),
      Paragraph(
          title: "",
          body:
              "Posho za Lishe Zinazopendekezwa (RDAs) za virutubishi vidogo, ikijumuisha vitamini na madini, kwa watoto zinaweza kutofautiana kulingana na umri, jinsia na hali mahususi za kiafya. RDA zimeundwa na mashirika ya afya ya serikali na zimeundwa kukidhi mahitaji ya lishe ya watu wengi. Ni muhimu kutambua kwamba mahitaji ya mtu binafsi yanaweza kutofautiana, na ni vyema kushauriana na mtaalamu wa afya kwa ushauri unaokufaa."),
      Paragraph(
          title: "Hapa kuna RDA kwa baadhi ya virutubishi muhimu kwa watoto:",
          body: ""),
      SubTitleText(
        text: "Vitamini",
        fontSize: 16.0,
      ),
      SubTitleText(
        text: "Vitamini A",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: mikrogram 300 (mcg) kwa siku',
        'Miaka 4-8: 400 mcg kwa siku',
        'Miaka 9-13: 600 mcg kwa siku'
      ]),
      SubTitleText(
        text: "Vitamini C",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: miligramu 15 (mg) kwa siku',
        'Miaka 4-8: 25 mg kwa siku',
        'Miaka 9-13: 45 mg kwa siku'
      ]),
      SubTitleText(
        text: "Vitamini D",
        fontSize: 14,
      ),
      Bullet(children: ['Miaka 1-18: Vitengo 600 vya Kimataifa (IU) kwa siku']),
      SubTitleText(
        text: "Vitamini E",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: 6 mg kwa siku',
        'Miaka 4-8: 7 mg kwa siku',
        'Miaka 9-13: 11 mg kwa siku',
      ]),
      SubTitleText(
        text: "Vitamini K",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: 30 mcg kwa siku',
        'Miaka 4-8: 55 mcg kwa siku',
        'Miaka 9-13: 60 mcg kwa siku',
        'Vitamini B (Thiamine, Riboflauini, Niasini, B6, B12, Folate): RDA mahususi hutofautiana kwa kila vitamini B na kundi la umri.',
      ]),

      SubTitleText(
        text: "Madini",
        fontSize: 16.0,
      ),

      SubTitleText(
        text: "Calcium",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: 700 mg kwa siku',
        'Miaka 4-8: 1,000 mg kwa siku',
        'Miaka 9-18: 1,300 mg kwa siku'
      ]),

      SubTitleText(
        text: "Chuma",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: 7 mg kwa siku',
        'Miaka 4-8: 10 mg kwa siku',
        'Miaka 9-13: 8 mg kwa siku',
        'Miaka 14-18: 11 mg kwa siku'
      ]),

      SubTitleText(
        text: "Zinki",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: 3 mg kwa siku',
        'Miaka 4-8: 5 mg kwa siku',
        'Miaka 9-13: 8 mg kwa siku',
        'Miaka 14-18: 11 mg kwa siku;'
      ]),

      SubTitleText(
        text: "Iodini",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-8: 90 mcg kwa siku',
        'Miaka 9-13: 120 mcg kwa siku',
        'Miaka 14-18: 150 mcg kwa siku'
      ]),

      SubTitleText(
        text: "Magnesiamu",
        fontSize: 14,
      ),
      Bullet(children: [
        'Miaka 1-3: 80 mg kwa siku',
        'Miaka 4-8: 130 mg kwa siku',
        'Miaka 9-13: 240 mg kwa siku',
        'Miaka 14-18: 410 mg kwa siku'
      ]),

      SubTitleText(
        text:
            "Posho za Chakula zinazopendekezwa (RDAs) kwa ajili ya virutubisho kuu vya watoto.",
      ),

      Paragraph(
          title: "",
          body:
              "Posho za Lishe Zinazopendekezwa (RDAs) kwa ajili ya virutubisho kuu vya watoto, ikijumuisha wanga, protini na mafuta, hutolewa kulingana na umri na jinsia. Kumbuka kwamba maadili haya ni miongozo ya jumla, na mahitaji ya mtu binafsi ya lishe yanaweza kutofautiana. Zaidi ya hayo, watoto walio na hali mahususi za afya au viwango vya juu vya shughuli wanaweza kuhitaji marekebisho ya ulaji wao wa virutubishi vingi. Inashauriwa kushauriana na mtaalamu wa afya au mtaalamu wa lishe aliyesajiliwa kwa ushauri wa kibinafsi. Hapa kuna RDA za jumla za virutubisho kwa watoto:"),
      SubTitleText(
        text: "Wanga",
        fontSize: 14,
      ),
      Paragraph(
          title: "", body: "Wanga ni chanzo kikuu cha nishati kwa mwili."),
      SubTitleText(
        text: "Protini",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "Protini ni muhimu kwa ukuaji na maendeleo."),
      Paragraph(
          title: "",
          body:
              "Posho ya Chakula Iliyopendekezwa (RDA) ya protini inategemea umri:"),
      Bullet(children: [
        'Miaka 1-3: gramu 13 kwa siku',
        'Miaka 4-8: gramu 19 kwa siku',
        'Miaka 9-13: gramu 34 kwa siku',
        'Miaka 14-18: gramu 46-52 kwa siku (inatofautiana na jinsia)'
      ]),
      SubTitleText(
        text: "Mafuta",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "Mafuta ni muhimu kwa ukuaji wa ubongo na unyonyaji wa vitamini vyenye mumunyifu."),
      Paragraph(
          title: "",
          body:
              "Miongozo ya Chakula kwa Wamarekani inapendekeza kwamba 25-35% ya jumla ya kalori za kila siku zinatokana na mafuta."),
      Bullet(children: [
        'Kwa watoto wa miaka 1-3, mafuta yanapaswa kutoa 30-40% ya jumla ya kalori ya kila siku.',
        'Kwa watoto wa miaka 4-18, mafuta yanapaswa kutoa kuhusu 25-35% ya jumla ya kalori ya kila siku.'
      ]),
      SubTitleText(
        text: "Mafuta Yaliyojaa",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "Ulaji wa mafuta unapaswa kuwa chini ya 10% ya jumla ya kalori."),
      SubTitleText(
        text: "Mafuta ya Trans",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body: "Ulaji wa mafuta ya ziada unapaswa kuwa mdogo iwezekanavyo."),
      SubTitleText(text: "Cholesterol ya chakula", fontSize: 14),
      Paragraph(
          title: "",
          body:
              "Hakuna RDA maalum kwa cholesterol ya chakula, lakini kuweka ulaji wa chini iwezekanavyo wakati kudumisha chakula cha afya kunapendekezwa."),
      Remember(children: [
        "Ni muhimu kutambua kwamba mapendekezo haya ni miongozo ya jumla, na mahitaji ya mtu binafsi yanaweza kutofautiana. Mambo kama vile kiwango cha shughuli za kimwili, kasi ya ukuaji, na afya kwa ujumla inapaswa kuzingatiwa wakati wa kubainisha ulaji unaofaa wa virutubishi kwa mtoto. Tena, kushauriana na mtaalamu wa afya au mtaalamu wa lishe aliyesajiliwa kunaweza kutoa mwongozo unaokufaa zaidi kulingana na mahitaji mahususi ya lishe ya mtoto."
      ]),

      SubTitleText(
        text:
            "Posho za Chakula zinazopendekezwa (RDAs) za virutubishi vidogo kwa watu wazima.",
      ),
      Paragraph(
          title: "",
          body:
              "Posho za Lishe Zinazopendekezwa (RDAs) ni mapendekezo ya ulaji wa virutubishi yaliyowekwa na mamlaka ya afya ili kukidhi mahitaji ya watu wengi wenye afya bora. Virutubisho vidogo ni vitamini na madini muhimu ambayo mwili unahitaji kwa kiasi kidogo kwa kazi mbalimbali za kisaikolojia. Hizi hapa ni RDA za virutubishi vidogo vilivyochaguliwa kwa watu wazima nchini Marekani:"),
      SubTitleText(
        text: "Vitamini",
        fontSize: 14,
      ),
      Bullet(children: [
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
      SubTitleText(
        text: "Madini",
        fontSize: 14,
      ),
      Bullet(children: [
        'Calcium: 1000 mg kwa watu wazima hadi umri wa miaka 50, 1200 mg kwa watu wazima zaidi ya 50',
        'Iron: 8 mg kwa wanaume, 18 mg kwa wanawake (wanawake waliokoma hedhi: 8 mg)',
        'Magnesiamu: 400 mg kwa wanaume, 310 mg kwa wanawake',
        'Fosforasi: 700 mg kwa wanaume na wanawake',
        'Potasiamu: 3400 mg kwa wanaume na wanawake',
        'Sodiamu: Ulaji wa Kutosha (AI) ni miligramu 1500 kwa wanaume na wanawake (sio RDA, kwani inaweza kutofautiana sana kati ya watu binafsi)',
        'Zinki: 11 mg kwa wanaume, 8 mg kwa wanawake',
      ]),
      Remember(children: [
        'Maadili haya hutofautiana kulingana na umri, jinsia, ujauzito, na kunyonyesha. Ni lazima watu binafsi wawasiliane na wataalamu wa afya kwa ushauri wa kibinafsi, haswa ikiwa wana hali mahususi za kiafya au vizuizi vya lishe. Zaidi ya hayo, mapendekezo yanaweza kutofautiana katika nchi tofauti, kwa hivyo ni vyema kurejelea miongozo ya eneo inapopatikana.',
      ]),

      SubTitleText(
          text:
              'Posho za Chakula Zinazopendekezwa (RDAs) za virutubisho kuu kwa watu wazima.'),
      Paragraph(
          title: "",
          body:
              "Posho za Lishe (RDAs) zinazopendekezwa kwa ajili ya virutubishi vingi ni miongozo iliyowekwa na mamlaka za afya ili kuongoza wastani wa ulaji wa kila siku wa virutubishi muhimu vinavyohitajika ili kukidhi mahitaji ya lishe ya watu wengi wenye afya bora. Kufikia sasisho langu la mwisho la maarifa mnamo Januari 2022, zifuatazo ni RDAs za virutubishi vikuu kwa watu wazima:"),
      SubTitleText(
        text: "Protini",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "RDA kwa watu wazima: gramu 0.8 kwa kilo ya uzani wa mwili kwa siku. Wanariadha na watu binafsi wanaohusika katika shughuli nzito za kimwili wanaweza kuhitaji ulaji wa juu wa protini."),
      SubTitleText(
        text: "Mafuta",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "Hakuna RDA mahususi kwa ajili ya mafuta, lakini Viwango Vinavyokubalika vya Usambazaji wa Macronutrient (AMDRs) zinaonyesha kuwa mafuta yanapaswa kuwa 20-35% ya jumla ya ulaji wa kalori ya kila siku. Ndani ya safu hii, mafuta yaliyojaa inashauriwa kuwa chini ya 10% ya jumla ya kalori ya kila siku."),
      SubTitleText(
        text: "Wanga",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "Hakuna RDA maalum kwa wanga, lakini AMDRs inapendekeza kwamba wanga huchangia 45-65% ya ulaji wa kalori ya kila siku. Mkazo unapaswa kuwa juu ya ulaji wa wanga tata (nafaka nzima, matunda, mboga) badala ya sukari rahisi."),
      Remember(children: [
        'Mapendekezo haya yanaweza kutofautiana kulingana na umri, jinsia, kiwango cha shughuli za kimwili na afya kwa ujumla. Ni muhimu kutambua kwamba mahitaji ya mtu binafsi ya lishe yanaweza kutofautiana, na kushauriana na mtaalamu wa afya au mtaalamu wa lishe aliyesajiliwa kwa ushauri wa kibinafsi kunapendekezwa.',
        'Tafadhali kumbuka kuwa miongozo ya lishe inaweza kusasishwa baada ya muda, kwa hivyo ni vyema kuwasiliana na rasilimali za hivi punde au mamlaka ya afya ili kupata maelezo ya hivi punde.'
      ]),

      SubTitleText(
          text:
              "Posho ya Chakula Iliyopendekezwa (RDA) kwa virutubishi vidogo wakati wa ujauzito."),
      Paragraph(
          title: "",
          body:
              "Posho ya Lishe Iliyopendekezwa (RDA) ya virutubishi vidogo wakati wa ujauzito ni muhimu ili kuhakikisha afya ya mama na mtoto anayekua. Ni muhimu kutambua kwamba mahitaji ya mtu binafsi ya virutubisho yanaweza kutofautiana, na wanawake wajawazito wanapaswa kushauriana na wataalamu wa afya kwa ushauri wa kibinafsi. RDA zinazotolewa hapa ni miongozo ya jumla kwa wanawake wajawazito wenye afya nzuri:"),
      SubTitleText(
        text: "Folate (Folic Acid)",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "Mikrogramu 600 (mcg) kwa siku"),
      Paragraph(
          title: "",
          body:
              "Folate ni muhimu kwa ukuaji wa mapema wa mirija ya neva, ambayo huunda ubongo na uti wa mgongo wa mtoto."),
      SubTitleText(
        text: "Chuma",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "miligramu 27 (mg) kwa siku"),
      Paragraph(
          title: "",
          body:
              "Iron inahitajika ili kuongeza uzalishaji wa damu wakati wa ujauzito na kuzuia anemia ya upungufu wa chuma."),
      SubTitleText(text: "Calcium"),
      Paragraph(
          title: "",
          body: "1,000 mg kwa siku (kwa wanawake wenye umri wa miaka 19-50)"),
      Paragraph(
          title: "",
          body: "Calcium ni muhimu kwa ukuaji wa mifupa na meno ya mtoto."),
      SubTitleText(
        text: "Vitamin D",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "vitengo 600 vya kimataifa (IU) kwa siku"),
      Paragraph(
          title: "",
          body:
              "Vitamini D husaidia mwili kunyonya kalsiamu na ni muhimu kwa afya ya mifupa."),
      SubTitleText(
        text: "Iodini",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "220 mcg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Iodini ni muhimu ili kukuza ubongo na mfumo wa neva wa mtoto."),
      SubTitleText(
        text: "Vitamini A",
        fontSize: 14,
      ),
      Paragraph(
          title: "", body: "770 mcg RAE (Retinol Shughuli Sawa) kwa siku"),
      Paragraph(
          title: "",
          body:
              "Vitamini A ni muhimu kwa maono, kazi ya kinga, na afya ya ngozi. Walakini, ulaji mwingi wa vitamini A, haswa katika mfumo wa retinol, unaweza kudhuru fetus, kwa hivyo ni muhimu kutozidi viwango vilivyopendekezwa."),
      SubTitleText(
        text: "Vitamini C",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "85 mg kwa siku"),
      Paragraph(
          title: "",
          body: "Vitamini C ni muhimu kwa ukuaji na ukarabati wa tishu."),
      SubTitleText(
        text: "Vitamini E",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "15 mg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Vitamini E ina mali ya antioxidant na ni muhimu kwa ukuaji wa mtoto."),
      SubTitleText(
        text: "Thiamine (Vitamini B1)",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "1.4 mg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Thiamine ni muhimu kwa ukuaji wa ubongo wa mtoto na ukuaji wa jumla."),
      SubTitleText(
        text: "Riboflauini (Vitamini B2)",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "1.4 mg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Riboflauini ni muhimu kwa kukuza mifupa, misuli na neva za mtoto."),
      SubTitleText(
        text: "Niacin (Vitamin B3):",
        fontSize: 14,
      ),
      Paragraph(title: "", body: "18 mg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Niasini ni muhimu kwa ukuaji wa mtoto na husaidia kubadilisha chakula kuwa nishati."),
      SubTitleText(
        text: "Vitamini B6:",
        fontSize: 14,
      ),
      Paragraph(
          title: "1.9 mg kwa siku",
          body:
              "Vitamini B6 ni muhimu kwa ukuaji wa ubongo wa mtoto na husaidia mwili kubadilisha chakula kuwa nishati."),
      SubTitleText(text: "Vitamini B12"),
      Paragraph(title: "", body: "2.6 mcg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Vitamini B12 ni muhimu kwa maendeleo ya mfumo wa neva wa mtoto."),
      SubTitleText(text: "Zinki"),
      Paragraph(title: "", body: "11 mg kwa siku"),
      Paragraph(
          title: "",
          body:
              "Zinki ni muhimu kwa ukuaji wa mtoto na utendaji wa mfumo wa kinga."),
      Remember(children: [
        'Wanawake wajawazito wanapaswa kupata virutubishi hivi kupitia lishe bora na, ikiwa ni lazima, virutubisho kama mtoa huduma wao wa afya anapendekeza. Ni muhimu kuepuka ulaji mwingi wa vitamini na madini fulani, kwa kuwa hii inaweza kuwadhuru mama na mtoto. Daima wasiliana na mtaalamu wa afya kwa ushauri wa kibinafsi kulingana na mahitaji ya mtu binafsi ya afya.'
      ]),

      SubTitleText(
          text:
              "Pendekezo la Posho ya Chakula (RDA) kwa virutubisho vingi wakati wa ujauzito."),
      Paragraph(
          title: "",
          body:
              "Posho ya Lishe Inayopendekezwa (RDA) ya virutubishi vingi wakati wa ujauzito hutofautiana kulingana na mambo ya mtu binafsi kama vile umri, uzito, kiwango cha shughuli na afya kwa ujumla. Hata hivyo, kuna miongozo ya jumla iliyotolewa na mamlaka za afya ambayo wajawazito wanaweza kufuata ili kuhakikisha wanakidhi mahitaji yao ya lishe. Kumbuka kwamba kushauriana na mtaalamu wa afya kwa ushauri wa kibinafsi ni muhimu."),
      SubTitleText(
        text: "Protini",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body: "RDA ya protini wakati wa ujauzito ni gramu 71 kwa siku."),
      Paragraph(
          title: "",
          body:
              "Vyanzo vyema vya protini ni pamoja na nyama konda, kuku, samaki, mayai, bidhaa za maziwa, kunde, karanga, na mbegu."),
      SubTitleText(
        text: "Wanga",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "Hakuna RDA maalum kwa ajili ya wanga wakati wa ujauzito, lakini wanapaswa kufanya juu ya 45-65% ya ulaji wa kalori ya kila siku."),
      Paragraph(
          title: "",
          body:
              "Chagua kabohaidreti changamano kama vile nafaka zisizokobolewa, matunda, mboga mboga, na kunde ili kupata nishati endelevu."),
      SubTitleText(
        text: "Mafuta",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "RDA ya mafuta wakati wa ujauzito ni karibu 20-35% ya jumla ya ulaji wa kalori ya kila siku."),
      Paragraph(
          title: "",
          body:
              "Zingatia mafuta yenye afya, ikijumuisha vyanzo kama vile parachichi, karanga, mbegu, mafuta ya zeituni na samaki wenye mafuta mengi kama lax."),
      Remember(children: [
        'Ni muhimu kutambua kwamba lishe ya kabla ya kuzaa sio tu kuhusu macronutrients. Virutubisho vidogo, kama vile asidi ya foliki, chuma, kalsiamu, vitamini D, na vingine, pia ni muhimu wakati wa ujauzito. Vitamini vya ujauzito mara nyingi hupendekezwa ili kusaidia kuhakikisha kwamba wajawazito wanapata vitamini na madini muhimu.',
        'Zaidi ya hayo, kukaa vizuri-hydrated ni muhimu wakati wa ujauzito. Kunywa maji ya kutosha husaidia kusaidia kuongezeka kwa kiasi cha damu na maji ya amniotic, kati ya kazi nyingine.',
        'Daima wasiliana na mtoa huduma wako wa afya kwa ushauri wa kibinafsi na ushughulikie wasiwasi wowote maalum wa lishe au hali ambazo unaweza kuwa nazo wakati wa ujauzito. Wanaweza kutoa mwongozo kulingana na hali yako ya afya na mahitaji.'
      ]),

      SubTitleText(
          text:
              'Posho ya Chakula Iliyopendekezwa (RDA) kwa virutubishi vidogo wakati wa kunyonyesha.'),
      Paragraph(
          title: '',
          body:
              'Posho ya Lishe Inayopendekezwa (RDA) ya virutubishi vidogo wakati wa kunyonyesha inaweza kutofautiana kulingana na umri, uzito na hali ya afya ya mtu binafsi. Walakini, hapa kuna mapendekezo ya jumla ya virutubishi muhimu wakati wa kunyonyesha:'),
      Paragraph(
          title: "Vitamini A:",
          body:
              " RDA: mikrogramu 1,300 (mcg) kila siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Vitamin C:",
          body:
              " RDA: miligramu 120 (mg) kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Vitamini D:",
          body:
              " RDA: mikrogram 15 (mcg) kila siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Vitamini E:",
          body: "RDA: 19 mg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Vitamini K:",
          body: " RDA: 90 mcg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Thiamine (Vitamini B1):",
          body: " RDA: 1.4 mg kila siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Riboflauini (Vitamini B2):",
          body: " RDA: 1.6 mg kila siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Niasini (Vitamini B3):",
          body: " RDA: 17 mg kila siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Vitamini B6:",
          body: " RDA: 2 mg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Folate (Vitamini B9):",
          body: " RDA: 500 mcg kila siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Vitamini B12:",
          body: " RDA: 2.8 mcg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Calcium:",
          body: " RDA: 1,000 mg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Chuma:",
          body: " RDA: 9 mg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Zinki:",
          body: " RDA: miligramu 12 kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Shaba:",
          body: " RDA: 1,300 mcg kwa siku kwa wanawake wanaonyonyesha."),
      Paragraph(
          title: "Iodini:",
          body: " RDA: 290 mcg kwa siku kwa wanawake wanaonyonyesha."),
      Remember(children: [
        'Wanawake wanaonyonyesha wanahitaji kudumisha lishe bora na yenye lishe ili kukidhi mahitaji yao ya virutubisho katika kipindi hiki. Hata hivyo, mahitaji ya mtu binafsi yanaweza kutofautiana, na inashauriwa kila mara kushauriana na mhudumu wa afya au mtaalamu wa lishe aliyesajiliwa ili kurekebisha mapendekezo ya lishe kulingana na mahitaji na hali mahususi.'
      ]),

      SubTitleText(
          text:
              'Posho ya Chakula Iliyopendekezwa (RDA) kwa virutubisho vingi wakati wa kunyonyesha.'),
      Paragraph(
          title: "",
          body:
              "Posho ya Lishe Inayopendekezwa (RDA) ya virutubisho vikubwa wakati wa kunyonyesha inaweza kutofautiana kulingana na umri wa mama, uzito, kiwango cha shughuli na kiasi cha maziwa ya mama kinachozalishwa. Walakini, hapa kuna mapendekezo ya jumla ya ulaji wa macronutrient wakati wa kunyonyesha:"),
      Paragraph(
          title: "Protini:",
          body:
              " RDA ya protini wakati wa kunyonyesha ni kubwa kuliko wakati wa ujauzito au wakati si mjamzito. Kwa wastani, wanawake wanaonyonyesha wanashauriwa kutumia takriban gramu 71 za protini kila siku. Vyanzo vyema vya protini ni pamoja na nyama konda, kuku, samaki, bidhaa za maziwa, mayai, kunde, na karanga."),
      Paragraph(
          title: "Wanga:",
          body:
              " Mahitaji ya wanga wakati wa kunyonyesha ni sawa na yale wakati wa ujauzito. RDA ya wanga ni karibu 210 hadi 175 gramu kwa siku, kulingana na mambo ya mtu binafsi. Nafaka nzima, matunda, mboga mboga, na kunde ni vyanzo bora vya wanga."),
      Paragraph(
          title: "Mafuta:",
          body:
              " RDA ya mafuta wakati wa kunyonyesha ni takriban gramu 44 hadi 55 kwa siku. Ni muhimu kuzingatia mafuta yenye afya, kama vile yale yanayopatikana kwenye parachichi, karanga, mbegu, mafuta ya zeituni na samaki wenye mafuta mengi. Asidi ya mafuta ya Omega-3, haswa DHA (docosahexaenoic acid), ni muhimu kwa kukuza mfumo wa neva wa mtoto na hupatikana katika samaki wenye mafuta, mbegu za kitani na walnuts."),
      Paragraph(
          title: "Kalori:",
          body:
              " Wanawake wanaonyonyesha kwa kawaida huhitaji kalori za ziada ili kusaidia uzalishaji wa maziwa. Kwa wastani, kalori 500 za ziada kwa siku zinaweza kupendekezwa, ingawa mahitaji ya mtu binafsi yanaweza kutofautiana. Ni muhimu kuzingatia dalili za njaa na utimilifu na kurekebisha ulaji wa kalori ipasavyo."),
      Remember(children: [
        'Wanawake wanaonyonyesha lazima wakae na maji mengi, hivyo kunywa maji mengi pia ni muhimu. Zaidi ya hayo, inapendekezwa kuwa wanawake wanaonyonyesha waendelee kutumia vitamini kabla ya kuzaa, hasa zile zenye chuma na asidi ya foliki.',
        'Akina mama wanaonyonyesha lazima washauriane na watoa huduma zao za afya au mtaalamu wa lishe aliyesajiliwa ili kubaini mahitaji yao ya lishe kulingana na mambo binafsi. Mahitaji ya virutubisho yanaweza kutofautiana, na ushauri wa kibinafsi unaweza kuhakikisha kwamba mama na mtoto wanapata lishe ya kutosha katika kipindi hiki muhimu.'
      ]),
    ],
  ),
);
