import 'package:flutter/material.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/category_button.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Food SW = Food(
    coverImage: 'assets/materials/foods/egg.png',
    title: 'Yai',
    description: const Paragraph(
      title: '',
      body:
          'Mayai ni miongoni mwa vyakula vyenye lishe  zaidi duniani. Yai zima lina virutubisho vyote vinavyohitajika ili kugeuza seli moja kuwa mtoto wa kuku. Yai moja kubwa lililochemshwa lina',
    ),
    facts: Column(children: [
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text:
                  'Vitamini A 6% ya RDA (Posho ya Kila Siku Inayopendekezwa) ',
              icon: 'assets/icons/vitamin-a.png'),
          CategoryButton(
              horizontal: true,
              text: 'Folate 5% ya RDA',
              icon: 'assets/icons/vitamins.png'),
        ],
      ),
      const SizedBox(
        height: 15,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: 'Vitamini B5 7% ya RDA',
              icon: 'assets/icons/vitamin_b5.png'),
          CategoryButton(
              horizontal: true,
              text: 'Vitamini B12 9% ya RDA',
              icon: 'assets/icons/vitamin_b5.png'),
        ],
      ),
      const SizedBox(
        height: 15,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: 'Vitamini B2 15% ya RDA',
              icon: 'assets/icons/vitamin_b2.png'),
          CategoryButton(
              horizontal: true,
              text: 'Fosforasi 9% ya RDA',
              icon: 'assets/icons/phosphorus.png'),
        ],
      ),
      const SizedBox(
        height: 15,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: 'Selenium 22% ya RDA',
              icon: 'assets/icons/selenium_icon.png'),
        ],
      )
    ]),
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: '',
            body:
                'Mayai pia yana kiasi cha kutosha cha vitamini D, vitamini E, vitamini K, vitamini B6, kalsiamu, na zinki. Hii inakuja na kalori 77, gramu 6 za protini, na gramu 5 za mafuta yenye afya. Mayai pia yana virutubisho mbalimbali ambavyo ni muhimu kwa afya Kwa kweli, mayai ni chakula bora kabisa. Zina kiasi kidogo cha karibu kila virutubishi unavyohitaji.'),
        SubTitleText(text: 'Eggs have more nutrients'),
        Paragraph(
            title: '',
            body:
                'Hiyo inamaanisha kuwa mayai yana virutubisho zaidi -- vitamini, madini, amino asidi -- kwa kalori kuliko vyakula vingine vingi. Kuwa na yai, na utapata yafuatayo:'),
        Bullet(children: [
          'Protini yenye ubora wa juu',
          'Selenium',
          'Fosforasi',
          'Choline',
          'Vitamini B12',
          'Antioxidants nyingi, ambayo husaidia kuweka seli zako zenye afya'
        ]),
        SubTitleText(text: 'Mayai husaidia macho yako'),
        Paragraph(
            title: '',
            body:
                'Madaktari wanajua kwamba lutein na zeaxanthin viondoa antioxidants husaidia kukuepusha na magonjwa ya macho kama vile mtoto wa jicho na kuzorota kwa macular yanayohusiana na umri. Mboga za kijani kibichi kama mchicha na korido unayo, pia. Lakini mayai ni chanzo bora. Hiyo ni kwa sababu mafuta yao hufanya iwe rahisi kwa mwili wako kutumia virutubisho.'),
        SubTitleText(text: 'Kula Mayai'),
        CourseBodyImage(image: 'assets/materials/foods/egg_boiled.png'),
        Paragraph(
            title: 'Saidia Kunoa Ubongo ',
            body:
                'Mayai yana vitamini D, ambayo ni nzuri kwa suala lako la kijivu na ni vigumu kupata kutoka kwa chakula. Na wana kitu kinachoitwa choline ambacho husaidia seli za neva (nyuroni) katika noggin yako kuzungumza na kila mmoja. Choline pia ni muhimu kwa wanawake wajawazito na wanaonyonyesha kwa sababu ya jukumu muhimu katika ukuaji wa ubongo.'),
        Paragraph(
            title: 'Chanzo cha protini na asidi ya amino ',
            body:
                'Kupata protini ya kutosha katika milo yetu ni njia muhimu ya kusaidia afya ya miili yetu. Kila yai lina takriban gramu sita za protini, pamoja na asidi ya amino muhimu. Kupata sehemu yetu ya protini kwa siku kunaweza kusaidia kudhibiti uzito, kuongeza misuli, kupunguza shinikizo la damu na kusaidia mifupa yetu, pia.'),
        CourseBodyImage(image: 'assets/materials/foods/egg_scrumbled.png'),
        Paragraph(
            title: 'Chanzo kizuri cha choline ',
            body:
                'Choline ni vitamini mumunyifu katika maji ambayo mara nyingi hujumuishwa na vitamini B. Inatumika kujenga utando wa seli na husaidia kutoa molekuli zinazoashiria kwenye ubongo. Yai moja la kuchemsha lina takriban 147 mg ya choline, ambayo ni 27% ya thamani ya kila siku iliyopendekezwa na Utawala wa Chakula na Dawa wa Marekani (FDA)'),
        Paragraph(
            title: 'Mayai yana virutubishi vingi ',
            body: 'Kiwango cha wastani cha mayai 2 kina:'),
        Bullet(children: [
          '82% ya mahitaji yako ya kila siku ya vitamini D',
          '50% ya mahitaji yako ya kila siku ya folate',
          '25% ya mahitaji yako ya kila siku ya riboflauini (Vitamini B2).',
          '40% ya mahitaji yako ya kila siku ya selenium',
        ]),
        SubTitleText(text: 'Ili kuandaa yai'),
        Bullet(children: [
          'Ongeza mafuta.',
          'Vunja yai kwa uangalifu',
          'Pika vizuri, kisha changanya na wali na uitumie'
        ])
      ],
    ));
