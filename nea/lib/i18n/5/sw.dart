import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  title: "USAFI NA USAFI",
  coverImage: "assets/materials/images/sanittion_image.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: "MALENGO", children: ["Kunywa matibabu na kuhifadhi"]),
      CourseBodyImage(image: "assets/materials/images/21.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Maji yanayochukuliwa kutoka kwa chanzo salama cha maji yanaweza kuchafuliwa wakati wa kukusanya, kusafirisha, kushughulikia na kuhifadhi. Kunywa maji machafu ni moja ya sababu za ugonjwa na ugonjwa wa kuhara.",
        Paragraph(
            title: "Maji ya kunywa yanaweza kuwa disinfected na:", body: ""),
        "Kuichemsha au kutibu kwa klorini ili kuifanya iwe salama kwa kunywa.",
        "Ikiwa yanachemka, chemsha maji yako kwa angalau dakika 1.",
        "Ili kutibu maji yako kwa klorini, tumia mojawapo ya bidhaa za matibabu zinazopatikana ndani kama vile waterguard na ufuate maagizo.",
        "Tumia chombo salama cha kuhifadhi wakati wa kukusanya maji. Usitumie majani au vifaa vingine kufunika chombo kwani vinaweza kuchafua maji.",
        "ukichota maji kutoka kwenye chombo cha kuhifadhia, tumia dumu la kubeba kwa muda mrefu ili mikono isiguse maji."
      ]),
      SubTitleText(text: "Usalama wa chakula"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Hatua za usalama wa chakula katika uzalishaji wa kilimo Vyanzo vya vimelea vya magonjwa kwenye mazao mapya",
        "Maji ya umwagiliaji yaliyochafuliwa",
        "Mbolea mbichi au isiyo na mboji/nyenzo za kinyesi",
        "Wanyama wa porini au wa nyumbani",
        "Kushughulikiwa na wafanyikazi walioambukizwa"
      ]),
      SubTitleText(text: "WAKATI WA UZALISHAJI"),
      Bullet(children: [
        "Mfumo mzuri wa uzalishaji wa chakula wenye afya",
        "Chakula cha afya na salama zaidi",
        "Masharti sahihi",
        "Tumia tu samadi (iwe kutoka kwa wanyama au watu) iliyotundikwa/kukomaa",
        "Hakikisha kuwa wanyama wana mazingira safi yenye afya",
        "Suala lingine la usalama wa chakula ni sumu (sumu) kama vile AFL atoxin, inayozalishwa na fangasi katika mazingira asilia.",
        "Uzalishaji duni, uvunaji na uhifadhi huchangia upotevu wa chakula",
      ]),
      SubTitleText(text: "WAKATI WA KUVUNA"),
      Bullet(children: [
        "Vuna vyakula vya mmea katika kilele chao kwa ubora bora",
        "Vyakula vilivyovunwa mapema sana au vilivyochelewa huharibika haraka",
        "Vyakula vingi vina ladha nzuri zaidi vinapokomaa ipasavyo",
      ]),
      SubTitleText(text: "WAKATI WA UCHAKATO"),
      Bullet(children: [
        "Weka wanyama na wadudu mbali na eneo la kusindika chakula",
        "Nafaka, kunde, karanga na mbegu za mafuta zinahitaji kukaushwa vizuri na kwa kawaida huhitaji maganda yao kuondolewa.",
        "Mizizi, mboga mboga, matunda na kama nazi na parachichi vinapaswa kusafishwa kwanza kabisa",
        "OSHA (Maji, Usafi na Usafi) ni muhimu sana kwa mboga mboga na matunda. Ni bora kusindika hizi ndani kwani zinavutia wadudu. Jinsi chakula kinavyokuwa kitamu ndivyo kitakavyovutia wadudu wakati wa kukikata (maboga, nyanya, ndizi, mipapai n.k.). Vyakula vya wanyama vinahitaji utunzaji kwani vijidudu vinaweza kustawi katika bidhaa hizi.",
      ]),
      SubTitleText(text: "WAKATI WA KUPIKA"),
      Bullet(children: [
        "Maji, Usafi wa Mazingira na Afya, na fanya tabia nzuri na safi.",
        "Anza na vyakula salama na vyenye afya.",
        "Mazingira safi ya maandalizi: Jikoni na sehemu za kulia chakula.",
        "Mikono safi, na nguo zao.",
        "Kunawa mikono kwa sabuni na maji safi kunapaswa kufanywa mara kwa mara.",
        "Mikono na vyombo vinavyokausha hewa badala yake.",
        "Taulo za jikoni zisipotunzwa vizuri zinaweza kuchafuliwa, mikono na vyombo vilivyokaushwa kwa hewa badala ya kutumia taulo zilizochafuliwa. Tumia taulo safi tu kwa kusafisha.",
        "Weka chakula kikiwa moto (au baridi, kulingana na kichocheo) hadi kiwe kwenye sahani kupika na kuandaa chakula ili kuendana na nyakati za chakula.",
      ]),
      SubTitleText(text: "KUTUMIA VIZURI VILIVYOACHA"),
      Bullet(children: [
        "Epuka mabaki kwa kuandaa tu kiasi cha chakula unachohitaji",
        "Mabaki yanapaswa kufuatiliwa ipasavyo",
        "Mabaki yanapaswa kuhifadhiwa kwa baridi au baridi",
        "Epuka kupokanzwa mara kwa mara na baridi ya chakula sawa",
      ]),
      SubTitleText(
        text: "Kunawa mikono wakati muhimu",
        fontSize: 27.0,
      ),
      CourseBodyImage(image: "assets/materials/images/img_12.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Nawa mikono kwa maji yanayotiririka na sabuni.",
        "Kunawa mikono ni muhimu mara hizi 4",
        Bullet(children: [
          "Kabla ya kuandaa chakula kwa mtoto",
          "Baada ya kutumia choo",
          "Kabla ya kulisha mtoto au kula",
          "Baada ya kubadilisha nepi ya mtoto na kutupa kinyesi chake vizuri kwenye choo cha shimo.",
        ]),
        "Osha kabisa mikono na mikono ya mtoto wako kabla ya kula—kabla ya kuandaa chakula, kabla ya kulisha mtoto wako, na kabla ya kula. Watoto wadogo wanaweza kupata uchafu sana wakichunguza mazingira yao. Kuna vijidudu vingi chini ambavyo vinaweza kuwafanya wagonjwa.",
        "Wafundishe watoto kunawa mikono.",
        "Kuwa na kituo cha kunawia mikono ambacho kina sabuni karibu na choo kwa matumizi ya haraka baada ya kutembelea choo. Bomba au beseni na jagi iliyo na maji iliyotengenezwa ndani ya nchi inaweza kutumika."
      ]),
      SubTitleText(
        text: "HATUA ZA KUNAWA MIKONO KAMILI",
        fontSize: 16.0,
      ),
      CourseBodyImage(
        image: "assets/materials/images/hand_washing_steps.png",
        description:
            "Osha mikono yako na maji ya joto yanafaa kwa kunywa. Kausha mikono yako hewani au kwenye kitambaa kisafi na chenye usafi",
      ),
      SubTitleText(
        text: "Jinsi ya kutengeneza tippy bomba",
        fontSize: 27.0,
      ),
      Objectives(title: "MALENGO", children: [
        "Shiriki ujuzi wa jinsi ya kufanya kituo cha kunawa mikono kuwa rahisi kutumia"
      ]),
      CourseBodyImage(image: "assets/materials/images/22.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Bomba la Tippy hutumiwa kwa madhumuni ya kunawa mikono kwa kutumia maji ya bomba na sabuni.",
        "Jenga bomba la Tippy karibu na jikoni, na choo.",
        "Ni muhimu kuwa na bomba la Tippy karibu na Jiko na choo kwani itakuwa rahisi kwa watu katika kaya kunawa mikono kwa sabuni wakati wa hatari.",
        "Tengeneza kidonge kwa kutumia nyenzo rahisi zinazopatikana katika eneo lako.",
        "Vifaa hivi ni jembe, vijiti 2 vyenye umbo la V kwa juu, vijiti 2 vya kushikia mkebe, na vya kukanyaga, misumari..",
      ]),
      SubTitleText(
        text: "Kuwaweka watoto mbali na kinyesi",
        fontSize: 27.0,
      ),
      Objectives(
          title: "MALENGO",
          children: ["Imarisha uelewa wa uhusiano kati ya ukuaji na usafi"]),
      CourseBodyImage(image: "assets/materials/images/23.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Usijisaidie au kutupa kinyesi msituni, hii itapitishwa kwa urahisi kwenye maji au mikono kwa kugusa nyasi zilizochafuliwa msituni.",
        "Kumbuka kujenga choo cha kudumu katika kaya yako.",
        "Daima tumia choo cha shimo au choo cha kutolea maji ili kujisaidia au kukojoa.",
        "Nawa mikono yako vizuri kwa maji na sabuni kila mara baada ya kutoka chooni.",
        "Tumia choo kila wakati ili kuzuia kinyesi na vijidudu vinavyohusishwa na kuenea.",
      ]),
      SubTitleText(
        text: "Kulinda eneo la kucheza la mtoto (matumizi ya mkeka)",
        fontSize: 27.0,
      ),
      Objectives(
          title: "MALENGO",
          children: ["Imarisha uelewa wa uhusiano kati ya ukuaji na usafi"]),
      CourseBodyImage(image: "assets/materials/images/24.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Walinde watoto wako dhidi ya kula vitu vichafu kutoka ardhini ili kuwaepusha na magonjwa ya kuhara, homa na kutapika.",
        "Wazazi/walezi wanaposhughulika kufanya kazi nyingine bustanini au kutunza kuku hakikisha unamwacha mtoto wako mahali pasafi hasa kwenye mkeka au kitambaa safi.",
        "Unapotumia mkeka hakikisha unakunja jukumu kwa nje, hii ni kuhakikisha ndani hachafuki..",
        "Mpe mtoto wako vitu vya kuchezea ili kuepuka kuokota vitu vichafu kutoka ardhini, kama vile kinyesi cha kuku na wanyama wengine.",
        "Hakikisha mtoto wako anacheza kwenye uso safi.",
      ]),
      SubTitleText(
        text: "Kulinda eneo la kuchezea la mtoto (kuvunja njia ya kinyesi)",
        fontSize: 27.0,
      ),
      Objectives(
          title: "MALENGO",
          children: ["Imarisha uelewa wa uhusiano kati ya ukuaji na usafi"]),
      CourseBodyImage(image: "assets/materials/images/25.png"),
      KeyMessages(title: "Ujumbe Muhimu", children: [
        "Tupa uchafu wote wa watoto kwenye choo.",
        "Ikiwa mtoto wako ana umri wa kutosha, wacha atumie sufuria (iliyonunuliwa/kutengenezwa) na kuitupa chooni. Kinyesi cha watoto wadogo ni hatari kama kinyesi cha watu wazima.",
        "Tumia choo cha usafi, na uwafundishe watoto wako jinsi ya kukitumia. Kutumia kituo kilichoboreshwa cha usafi wa mazingira husaidia kuzuia kuenea kwa magonjwa kwa kuzuia taka zisigusane na vyanzo vya maji, maeneo ya wazi, na nzi.",
        "Weka choo chako kikiwa safi ili kulinda mazingira yako, maji yanayozunguka nyumba yako, na mashamba yako. Hakikisha kwamba njia ya kwenda chooni iko wazi",
        "Mpe mtoto wako vinyago safi ili kuepuka kuokota vitu vichafu kutoka ardhini, kama vile kinyesi cha kuku na wanyama wengine.",
        "Weka kinyesi cha kuku mbali na watoto. 'Nafasi ya kucheza ya ulinzi' huwaweka watoto mbali na kinyesi cha wanyama na vitu vingine vichafu vilivyo chini.",
        "Hakikisha mtoto wako anacheza kwenye uso safi.",
      ])
    ],
  ),
);
