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
  title: "KWANINI LISHE NI MUHIMU",
  coverImage: "assets/materials/images/imag_4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(
          title: "MALENGO",
          children: ['Kuelewa kwa nini lishe bora ni muhimu']),
      CourseBodyImage(image: "assets/materials/images/imag_4.png"),
      KeyMessages(children: [
        'Lishe bora ni muhimu katika hatua zote za maisha.',
        'Miili yetu inahitaji chakula cha kutosha ili kutupa nguvu, kutuwezesha kukua, kujifunza, kufanya kazi na kuwa na afya njema.',
        'Afya na lishe vina uhusiano wa karibu - mtu lazima apate lishe bora ili kuwa na afya njema, wakati afya mbaya inaweza kuathiri hali ya lishe.',
        'Mwanamke mwenye lishe duni anapokuwa mjamzito kuna uwezekano wa kuzaa mtoto mwenye uzito pungufu/asiyekuwa na ulemavu ambaye atakuwa na mwanzo mbaya maishani na uwezekano wa kuwa na mtoto pungufu yeye mwenyewe.',
        'Kijusi na watoto walio chini ya umri wa miaka miwili wana mahitaji makubwa ya virutubishi kwa sababu miili yao inakua na kubadilika haraka, hata kabla ya kuzaliwa.',
        'Kanuni tatu kuu za lishe bora ni: \n\nMlo wa kutosha - kula vyakula vinavyofaa vya kutosha.\n\nKutokuwepo kwa ugonjwa - kuwa na afya njema.\n\nMatendo yanayofaa ya utunzaji - utunzaji mzuri, kupumzika, usafi, na kusisimua na mazingira ya upendo kwa watoto wadogo na familia nzima.',
      ]),
      Remember(children: ['Familia inahitaji chakula cha usawa kila siku']),
      CourseBodyImage(
        image: 'assets/materials/images/imag_4.png',
        description:
            "Mwanamke mjamzito mwenye lishe duni ana uwezekano wa kuzaa mtoto mwenye uzito pungufu ambaye atakua kama kijana dhaifu na anayeelekea kuzaa mtoto mwenye uzito pungufu katika siku zijazo.",
      ),
      CourseBodyImage(
        image: 'assets/materials/images/img_5.png',
        description:
            "Mwanamke mjamzito mwenye lishe bora atazaa mtoto mwenye afya njema ambaye hukua akiwa kijana mwenye afya njema na anayeelekea kuzaa mtoto mwenye afya katika siku zijazo.",
      ),
      //
      // Causes of malnutrition
      //
      SubTitleText(
        text: 'Utapiamlo',
        fontSize: 27.0,
      ),
      Paragraph(
          title: "Utapiamlo ",
          body: "ni neno linalojumuisha utapiamlo na utapiamlo. "),
      Objectives(
          title: "LENGO", children: ['Jua kuhusu utapiamlo na sababu zake']),
      KeyMessages(children: [
        Paragraph(
            title: "",
            body:
                "Utapiamlo unarejelea upungufu, kupita kiasi au usawa katika ulaji wa mtu wa virutubisho."),
        'Sababu za utapiamlo ni tofauti, zilizounganishwa na ngumu:',
        Bullet(children: [
          'Sababu za haraka (mlo usiofaa - wingi na ubora, magonjwa)',
          'Sababu za msingi (uhaba wa chakula, utunzaji duni wa mama na mtoto, na utunzaji duni wa afya na mazingira yasiyofaa)'
        ]),
        'Mtu asiyekula chakula cha aina mbalimbali anaweza kukosa vitamini na madini fulani (micronutrients). Hii inaweza kuathiri afya katika hatua zote za maisha na kuzuia ukuaji na ukuaji wa watoto. Virutubisho vidogo vya umuhimu kwa afya ya umma ni chuma, vitamini A na iodini, ambayo ukosefu wake huathiri afya na ukuaji. Mlo mbalimbali au kuchukua virutubisho maalum kunaweza kuhakikisha watu wanapata micronutrients wanayohitaji.'
      ]),
      CourseBodyImage(
        image: 'assets/materials/images/8.png',
        description: 'Upatikanaji duni wa chakula',
      ),
      CourseBodyImage(
        image: 'assets/materials/images/9.png',
        description: 'Upatikanaji wa chakula cha kutosha',
      ),
      Remember(children: ['Kula vyakula mbalimbali kila siku']),

      SubTitleText(text: "Aina za utapiamlo"),
      Paragraph(
          title: "Lishe kupita kiasi ",
          body:
              "hutokana na ulaji mwingi wa virutubishi unaohusiana na mahitaji ya virutubisho kulingana na umri, jinsia, shughuli za kimwili, urefu, uzito, na hali ya afya ya mtu binafsi. Hili bado ni nadra nchini Ethiopia, lakini linazidi kuwa la kawaida katika idadi ya watu wanaokabiliwa na vyakula vyenye nishati ambayo mara nyingi huishi katika maeneo ya mijini. Madhara ya lishe kupita kiasi ni pamoja na kuongezeka kwa hatari ya maisha yote ya magonjwa sugu, pamoja na ugonjwa wa sukari, ugonjwa wa moyo na mishipa, unene kupita kiasi, na saratani. "),
      CourseBodyImage(
        image: 'assets/materials/images/c_4.png',
        description: "Mtoto wa Juu ni Mzito",
      ),
      Paragraph(
          title: "Utapiamlo ",
          body:
              "ni, kwa ujumla, matokeo ya kiasi cha kutosha na ubora wa chakula na matukio ya mara kwa mara ya magonjwa ya kuambukiza."),
      Paragraph(
          title: "",
          body:
              "Utapiamlo hufafanua hali mbalimbali, ikiwa ni pamoja na kuwa na uzito mdogo, mfupi, mwembamba, na upungufu wa vitamini na madini. Mtoto hufafanuliwa kuwa mwenye lishe duni ikiwa ni mwembamba sana au mfupi sana kuliko wastani wa umri wake. Viashiria vinavyotumika sana vya lishe duni ni: "),
      SubTitleText(
        text: "Uzito mdogo",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Uzito mdogo ",
          body:
              "kiashiria kinachotathmini utoshelevu wa uzito kwa umri. Sababu inaweza kuwa ya muda mfupi au ya muda mrefu na ni vigumu kufafanua. "),
      SubTitleText(
        text: "Kupoteza",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Kupoteza ",
          body:
              "kawaida matokeo ya ulaji wa papo hapo au wa muda mfupi wa kutosha wa chakula, mara nyingi pamoja na ugonjwa wa mara kwa mara. Matokeo katika mtoto mwembamba hatari (yaani, wana uzito mdogo sana kwa urefu wao). "),
      CourseBodyImage(
        image: 'assets/materials/images/c_1.png',
        description: "Mtoto Hapo Juu Amepungua na Ana Uzito Mdogo",
      ),
      SubTitleText(
        text: "Kudumaa",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Kudumaa ",
          body:
              "kawaida ni kiashirio cha upungufu wa muda mrefu au wa muda mrefu wa nishati ya kutosha au ulaji wa virutubishi vidogo, ingawa ina sababu nyingi zisizo za lishe kama vile uvamizi wa helminth na maambukizi ya mara kwa mara au sugu. Matokeo katika mtoto mfupi sana (yaani, wana urefu mfupi sana kwa umri wao)."),
      CourseBodyImage(
        image: 'assets/materials/images/c_2.png',
        description: "Mtoto wa Juu amedumaa na ana uzito mdogo",
      ),
      CourseBodyImage(
        image: 'assets/materials/images/c_3.png',
        description: "Mtoto wa Juu ni wa Kawaida",
      ),

      SubTitleText(
        text: "Mtoto wa Juu ni wa Kawaida",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Upungufu wa vitamini na madini",
          body:
              "matokeo ya lishe duni. Upungufu wa virutubishi unaweza pia kutokana na ugonjwa wa mara kwa mara, ambayo inaweza kuongeza mahitaji, matumizi, au kupoteza virutubisho. "),
      Paragraph(
          title: "KUMBUKA: ",
          body: "Watoto hawa wote wanaweza pia kuwa na upungufu wa virutubishi")
    ],
  ),
);
