import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  title: "የግልና የአካባቢ ንጽህና",
  coverImage: "assets/materials/images/sanittion_image.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: "ዓላማ፡ ", children: ["ዓላማ፡ የመጠጥ ውሃ አያያዝ እና እንክብካቤ"]),
      CourseBodyImage(image: "assets/materials/images/21.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ከአስተማማኝ የውኃ ምንጭ የተገኘ ውሃ በሚቀዳበት፣ በሚጓጓዝበት፣ እና በሚከማቸበት ጊዜ ሊበከል ይችላል። የተበከለ ውሃ መጠጣት ለበሽታ እና ለተቅማጥ በሽታ መንስኤ ሊሆን ይችላል፡፡",
        Paragraph(title: "የመጠጥ ዉሃን በሚከተሉት ሁኔታ ከብክለት መከላከል ይቻላል፡፡", body: ""),
        "ለመጠጥ ደህንነቱ የተጠበቀ እንዲሆን ማፍላት ወይም በክሎሪን ማከም።",
        "የሚፈላ ከሆነ ቢያንስ ለተፈቀደው ደቂቃ ውሃዎን ወደ ሙሉ በሙሉ ያፍሉ።",
        "ውሃዎን በክሎሪን ለማከም፣ በአካባቢው ከሚገኙ ህክምናዎች አንዱን ይጠቀሙ፡፡",
        "የውሃ ማከሚያ ምርቶች ለመጠቀም መመሪያዎችን ይከተሉ፡፡",
        "ውሃ በሚቀዱበት ጊዜ ደህንነቱ የተጠበቀ ማጠራቀሚያ ይጠቀሙ።",
        "ውሃ ከማጠራቀሚያ ዕቃ ውስጥ ሲቀዱ ረጅም እጀታ ያለው ማንጠልጠያ ይጠቀሙ እጅን ከውኃ ጋር አይገናኙ፡፡",
      ]),
      SubTitleText(text: "የምግብ ደህንነት"),
      SubTitleText(text: "ምርት በሚመረትበት ወቅት"),
      Bullet(children: [
        "በሚገባ የተነደፈና ጤናማ የሰብል አመራረት ሥርዓት መከተል፡፡",
        "በጣም ጤናማ እና ደህንነቱ የተጠበቀ ሰብል ማዘጋጀት፡፡",
        "አፈሩን ለማዳበር የደረቀና የቆየ ፍግ ጠቀም፡፡",
        "ለሰብል ማምረት የምንጠቀምባቸውን እንስሳት ጤናማና ንፁህ አካባቢ እንዳላቸው ማረጋግጥ፡፡",
        "እንደ አፍል አቶክሲን ያሉ መርዞች እንዳይፈጠሩ መከላከል።",
      ]),
      SubTitleText(text: "ምርት በሚሰበሰብበት ወቅት"),
      Bullet(children: [
        "የእጽዋት ምግቦችን በከፍተኛ ደረጃና ጥራት መሰብሰብ፡፡",
        "የተሰበሰቡ ሰብሎች እንዳይበላሹ ጥንቅቄ ማድረግ።"
      ]),
      SubTitleText(text: "ምግብ በሚበሰልበት ጊዜ"),
      Bullet(children: [
        "ደህንነቱ በተጠበቀ ጤናማ ምግቦች ይጀምሩ።",
        "ንጹህ የዝግጅት አካባቢ፡ ወጥ ቤት እና የመመገቢያ ስፍራ ያዘጋጁ።",
        "የእጅን እና ልብስዎ ንጽህና ለመጠበቅ በሳሙና እና በንጹህ ውሃ ይታጠቡ ።",
        "የወጥ ቤት ፎጣዎች እንዳይበከሉ ጥንቃቄ ያድርጉ፡፡",
        "የተበከሉ ሳህኖችን ለማድረቅና ለማጽዳት ንጹህ ፎጣዎችን ብቻ ይጠቀሙ፡፡",
        "ምግብ እስኪቀርብ ድረስ ማቀዝቀዣ ውስጥ ያስቀምጡ፡፡",
      ]),
      SubTitleText(
        text: "በአስፈላጊ ጊዜ እጅን መታጠብ",
        fontSize: 27.0,
      ),
      CourseBodyImage(image: "assets/materials/images/img_12.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "በፈሳሽ ውሃ እና ሳሙና በመጠቀም እጅዎን ይታጠቡ።",
        "በእነዚህን 4 ጊዜ እጅ መታጠብ በጣም አስፈላጊ ነው።",
        Bullet(children: [
          "ለህፃኑ ምግብ ከማዘጋጀት በፊት",
          "ሽንት ቤት ከተጠቀሙ በኋላ",
          "ህፃኑን ከመመገብዎ በፊት",
          "የሕፃኑን ዳይፐር ከቀየሩ እና ሰገራውን ጉድጓድ ውስጥ በትክክል ካስወገዱ በኋላ፡፡",
        ]),
      ]),
      SubTitleText(
        text: "ከታች በምስል የምታዩት የእጅ አስተጣጠብ ሂደትን ነው፡፡",
        fontSize: 16.0,
      ),
      CourseBodyImage(
        image: "assets/materials/images/hand_washing_steps.png",
        description:
            "ለመጠጥ በሆነ ሙቅ ውሃ እጅዎን የታጠቡ። እጆችዎን በአየር ወይም በንጹህ ጨርቅ ላይ ያድርቁ",
      ),
      SubTitleText(
        text: "ነጠብጣብ እንዴት እንሰራለን",
        fontSize: 27.0,
      ),
      // Objectives(title: "ዓላማ፡ ", children: [
      //   "Share skills on how to make an easy to use handwashing station"
      // ]),
      CourseBodyImage(image: "assets/materials/images/22.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "የነጠብጣብ ቧንቧን በአካባቢዎ ከሚገኙ ቀላል ቁሳቁሶችን በመጠቀም መስራት ይቻላል።",
        "የነጠብጣብ ቧንቧ የሚፈስ ውሃን በመጠቀም እጅን ለመታጠብ ዓላማ ይጠቅማል፡፡",
        "የነጠብጣብ ቧንቧ ከኩሽና እና ከመጸዳጃ ቤት አጠገብ ይገንቡ።",
        "የነጠብጣብ ቧንቧ በቤት ውስጥ ያሉ ሰዎች በአስቸጋሪ ጊዜ እጃቸውን በሳሙና እንዲታጠቡ ይረዳል፡፡",
      ]),
      SubTitleText(
        text: "ልጆችን ከሰገራ ማራቅ",
        fontSize: 27.0,
      ),
      Objectives(title: "ዓላማ፡ ", children: [
        "Strengthen an understanding of the link between growth and hygiene"
      ]),
      CourseBodyImage(image: "assets/materials/images/23.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ሰገራ በሽታ አስተላላፊ ተህዋሲያን መራቢያ ስለሆነ በጫካ ውስጥ አይፀዳዱ ወይም ሰገራን በየቦታው አይጣሉ፡፡",
        "በቤትዎ ውስጥ ቋሚ መጸዳጃ ቤት መገንባትዎን ያስታውሱ።",
        "ለመፀዳዳት ወይም ለመሽናት ሁል ጊዜ በጥልቀት የተቆፈረ መጸዳጃ ቤት ወይም የዉሃ ሽንት ቤት ይጠቀሙ።",
        "ሽንት ቤት ከተጠቀሙ በኋላ ሁል ጊዜ እጅዎን በውሃ እና በሳሙና በደንብ ይታጠቡ።",
        "ሰገራን እና ተያያዥ ማይክሮቦችን ለመከላከል ሁል ጊዜ ሽንት ቤቱን ያጽዱ፡፡",
      ]),
      SubTitleText(
        text: "ምንጥፍ በመጠቀም የህጻናትን የመጫወቻ ቦታ ንጽህና መጠበቅ",
        fontSize: 27.0,
      ),
      // Objectives(title: "ዓላማ፡ ", children: [
      //   "Strengthen an understanding of the link between growth and hygiene"
      // ]),
      CourseBodyImage(image: "assets/materials/images/24.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ልጆቻችሁን ከተቅማጥ ትኩሳት እና ትውከት ህመም ለመከላከል ከመሬት ላይ የቆሸሹ ነገሮችን እንዳይበሉ ይጠብቁ፡፡",
        "ወላጆች ጓሮ ውስጥ ሌላ ስራ ሲሰሩ ወይም ልጆችን ሲያጫውቱ ምንጣፍ ወይም ንጹህ ጨርቅ መጠቀማቸውን አይርሱ፡፡",
        "ምንጣፍ ሲጠቀሙ ውስጡ እንዳይበላሽ ዋናውን ክፍል ወደ ውጭ ማጠፍዎን ያረጋግጡ።",
        "ለልጅዎ ከመሬት ላይ የቆሸሹ ነገሮችን እንዳይሰበስብ መጫዎቻዎች ይስጡት።",
        "ልጅዎ በንጹህ ወለል ላይ መጫወቱን ያረጋግጡ።"
      ]),
      SubTitleText(
        text: "የሰገራን በሽታ አምጭ ዑድት በመግታት የህጻናትን የመጫወቻ ቦታ ንጽህና መጠበቅ",
        fontSize: 27.0,
      ),
      // Objectives(title: "ዓላማ፡ ", children: [
      //   "Strengthen an understanding of the link between growth and hygiene"
      // ]),
      CourseBodyImage(image: "assets/materials/images/25.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ሁሉንም የህጻናት ሰገራ ወደ መጸዳጃ ቤት ይጣሉ።",
        "ልጅዎ እድሜው ለመቀመጥ ከደረሰ፣ በፖፖ ይጠቀሙ እና ያስወግዱት።",
        "ልጆቻችሁን ሽንት ቤት እንዴት መጠቀም እንዳለባቸው አስተምሯቸው።",
        "የግቢያችሁንና አካባቢያችሁን በማጽዳት የበሽታዎችን ስርጭት ይከላከሉ፡፡",
        "ቤትዎንና በዙሪያዎ ያለውን ንጽህና ለመጠበቅ የመጸዳጃ ቤትዎን ንፅህና ይጠብቁ፡፡",
        "ወደ መጸዳጃ ቤት የሚወስደው መንገድ ግልጽ መሆኑን ያረጋግጡ፡፡",
        "ለልጅዎ ንፁህ አሻንጉሊቶችን ያቅርቡ፡፡",
        "የዶሮዎችን ኩስ ልጆቹ በማይደርሱበት ቦታ ይጣሉ፡፡",
        "የልጆችን መጫወቻ ቦታ ከእንስሳት ሰገራ እና ሌሎች ቆሻሻ ነገሮች እንዲርቁ ያደርጋል፡፡",
      ])
    ],
  ),
);
