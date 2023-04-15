import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/school_children.png',
  title: 'Chakula cha afya kwa watoto wenye umri wa kwenda shule',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: '',
        body:
            'Chakula chenye afya kwa watoto wa umri wa kwenda shule kinajumuisha aina mbalimbali za vyakula vibichi kutoka katika makundi matano ya vyakula:-'),
    Bullet(children: [
      'Mboga',
      'matunda',
      'vyakula vya nafaka',
      'kupunguzwa kwa mafuta ya maziwa',
      'protini.'
    ]),
    SubTitleText(text: 'Matunda na mboga'),
    Paragraph(
        title: '',
        body:
            'Matunda na mboga humpa mtoto wako nishati, vitamini, antioxidants, nyuzinyuzi na maji. Virutubisho hivi husaidia kumkinga mtoto wako dhidi ya magonjwa baadaye katika maisha, ikiwa ni pamoja na magonjwa kama vile ugonjwa wa moyo, kiharusi, na baadhi ya saratani. Mhimize mtoto wako kuchagua matunda na mboga kwa kila mlo na vitafunio. Hii ni pamoja na matunda na mboga za rangi tofauti, muundo, na ladha, safi na iliyopikwa. Osha matunda ili kuondoa uchafu au kemikali na uwashe ngozi yoyote inayoliwa kwa sababu ngozi ina virutubishi pia.'),
    CourseBodyImage(image: 'assets/materials/fruit_and_vegi.jpg'),
    SubTitleText(text: 'Vyakula vya nafaka'),
    Paragraph(
        title: '',
        body:
            'Vyakula vya nafaka ni pamoja na mkate, pasta, noodles, nafaka za kifungua kinywa, couscous, mchele, mahindi, quinoa, polenta, shayiri na shayiri. Vyakula hivi huwapa watoto nishati wanayohitaji kukua, kukuza na kujifunza. Vyakula vya nafaka vyenye index ya chini ya glycemic, kama vile pasta ya nafaka nzima na mkate, vitampa mtoto wako nishati ya kudumu na kumfanya ashibe zaidi.'),
    CourseBodyImage(image: 'assets/materials/grain_food.jpg'),
    SubTitleText(text: 'Chakula cha maziwa kilichopunguzwa na mafuta'),
    Paragraph(
        title: '',
        body:
            'Vyakula muhimu vya maziwa ni maziwa, jibini na mtindi. Vyakula hivi ni vyanzo vyema vya protini na kalsiamu. Jaribu kumpa mtoto wako aina mbalimbali za maziwa kila siku kwa mfano, vinywaji vya maziwa, vipande vya jibini, au bakuli za mtindi. Watoto wenye umri wa zaidi ya miaka miwili wanaweza kuwa na bidhaa za maziwa zilizopunguzwa.'),
    CourseBodyImage(image: 'assets/materials/reduced_fats.jpg'),
    SubTitleText(text: 'Protini'),
    Paragraph(
        title: '',
        body:
            'Vyakula vyenye protini nyingi ni pamoja na nyama konda, samaki, kuku, mayai, maharagwe, dengu, mbaazi, tofu, na karanga. Vyakula hivi ni muhimu kwa ukuaji wa mtoto wako na ukuaji wa misuli. Vyakula hivi vina vitamini na madini mengine muhimu kama chuma, zinki, vitamini B12, na asidi ya mafuta ya omega-3. Asidi ya chuma na omega-3 kutoka kwa nyama nyekundu na samaki wenye mafuta ni muhimu kwa ukuaji wa ubongo wa mtoto wako na kujifunza.'),
    CourseBodyImage(image: 'assets/materials/protin_food.jpg'),
    SubTitleText(text: 'Brian akiongeza vyakula kwa watoto wa shule'),
    CourseBodyImage(image: 'assets/materials/egg.png'),
    Paragraph(
        title: 'Mayai ',
        body:
            'Mayai yote ni chanzo bora cha vitamini A, D, B12 na choline zinazokuza ubongo. Choline ni muhimu kwa watoto wadogo, kwani imeonyeshwa kuboresha ukuaji wa ubongo na kumbukumbu ya muda mrefu. Inapendekezwa kununua mayai ya malisho: Utafiti mmoja uligundua kuwa mayai ya kuchungwa yanaweza kuwa na vitamini E mara mbili na karibu mara tatu ya omega-3s nyingi kuliko mayai yaliyofungiwa. '),
    CourseBodyImage(image: 'assets/materials/safefood_food.jpg'),
    Paragraph(
        title: 'Chakula cha baharini ',
        body:
            'Samaki wenye mafuta na dagaa wengine hutoa mengi kwa pesa kuhusu ukuaji wa protini ya ubongo, zinki, chuma, choline, iodini, na mafuta ya omega-3. Lakini epuka kulisha dagaa wako wachanga kwa wingi wa zebaki, kama vile tuna na swordfish. Zebaki nyingi zinaweza kudhuru mfumo wa neva unaokua wa mtoto. Badala yake, chagua chaguo za zebaki kidogo kama vile kamba, samoni, tilapia, kaa au chewa. Watoto walio chini ya umri wa miaka 3 wanaweza kuwa na aunzi 1 inayohudumia mara mbili hadi tatu kwa wiki.'),
    CourseBodyImage(image: 'assets/materials/leafy_green_food.jpg'),
    Paragraph(
        title: 'Mboga za Kijani za Majani ',
        body:
            'Kuna sababu ambayo wazazi hujaribu kuficha mboga za majani zaidi, kama vile mchicha na kale, katika vyakula vya watoto wao vya smoothies na pasta: Ni chanzo kikubwa cha madini ya chuma na folate. Utafiti unaonyesha kuwa watoto wanaopata folate ya kutosha huwa na utambuzi bora kuliko watoto ambao hawapati vya kutosha. Iron inachukua jukumu muhimu katika ukuzaji wa hippocampus - sehemu ya ubongo inayowajibika kwa kujifunza na kumbukumbu.'),
    CourseBodyImage(image: 'assets/materials/meat_food.jpg'),
    Paragraph(
        title: 'Nyama konda (nyama mbadala) ',
        body:
            'Nyama ya ng\'ombe iliyokonda inastahili kuwa chakula cha ubongo kwa sababu ni chanzo bora cha zinki na chuma. Iron ni muhimu sana kwa watoto wadogo kwa sababu wana uwezekano mkubwa wa kupata anemia (kiwango cha chini cha chuma). Takriban mtoto mmoja kati ya 10 wa Marekani walio na umri wa miaka 3 na chini zaidi ana upungufu wa madini ya chuma, jambo ambalo linaweza kuchangia matatizo ya kujifunza na ugonjwa wa kuhangaikia sana (ADHD). Maharage meusi au baga za soya hufanya kazi kama mbadala bora wa baga iliyo na chuma.'),
    CourseBodyImage(image: 'assets/materials/nuts_food.jpg'),
    Paragraph(
        title: 'Karanga na mbegu ',
        body:
            'Karanga, mbegu, na siagi ya kokwa hutengeneza vitafunio vilivyojaa protini na zinki. Protini inachangia ukuaji wa ubongo wenye afya na ukuzaji wa kumbukumbu ya muda mrefu. Zinki pia ina jukumu muhimu katika miaka ya watoto wachanga wakati ubongo unakua kwa kasi. Kiasi cha zinki kisichotosha kinaweza kuathiri ukuaji wa utambuzi wa mtoto wako, kudhoofisha kumbukumbu na uwezo wake wa kujifunza.'),
    CourseBodyImage(image: 'assets/materials/yogurt_food.jpg'),
    Paragraph(
        title: 'Mgando ',
        body:
            'Mtindi usio na sukari ni njia rahisi, rafiki kwa watoto kusaidia ukuaji wa ubongo. Ina virutubisho kama vile protini, zinki, choline, na iodini. Watoto wanahitaji iodini ili kuzalisha homoni za tezi, muhimu kwa ukuaji wa ubongo na michakato ya neva. Hata upungufu mdogo wa iodini unaweza kuathiri utendaji wa jumla wa utambuzi wa mtoto na uwezo wake wa kufikiria.'),
    CourseBodyImage(image: 'assets/materials/beans_food.jpg'),
    Paragraph(
        title: 'Maharage ',
        body:
            'kutoa virutubisho kadhaa vya manufaa kwa ubongo unaoendelea, ikiwa ni pamoja na zinki, protini, chuma, folate, na choline. Baadhi ya aina za maharagwe, kama vile figo, pinto, na soya, pia zina kiasi kikubwa cha asidi ya mafuta ya omega-3. Kwa watoto wa mboga mboga, chuma na protini katika maharagwe huwafanya kuwa mbadala bora wa nyama.'),
    SubTitleText(text: 'Virutubisho Muhimu kwa ukuaji wa ubongo wa mtoto'),
    Paragraph(
        title: '',
        body:
            'Ingawa virutubishi vyote ni muhimu kwa ukuaji na utendaji wa ubongo, vingine vina jukumu muhimu katika ukuaji wa mapema wa ubongo kuliko zingine. Kamati ya Chuo cha Marekani cha Madaktari wa Watoto kuhusu Lishe inapendekeza virutubishi fulani kwa ukuaji wa afya wa ubongo kwa watoto wachanga: '),
    Bullet(children: [
      'Choline',
      'Folate',
      'Iodini',
      'Chuma',
      'Asidi ya mafuta ya polyunsaturated ya mnyororo mrefu, kama vile asidi ya mafuta ya omega-3',
      'Protini',
      'Vitamini A, D, B6, na B12',
      'Zinki',
    ])
  ]),
);
