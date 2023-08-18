import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  title: "LISHE YA MTOTO",
  coverImage: "assets/materials/images/14.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      CourseBodyImage(image: "assets/materials/images/14.png"),
      Objectives(title: "MALENGO", children: [
        'Kutoa ufahamu juu ya faida za kunyonyesha watoto wachanga na watoto wachanga pekee'
      ]),
      SubTitleText(text: "Kulisha mtoto kutoka kuzaliwa hadi umri wa miezi 6"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Weka mtoto kwenye titi ndani ya dakika 30 za kwanza za kuzaliwa. Kuanza kunyonyesha hurahisisha uzalishwaji wa maziwa na husaidia uterasi yako kurudi kwenye umbo haraka na kudhibiti uvujaji wa damu baada ya kujifungua.",
        "Mnyonyeshe mtoto wako maziwa ya mama pekee, hata maji, katika miezi sita ya kwanza baada ya kuzaliwa. Kila kipindi cha kulisha kinapaswa kuchukua kati ya dakika 20 na 45.",
        "Unyonyeshaji wa maziwa ya mama pekee huchangia ukuaji na ukuaji wa kutosha wa mtoto. Daima ni safi; ina antibodies ambayo hulinda dhidi ya magonjwa. Maziwa ya mama huwa tayari na kwa joto sahihi na ni rahisi kuyeyushwa. Ina maji ya kutosha kwa mahitaji ya mtoto.",
        "Mnyonyeshe mara nyingi mtoto wako anavyotaka haswa usiku. Mtoto wako anaweza kuwa na njaa ikiwa anazozana, kunyonya vidole, au kusonga midomo.",
        "Angalia macho ya watoto wako, piga uso na mwili wao kwa upole na imba nyimbo wanaponyonyesha. Osha mikono yako na sabuni kabla ya kunyonyesha na weka kucha zako.",
        "Ikiwa una VVU, wasiliana na daktari mara moja kwa mwongozo (angalia Mwongozo wa Kitaifa) wa jinsi ya kumlisha mtoto wako.",
        "Mtoto anapokuwa na umri wa miezi 5, anza kufikiria na kujiandaa kwa kuanzishwa kwa wakati unaofaa kwa malisho bora ya ziada."
      ]),
      Remember(title: "KUMBUKA", children: [
        "Lisha mtoto wako maziwa ya mama pekee katika miezi sita ya kwanza baada ya kuzaliwa, usimpe maji yoyote, hata maji"
      ]),
      SubTitleText(text: "Kuanzishwa kwa lishe ya ziada baada ya miezi 6"),
      Objectives(title: "MALENGO", children: [
        "Jenga ujuzi wa jinsi ya kuanzisha vyakula vya ziada kwa mtoto wa miezi 7"
      ]),
      CourseBodyImage(image: "assets/materials/images/3.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Mtoto anapofikisha miezi 7, anahitaji virutubisho zaidi kutoka kwa vyakula vingine",
        "Anza kutoa chakula laini cha usawa katika umri wa miezi 7, mara 2 hadi 3 kwa siku.",
        "Anza na vijiko 2-3 kwa kila chakula.",
        "Ongeza maziwa mengine ya wanyama kwa chakula laini kilichotayarishwa.",
        "Chakula kinapaswa kuwa nene vya kutosha ili kisipoteze kijiko.",
        "Lisha mtoto wako polepole na kwa subira, mtazame machoni, mtie moyo na mchochee kula. Kamwe usiwalazimishe watoto.",
        "Tafuta vidokezo vinavyoonyesha mtoto wako ana njaa kabla hajaanza kulia (k.m. kuweka vidole mdomoni, kutema mate, kuangalia kile ambacho wengine wanakula)",
        "Usitumie chupa kulisha mtoto wako. Wao ni vigumu sana kuwa safi na wanaweza kumfanya mtoto wako awe mgonjwa na kuhara.",
        "Maziwa ya mama yanaendelea kuwa muhimu sana kwa mtoto wako. Mnyonyeshe mtoto wako kwanza kabla ya kumpa vyakula vingine.",
        "Mnyonyeshe hadi mtoto wako afikishe miaka miwili au zaidi. Endelea kumnyonyesha mtoto wako wakati wowote anapotaka, mchana na usiku, kwa afya njema."
      ]),
      Remember(title: "KUMBUKA", children: [
        "Chakula cha ziada huanza kwa miezi 7 kwa mara 2-3 kwa siku"
      ]),
      SubTitleText(text: "Lishe ya ziada katika umri wa miezi 7-8"),
      Objectives(title: "MALENGO", children: [
        "Kuimarisha uelewa juu ya nini na jinsi ya kulisha mtoto wa umri wa miezi 7 - 8"
      ]),
      CourseBodyImage(image: "assets/materials/images/16.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Endelea kumnyonyesha mtoto wako usiku na mchana ili kumfanya awe na afya njema.",
        "Maziwa ya mama ni muhimu sana kwa mtoto wako. Endelea kunyonyesha hadi mtoto wako atakapokuwa na umri wa miaka miwili.",
        "Kuanzia miezi 7 na kuendelea, lisha mtoto wako mara 3 kwa siku. Toa vitafunio 1 hadi 2 kati ya milo.",
        "Hatua kwa hatua ongeza kiasi cha chakula hadi nusu ya kikombe cha 250 ml. Watoto wana matumbo madogo na wanaweza tu kula kiasi kidogo katika kila mlo.",
        "Sanja na kulainisha vyakula ili mtoto apate kutafuna na kumeza kwa urahisi; tumia maziwa ya mama au maziwa mengine ya wanyama kuandaa chakula laini.",
        "Fanya chakula cha mtoto wako kuwa mzito kadiri mtoto anavyokua, hakikisha kwamba bado anaweza kumeza kwa urahisi bila kuzisonga.",
        "Jaribu kujumuisha katika chakula kutoka angalau vikundi 5 vya chakula kila siku",
        "Ongeza kiasi kidogo cha mafuta au majarini, mboga za mashed, matunda yaliyopondwa, kwenye uji wa mtoto wako. Maziwa ya wanyama (mbuzi, ng'ombe, nk) pia ni chakula kizuri cha kuongeza.",
        "Tumia chumvi yenye iodini katika chakula cha mtoto wako.",
        "Kuwa mvumilivu, tazama macho na umtie moyo mtoto wako kula. Kamwe usilazimishe mtoto wako kula.",
        "Tafuta vidokezo vinavyoonyesha mtoto wako ana njaa kabla hajaanza kulia (k.m. kuweka vidole mdomoni, kutema mate, kuangalia kile ambacho wengine wanakula)"
      ]),
      Remember(title: "KUMBUKA", children: [
        "Kuanzia miezi 7 na kuendelea, lisha mtoto wako mara 3 kwa siku. Toa vitafunio 1 hadi 2 (matunda, karanga) kati ya milo"
      ]),
      SubTitleText(text: "Kulisha kwa nyongeza katika miezi 9-11"),
      Objectives(title: "MALENGO", children: [
        "Kuimarisha uelewa juu ya nini na jinsi ya kulisha mtoto wa umri wa miezi 9 - 11"
      ]),
      CourseBodyImage(image: "assets/materials/images/17.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Kuanzia miezi 9 na kuendelea, lisha mtoto wako mdogo mara 4 kwa siku (milo 3 na vitafunio 1 - 2). Mpe mtoto wako 3/4 ya kikombe/bakuli ya mililita 250 katika kila malisho.",
        "Kufikia miezi 9 mtoto anapaswa kuanza kula vyakula vya vidole kama vile vipande vya embe mbivu na papai, ndizi na mboga.",
        "Jaribu kujumuisha katika chakula kutoka angalau vikundi 5 vya chakula kila siku",
        "Ongeza kiasi kidogo cha mafuta au majarini kwenye chakula cha mtoto wako. Maziwa ya wanyama (mbuzi, ng'ombe, nk) ni afya kwa mtoto wako.",
        "Mpe mtoto wako sahani yake mwenyewe ili kuhakikisha anakula chakula chote alichopewa.",
        "Kuwa mvumilivu, onyesha upendo, tazama macho na umtie moyo mtoto wako kula chakula zaidi. Kamwe usiwalazimishe watoto.",
        "Tafuta vidokezo vinavyoonyesha mtoto wako ana njaa kabla hajaanza kulia (k.m. kuweka vidole mdomoni, kutema mate, kuangalia kile ambacho wengine wanakula)",
        "Osha mikono yako kwa sabuni kabla ya kuandaa chakula na kulisha mtoto wako. KUMBUKA kunawa mikono ya mtoto wako kabla na baada ya kumpa chakula.",
        "Endelea kumnyonyesha mtoto wako hadi mtoto wako afikishe miaka miwili au zaidi ili kudumisha afya na nguvu zake."
      ]),
      Remember(title: "KUMBUKA", children: [
        "Utayarishaji na uhifadhi salama wa vyakula vya nyongeza: Hifadhi chakula kwenye chombo kilichofunikwa, safi na mpe mtoto wako ndani ya saa 2 baada ya kupika (ikiwa huna jokofu)"
      ]),
      SubTitleText(text: "Lishe ya ziada katika umri wa miezi 12 - 24"),
      Objectives(title: "MALENGO", children: [
        "Kuongeza ufahamu juu ya nini na jinsi ya kulisha mtoto wa umri wa miezi 12 - 24"
      ]),
      CourseBodyImage(image: "assets/materials/images/18.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Katika umri wa miezi 12 mpe mtoto chakula kutoka kwenye mlo wa familia. Watoto hula polepole zaidi kuliko watu wazima, kwa hivyo mpe mtoto bakuli lake mwenyewe ili kuhakikisha kuwa anakula chakula cha kutosha.",
        "Kuwa na subira na kuhimiza mtoto wako kula. Kamwe usiwalazimishe watoto.",
        "Mtoto anapaswa kulishwa mara 3 - 4 kwa siku (kikombe kilichojaa) + 1 - 2 vitafunio Mpe mtoto wako mchanga ¾ hadi kikombe kimoja cha mililita 250 kwa kila bakuli.",
        "Kata chakula katika vipande vidogo ili mtoto mdogo aweze kutafuna na kumeza kwa urahisi.",
        "Jumuisha chakula kutoka kwa angalau vikundi 5 vya chakula kila siku",
        "Ongeza kiasi kidogo cha mafuta au majarini kwenye chakula cha mtoto wako. Maziwa ya wanyama (mbuzi, ng'ombe, nk) ni afya kwa mtoto wako. Tumia chumvi yenye iodized katika chakula cha mtoto wako",
        "Hifadhi vyakula vinavyotolewa kwa mtoto katika mazingira safi na salama ili kuepuka kuhara na magonjwa.",
        "Osha mikono yako kwa sabuni kabla ya kuandaa chakula na kulisha mtoto wako. KUMBUKA kunawa mikono ya mtoto wako kabla na baada ya kumpa chakula.",
        "Endelea kumnyonyesha mtoto wako mdogo hadi afikishe umri wa miaka miwili ili kudumisha afya na nguvu zake."
      ]),
      // Remember(title: "KUMBUKA",children: [
      //   "Safe preparation and storage of complementary foods: Store food in a covered, clean container and give it to your baby within 2 hours after cooking (if you don’t have a refrigerator)"
      // ]),
      SubTitleText(text: "Kulisha wakati na baada ya ugonjwa"),
      Objectives(title: "MALENGO", children: [
        "Kuboresha uelewa wa matatizo ya kunyonyesha na tiba zinazowezekana"
      ]),
      CourseBodyImage(image: "assets/materials/images/19.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Mtoto anapokuwa mgonjwa endelea kunyonyesha mara kwa mara, ili kusaidia kupona haraka na kurejesha uzito uliopotea. Hata kama mtoto wako ana kuhara ni muhimu kuendelea kunyonyesha.",
        "Ikiwa mtoto wako ni dhaifu sana kunyonya, mnyonyeshe maziwa ya mama ili kumpa mtoto, ama kwa kikombe au kwa kuelezea moja kwa moja kwenye kinywa cha mtoto. Hii itakusaidia kuendelea kutengeneza maziwa kwa ajili ya mtoto wako na kuzuia matatizo ya matiti (engorgement).",
        "Kwa mtoto mwenye umri wa miezi 0-6 kunyonyesha mara nyingi zaidi wakati na baada ya ugonjwa.",
        "Kwa mtoto mwenye umri wa miezi 6-24, ongeza mara kwa mara kunyonyesha na pia kulisha kiasi kidogo cha chakula kilichoboreshwa/uji mara nyingi zaidi.",
        "Fuata mapendekezo ya matibabu yaliyotolewa na daktari.",
        Paragraph(title: "Kulisha wakati wa kupona", body: ""),
        "Wakati mtoto wako mdogo amepata nafuu, mpe mlo mmoja wa ziada wa chakula kigumu kila siku katika muda wa wiki mbili zijazo. Ongeza matunda na mboga zaidi kwa chakula cha mtoto kila siku. Hii itamsaidia kurejesha uzito uliopotea wakati wa ugonjwa.",
        "Kunyonyesha mara nyingi zaidi katika wiki mbili baada ya kupona.",
        "Ikiwa wewe ni mgonjwa bado unaweza kunyonyesha."
      ]),
      Remember(title: "KUMBUKA", children: [
        "Kumbuka kuendelea kumnyonyesha mtoto na kumpa chakula kidogo mara nyingi zaidi (angalau mara 8 kwa siku zaidi)"
      ]),
      SubTitleText(text: "Huduma za lishe ya watoto zinahitajika"),
      Objectives(title: "MALENGO", children: [
        "Boresha uelewa wa huduma za lishe zinazohitajika tangu kuzaliwa hadi miaka 2"
      ]),
      CourseBodyImage(image: "assets/materials/images/20.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        Paragraph(title: "Kuanzia kuzaliwa hadi miezi 6", body: ""),
        "Matunzo ya watoto wachanga - kukata kamba safi na utunzaji, kuosha watoto wachanga katika maji ya joto, kunyonyesha mara moja, na kuwaweka watoto wachanga joto, unyonyeshaji wa mapema na wa kipekee.",
        "Utunzaji baada ya kuzaa - ufuatiliaji wa chanjo na ukuaji (kulingana na mwongozo wa MoH) na kukuza (kupima uzito wa mtoto, kugundua dalili za hatari za mtoto/mama n.k).",
        Paragraph(title: "Kutoka miezi 6 hadi miaka 2 na zaidi", body: ""),
        "Chanjo ya surua katika miezi 9",
        "Kuongezewa kwa vitamini A De-worming (kutoka miezi 12)",
        "Ufuatiliaji na ukuzaji wa ukuaji"
      ]),
      Remember(title: "KUMBUKA", children: [
        "Daima kumbuka kumpeleka mtoto wako chini ya umri wa miaka 5 hadi chini ya miaka mitano kliniki ili ukuaji na ukuaji wake ufuatiliwe"
      ])
    ],
  ),
);
