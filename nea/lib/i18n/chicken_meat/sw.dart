import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  coverImage: 'assets/materials/images/206.png',
  title: 'NYAMA YA KUKU',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/images/203.jpg'),

    SubTitleText(
      text: "Faida za Kiafya za Kula Nyama ya Kuku",
      fontSize: 27.0,
    ),
    Paragraph(
        title: "",
        body:
            "Faida za Kiafya za Kula Nyama ya Kuku"),
    // SubTitleText(text: ""),
    Paragraph(
        title: "Husaidia kujenga misuli ",
        body:
            "Kuku ni moja ya vyanzo bora vya protini visivyo vya mboga. Ni nyama konda, ambayo ina maana kwamba ina kiasi kikubwa cha protini na kiasi kidogo cha mafuta. Gramu 100 za kuku wa kukaanga hutoa 31g ya protini, na kuifanya kuwa nzuri kwa wale ambao wanataka kujilimbikiza na kujenga misuli."),
    Paragraph(
        title: "Huweka mifupa yako yenye afya ",
        body:
            "Mbali na protini, kuku ina madini mengi kama fosforasi na kalsiamu, ambayo husaidia kuweka mifupa katika hali ya mint. Pia, ina seleniamu inayojulikana kupunguza hatari ya ugonjwa wa arthritis."),
    Paragraph(
        title: "Huondoa msongo wa mawazo ",
        body:
            "Kuku ina virutubisho viwili ambavyo ni nzuri kwa kupunguza msongo wa mawazo: tryptophan na Vitamin B5. Wote wawili wana athari ya kutuliza mwili wako, na kufanya kuku chaguo bora baada ya siku ya shida. Pia, ina ladha nzuri na hiyo pia inaongeza sifa zake za kutoa mkazo, za kuleta furaha. Soma mwongozo wetu wa jinsi ya kukabiliana na mafadhaiko."),
    Paragraph(
        title: "Hupunguza dalili za ugonjwa wa kabla ya hedhi ",
        body:
            "Magnesiamu, kirutubisho katika kuku, husaidia kutuliza dalili za ugonjwa wa kabla ya hedhi na kupambana na mabadiliko mbalimbali ya hisia ambayo mwanamke anaweza kupata wakati wa siku zake. Hapa kuna vidokezo zaidi vya kushughulika na PMS."),
    Paragraph(
        title: "Husaidia kuongeza viwango vya testosterone ",
        body:
            "Wanaume wanapaswa kutumia vyakula vyenye zinki nyingi kwani husaidia kudhibiti viwango vya testosterone na kuongeza uzalishaji wa manii."),
    Paragraph(
        title: "Huongeza kinga ",
        body:
            "Supu ya kuku kwa muda mrefu imekuwa dawa ya nyumbani kwa kupunguza homa, mafua, na magonjwa mengine ya kawaida ya kupumua. Mvuke wa moto wa supu ya kuku husaidia kuondoa msongamano wa pua na koo huku umajimaji huo ukiwa unafunika koo ili kuzuia uvamizi wa kuta za upumuaji na vijidudu kusababisha maambukizi. Utafiti wa kutathmini athari hii ulipendekeza kuwa supu ya kuku huzuia uhamaji wa neutrophils, aina ya seli ya kinga, na hivyo kuzuia kuvimba wakati wa maambukizi ya kawaida na kuongeza kinga.."),
    Paragraph(
        title: "Inakuza afya ya moyo ",
        body:
            "Kuku, aliye na vitamini B6 kwa wingi, ni muhimu katika kuzuia mashambulizi ya moyo. Vitamini B6 husaidia kwa kupunguza viwango vya homocysteine, moja ya vipengele muhimu vinavyohusishwa na hatari ya kuongezeka kwa mashambulizi ya moyo. Mbali na hilo, kuku pia ni chanzo kizuri cha niasini ambayo husaidia kupunguza cholesterol, sababu ya hatari kwa maendeleo ya ugonjwa wa moyo. Jumuiya ya Moyo ya Marekani pia inapendekeza kuku juu ya nyama nyekundu kwa vile ina mafuta kidogo yaliyojaa na ni chanzo kizuri cha asidi ya mafuta ya omega-3 ambayo huonyesha madhara ya moyo na mishipa."),
    SubTitleText(
      text: "Maandalizi ya kuku - Njia ya joto kavu",
      fontSize: 27.0,
    ),
    Paragraph(
        title: "",
        body:
            "Ni njia ya kupikia bila kupata mvua katika mchakato wa joto. Viwango vya juu zaidi vya joto kuliko vinavyotumiwa katika mbinu za kupikia kwa joto unyevu hutumika katika kupikia kwa joto kikavu, jambo ambalo lina athari tofauti kwa thamani ya lishe ya chakula na mwonekano wa kimwili. Virutubisho vyote visivyo na joto, isipokuwa kwa vipengele vingi vya madini, vinaathiriwa kwa kiasi fulani na njia za joto kavu."),
    SubTitleText(text: "1. Kuchoma"),
    CourseBodyImage(image: 'assets/materials/images/206.png'),
    Paragraph(
        title: "",
        body:
            "Kuchoma ni kupika kwenye joto kavu kwa msaada wa mafuta au mafuta kwenye oveni au kwenye mate. Ni kupika nyama au mboga katika tanuri, na kuzichoma kwa mafuta ya moto ili kuzuia kukausha na kuendeleza rangi na ladha. Moto mkali ni njia ya kupikia wakati wa kutumia mate; kuchoma tanuri huchanganya convection na mionzi."),
    SubTitleText(text: "1.1 Kuchoma oveni"),
    Paragraph(
        title: "Kuchoma kwa Tanuri ",
        body:
            "ni kupikia katika tanuri kwa usaidizi wa mafuta na hutumiwa kwa nyama ya daraja la kwanza, kuku, na mboga fulani."),
    Remember(
      title: "KUMBUKA",
      children: [
        "Kuchoma kunamaanisha kupika vyakula kwa kuvizungushia hewa moto na kavu, kwa kawaida kwenye oveni."
      ],
    ),
    SubTitleText(text: "1.2 Kuchoma Mate"),
    Paragraph(
        title: "Kuchoma mate ",
        body:
            "ni kupika kwa joto la moja kwa moja (lililotolewa) kwa usaidizi wa mafuta kwa namna ya kuoka (mate lazima yanazunguka mara kwa mara). Inatumika kwa viungo vya ubora wa kwanza wa nyama na mchezo, na kuku. Ni aina ya asili ya kuchoma, lakini kwa sababu ya hasara nyingi katika mazoezi, kuchoma tanuri kumetokea mahali pake."),
    Remember(title: "KUMBUKA", children: [
      "Kupika bila kufunikwa ni muhimu kwa kuchoma. Kufunika hushikilia kwenye mvuke, kubadilisha mchakato kutoka kwa joto-kavu hadi kupikia unyevu-joto, kama vile kuoka au kuanika.",
      "Nyama kwa kawaida huchomwa kwenye rack (au ikiwa ni mbavu za kuchoma, kwenye safu yake ya asili ya mifupa). Rack huzuia nyama kutoka kwenye juisi na mafuta yake mwenyewe. Pia huruhusu hewa moto kuzunguka bidhaa.",
      "Wakati wa kuoka katika tanuri ya kawaida, mpishi anapaswa kuruhusu joto la kutofautiana kwa kubadilisha mara kwa mara nafasi ya bidhaa. Nyuma ya tanuri mara nyingi huwa moto zaidi kwa sababu joto hupotea kwenye mlango."
    ]),
    SubTitleText(text: "Madhara ya Kuchoma"),
    Paragraph(
        title: "",
        body:
            "Joto la awali la tanuri, hivyo kuifunga na kuzuia kutoroka kwa juisi nyingi za asili, hufunga protini ya uso wa chakula. Wakati chakula kikiwa na rangi ya hudhurungi, joto la tanuri hupunguzwa ili kupika ndani bila kuimarisha uso."),
    SubTitleText(text: "Faida ya Kuchoma"),
    Bullet(children: [
      "Viungo vya ubora vinavyofaa vya nyama vinaweza kupunguzwa, na ladha yao inaendelezwa vizuri.",
      "Uangalifu mdogo unahitajika wakati nyama inaoka, isipokuwa kupitisha pamoja.",
      "Juisi za nyama kutoka kwa pamoja hutumiwa kwa mchuzi na kuongeza ladha.",
      "Tanuri zilizo na milango ya uwazi huwezesha kupikia kuzingatiwa.",
      "Hatari ndogo ya Moto.",
      "Ustadi na mbinu zinaweza kuonyeshwa kwa mteja katika kuchoma mate.",
      "Mafuta na kazi zinaweza kuokolewa ikiwa vitu vingine vinaoka katika tanuri wakati huo huo.",
    ]),
    SubTitleText(text: "Udhibiti wa Wakati na Joto"),
    Bullet(children: [
      "Tanuri lazima ziwe moto",
      "joto la tanuri na mipangilio ya rafu katika mapishi lazima ifuatwe.",
      "Sura, ukubwa, aina, uwiano wa mfupa, na wingi wa chakula utaathiri wakati wa kupikia.",
      "Vipimajoto vya nyama vinaweza kuingizwa ili kuamua hali halisi ya joto katikati ya kiungo.",
    ]),
    SubTitleText(text: "Usalama"),
    Bullet(children: [
      "Tray za kuchomwa zinapaswa kufaa ikiwa ni ndogo sana; basting inakuwa ngumu na hatari; ikiwa ni kubwa sana, mafuta katika tray yatawaka, kuharibu ladha ya nyama na mchuzi.",
      "Shikilia trei za kuchoma moto kwa uangalifu kila wakati, ukitumia kitambaa kinene, kikavu.",
      "Hakikisha chakula kinashikiliwa kwa usalama kabla ya kukiondoa kwenye trei ya kuchomea."
    ]),
    SubTitleText(text: "2. Kukaanga"),
    CourseBodyImage(image: 'assets/materials/images/205.jpg'),
    Paragraph(
        title: "",
        body:
            "Kukaanga ni njia ya kupikia ya haraka, rahisi na maarufu inayohusisha halijoto ya juu. Mafuta au mafuta hutumiwa."),
    Paragraph(
        title: "Kuna aina mbili za kukaanga:-",
        body: "Kukaanga kwa kina na kukaanga kwa kina"),
    SubTitleText(text: "2.1 Kukaanga kwa kina"),
    Paragraph(
        title: "Kukaanga kwa kina ",
        body:
            "anapika chakula kwa kiasi kidogo cha mafuta yaliyopashwa moto kabla au mafuta kwenye sufuria yenye kina kifupi au kwenye sehemu tambarare (sahani ya kuokota)."),
    SubTitleText(
      text: "Mbinu za kukaanga kwa kina",
      fontSize: 16.0,
    ),
    Paragraph(
        body: "",
        title:
            "Kuna njia nne za kukaanga kwa kutumia kiasi kidogo cha mafuta au mafuta:"),
    Paragraph(
        title: "1. Kaanga kidogo:-",
        body:
            "Kupika chakula kwa kiasi kidogo cha mafuta au mafuta kwenye sufuria ya kukata. Upande wa uwasilishaji wa chakula unapaswa kukaanga kwanza kwani upande huu utakuwa na mwonekano mzuri zaidi kwa sababu mafuta ni safi, kisha igeuzwe ili pande zote mbili ziive na kupakwa rangi. Hii inatumika kwa vipande vidogo vya samaki, nyama, kuku, na samaki wadogo. Mayai, pancakes, na mboga fulani hupikwa kwa njia hii."),
    Paragraph(
        title: "2. Sauté:-",
        body:
            "Kupunguzwa kwa zabuni ya nyama na kuku hupikwa kwenye sufuria ya kukata au kukaranga. Baada ya chakula kupikwa kwa pande zote mbili, huondolewa kwenye sufuria, mafuta hutupwa, na sufuria hupunguzwa na hisa au vin. Hii basi hufanya sehemu muhimu ya mchuzi wa kumaliza."),
    Paragraph(
        title: "3. Gridi:-",
        body:
            "Vyakula vilivyopikwa kwenye grili (sahani imara ya chuma): hamburgers, soseji, au vitunguu vilivyokatwa huwekwa kwenye grili iliyotiwa mafuta kidogo na kugeuzwa mara kwa mara wakati wa kupikia.,"),
    Paragraph(
        title: "KOROGA KUKAANGA:-",
        body:
            "Mboga, vipande vya nyama ya ng'ombe, kuku, nk, zinaweza kukaanga haraka kwenye sufuria ya kukaanga kwenye mafuta kidogo au mafuta."),
    SubTitleText(text: "2.2 Kukaanga kwa kina"),
    Paragraph(
        title: "",
        body:
            "Hii ni kupikia ya chakula katika mafuta ya kina ya preheated au mafuta ya wazi. Inahusisha kuzamishwa kwa chakula kwenye sufuria ya mafuta ya moto ili chakula kifunikwe na mafuta wakati wa kukaanga.."),
    SubTitleText(
      text: "Kuandaa chakula kwa kukaanga kwa kina",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Vyakula vya kukaanga, kwa mfano, samaki, nyama na matunda, lazima kwanza vipakwe ili kuzuia kuiva, kupoteza juisi kutoka kwa chakula na kunyonya mafuta mengi.."),
    Paragraph(title: "Mipako ya kinga inayofaa ni pamoja na:-", body: ""),
    Bullet(children: [
      "Yai iliyopigwa na mikate ya mkate",
      "Unga uliokolea na Yai iliyopigwa",
      "Unga, yai iliyopigwa, mkate wa mkate",
      "Mayai, unga, na unga wa maziwa",
    ]),
    Paragraph(
        title: "",
        body:
            "Wakati chakula kinapowekwa kwenye mafuta ya moto, yai katika mipako huganda haraka na hivyo kuunda. safu ya kinga karibu na chakula, ambayo inakuwa crisp na dhahabu kahawia. Chakula cha ndani kinaendelea kupikwa kwa kupikwa na huhifadhi ladha na muundo wake."),
    Paragraph(
        title: "",
        body:
            "Mafuta haipaswi kuwashwa zaidi ya joto linalohitajika, kwani mtengano wa molekuli za mafuta hutokea kwa joto la juu, na hii inasababisha kutolewa kwa asidi ya mafuta ya bure, ambayo huathiri sifa za kuhifadhi na ladha ya mafuta.."),
    SubTitleText(
      text: "Njia za kukaanga kwa kina",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "1. Kawaida ya kukaanga ",
        body:
            "vyakula, isipokuwa viazi, hupakwa maziwa na unga, yai na makombo, unga au keki.:"),
    Bullet(children: [
      "Kinga uso wa chakula kutokana na joto kali.",
      "Kuzuia kutoroka kwa unyevu na virutubisho.",
      "Kurekebisha kupenya kwa kasi kwa joto kali.",
    ]),
    Paragraph(
        title: "",
        body:
            "Chakula huwekwa kwa uangalifu ndani ya mafuta au mafuta yaliyopashwa moto sana, kukaanga hadi kupikwa na kuwa na rangi ya dhahabu, iliyochujwa vizuri na kutumiwa.."),
    Paragraph(
        title: "2. Sehemu ya kukaanga kwa kina. ",
        body:
            "Inajulikana kama blanching na inaweza kutumika kwa viazi zilizokatwa. Kusudi ni kupika kabla ya huduma na kukamilisha kupikia ili kuagiza sehemu."),
    SubTitleText(
      text: "Madhara ya kukaanga kwa kina",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Madhara ya kukaanga kwa kina kwenye vitu vilivyopakwa ni kwamba uso hutiwa muhuri kwa kuganda kwa protini na kunyonya kwa kiwango cha chini cha mafuta na kubakisha virutubishi na ladha ya chakula. Lakini kwa vitu visivyofunikwa, chakula kinachukua kiasi kikubwa cha mafuta, hivyo huathiri texture na maudhui ya lishe."),
    Remember(title: "General Rules", children: [
      "Kamwe usijaze vikaango kwa mafuta au mafuta au chakula cha kupikwa.",
      "Joto la kawaida la kukaanga ni kati ya 175 0 C na 195 0 C; hii inaonyeshwa na haze kidogo ya joto inayoongezeka kutoka kwa mafuta.",
      "Usijaribu kukaanga chakula kingi kwa wakati mmoja.",
      "Ruhusu mafuta kurejesha joto lake kabla ya kuongeza kundi linalofuata la chakula.",
      "Hakikisha uwiano sahihi wa mafuta/mafuta kwa chakula. Ikiwa chakula kingi kinapikwa kwa mafuta kidogo sana, hata ikiwa joto la awali la mafuta ni sahihi, athari ya kiasi kikubwa cha chakula itapunguza joto kwa kiasi kikubwa na kuharibu chakula..",
      "Punguza muda wa kushikilia kwa kiwango cha chini cha kukaanga; vyakula hivi karibuni kupoteza crispness yao.",
      "Mafuta na mafuta yanapaswa kuchujwa baada ya matumizi. Vinginevyo, chembe zilizobaki za chakula zitawaka mafuta yanapochomwa, hivyo kuharibu mwonekano na ladha ya chakula..",
      "Daima funika mafuta au mafuta wakati haitumiki ili kuzuia oxidation."
    ])
  ]),
);
