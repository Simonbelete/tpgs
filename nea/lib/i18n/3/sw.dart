import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course SW = Course(
  title: "LISHE YA MAMA",
  coverImage: "assets/materials/images/13.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      SubTitleText(text: "Lishe ya mama wakati wa ujauzito na lactation"),
      Objectives(children: [
        'Onyesha mahitaji ya kimsingi ya lishe kwa wajawazito na mama wanaonyonyesha'
      ]),
      CourseBodyImage(image: "assets/materials/images/13.png"),
      KeyMessages(children: [
        "Kula mlo mmoja wa ziada au vitafunio kila siku pamoja na milo mitatu ili kutoa nishati na lishe kwako na kwa mtoto anayekua.",
        "Kula mlo wa aina mbalimbali ili kuhakikisha aina mbalimbali za chaguzi za chakula kwa kutumia vyakula vinavyopatikana nchini. Chagua vyakula kutoka kwa angalau vikundi 5 vya chakula katika kila mlo.",
        "Kula vyakula vyenye vitamini A kwa wingi na madini ya chuma kama vile maharagwe, nyama, samaki, mayai, nyanya, malenge na mboga za majani. Vyakula vyenye madini ya chuma husaidia kuzuia upungufu wa damu; Vyakula vyenye vitamini A huongeza kinga yako",
        "Kula chakula kidogo mara kwa mara na maji mengi na maji yaliyotibiwa",
        "Lishe duni ya uzazi inaweza kuongeza uwezekano wa mtoto wako kuzaliwa kabla ya wakati, akiwa mdogo sana, au akiwa na kasoro za kiakili na za mwili.",
        "Epuka kunywa chai au kahawa pamoja na milo kwani huzuia ufyonzaji wa madini ya chuma na inaweza kuathiri matumizi ya mwili ya vyakula hivyo.",
        "Tumia chumvi ya iodized tu. Iodini husaidia ubongo na mwili wa mtoto wako kukua vizuri.",
        "Shiriki katika kazi nyepesi za nyumbani.",
        "Mazoezi huweka mwili wako imara na wenye afya.",
        "Muulize mume akusaidie kazi za nyumbani."
      ]),
      SubTitleText(text: "Mimba na Kunyonyesha"),
      Bullet(children: [
        "Lishe ya mwanamke mjamzito na anayenyonyesha inapaswa kujumuisha ongezeko kubwa la kalori, protini, kalsiamu, asidi ya folic na chuma.",
        "Wanawake wajawazito walio katika hatari kubwa ya kupata upungufu wa lishe ni vijana, wanawake wenye uzito mdogo, wanawake wanene, wanawake wenye matatizo ya mara kwa mara ya lishe, wanawake wanaovuta sigara au kumeza pombe au dawa za kulevya, wanawake wa kipato cha chini na ",
        "wanawake wenye magonjwa sugu kama vile kisukari au upungufu wa damu"
      ]),
      SubTitleText(text: "Mapendekezo kwa mama wakati wa ujauzito"),
      Bullet(children: [
        "Kuongezeka kwa uzito wakati wa ujauzito ni muhimu.",
        "Wazuie sana wateja walio na unene kupita kiasi wasijaribu kupunguza uzito wakati wa ujauzito.",
        "Wahimize wateja kupanga milo kwa uangalifu ili virutubishi vyote vinavyohitajika wakati wa ujauzito viweze kujumuishwa bila kalori nyingi. Kutumia mwongozo wa chakula kwa ujauzito ni muhimu.",
        "Ulaji wa kafeini unapaswa kuwa mdogo.",
        "Mwagize mteja kuchukua vitamini na madini tu zilizoagizwa. Kiasi kikubwa kinaweza kuwa na madhara",
        "Washauri wateja kwamba kuruka milo ni tabia mbaya, hasa kwa wajawazito. Mtoto mchanga anahitaji ugavi wa kutosha wa virutubisho.",
        "Mhimize mama mjamzito kutumia vyakula vyenye nyuzinyuzi nyingi na maji mengi ili kuepuka kuvimbiwa.",
        "Toa kipaumbele katika kuwasaidia vijana wajawazito kuboresha tabia zao za ulaji. Pamoja na vijana, panga chakula na vitafunio vyenye lishe na, wakati huo huo, kukubalika kwa vijana. Mimba ya ujana haifai.",
        "Tumia fursa ya motisha ya juu ya mteja wakati wa ujauzito kutoa elimu ya lishe kwa familia na mjamzito. "
      ])
    ],
  ),
);
