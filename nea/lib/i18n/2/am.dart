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

Course EN = Course(
  title: "የቤተሰብ ስርዓተ ምግብ",
  coverImage: "assets/materials/images/family_nutration.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: 'ዓላማ', children: ['ስለ የተመጣጠነ ምግብ እጥረት እና መንስኤዎች ማወቅ']),
      CourseBodyImage(
        image: 'assets/materials/images/10.png',
        description: "ስድስቱ የምግብ አይነቶች",
      ),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        Paragraph(
            title: "",
            body:
                "የተመጣጠነ ምግብ እጥረት የአንድን ሰው የምግብ እጥረት፣ ከመጠን በላይ መመገብን ወይም የንጥረ ምግቦችን አለመመጣጠን ያመለክታል፡፡"),
        Paragraph(
            title: "",
            body: "የተመጣጠነ ምግብ እጥረት መንስኤዎች የተለያዩ፣ የተሳሰሩ እና ውስብስብ ናቸው።"),
        Paragraph(
            title: "",
            body: "ፈጣን ምክንያቶች - በጥራትና በብዛት ያልተመጣጠነ አመጋገብ እና በሽታዎች ምክንያት"),
        Paragraph(title: "", body: "መሰረታዊ ምክንያቶች"),
        Bullet(children: [
          "የምግብ ዋስትና ማጣት፣ በቂ ያልሆነ የእናት እና ልጅ እንክብካቤ፣ በቂ ያልሆነ የጤና እንክብካቤ እና ጤናማ ያልሆነ አካባቢ መሰረታዊ ምክንያቶች ሊሆኑ ይችላሉ፡፡",
          "የተመጣጠነ ምግብ የማይመገብ ሰው የተወሰኑ ቪታሚኖች እና ማዕድናት (ማይክሮ ኤለመንቶች) እጥረት ያጋጥመዋል፡፡ ይህም ልጆች ላይ በቂ እድገትን እና ጤንነትን እንዳይኖር ያደርጋል፡፡",
          "ለሰወች ጤና ጠቃሚ የሆኑ ማይክሮ ኤለመንቶች ብረት፣ ቫይታሚን ኤ እና አዮዲን ናቸው።",
          "የተስተካከለ አመጋገብ ወይም ተጨማሪ እንክብሎችን መውሰድ ለጤና በጣም አስፈላጊ ነው፡፡"
        ])
      ]),
      Remember(title: "ያስታውሱ፦", children: ["በየቀኑ የተለያዩ ምግቦችን ይመገቡ"]),
      // Food Groups
      SubTitleText(
        text: 'የምግብ አይነቶች ምንድናቸው?',
        fontSize: 27.0,
      ),
      Paragraph(
          title: "",
          body:
              "የትኛውም ምግብ ወይም የምግብ አይነት የሰውነት ክፍላችን ለተሻለ ተግባር እና ጥሩ ጤንነት የሚፈልገውን ሁሉንም ንጥረ ነገሮች አካቶ የያዘ ማለት ነው። የሰውነት ክፍላችን ከተለያዩ ምግቦች የሚመጡ ንጥረ ምግቦችን ይፈልጋል፡፡ ጥሩ የአመጋገብ ስርዓት እንዲኖረን የተለያዩ ምግቦችን አዘውትሮ መመገብ እና ከሁሉም የምግብ አይነቶች የተውጣጡ ማድረግ አስፈላጊ ነው፡፡"),
      SubTitle(text: "አምስቱ የምግብ አይነቶች"),
      Paragraph(
          title: "",
          body:
              "ለሰውነት ጠቃሚ የሆኑ ንጥረ ነገሮች ለማግኘት ውድ ምግብ መመገብ ማለት ሳይሆን በ 5 ምድብ የተመደቡ ምግቦችን መመገብ ማለት ነው፡፡"),
      SubTitleText(
        text: 'እህሎች/ጥራጥሬዎች፣ ሀረጎችና ሥሮች፣ ስኳሮች',
      ),
      Paragraph(
          title: "",
          body:
              "በዚህ ቡድን ውስጥ ያሉ ምግቦች :: ሩዝ፣ በቆሎ፣ ዘንጋዳ፤ አረንጓዴ ሙዝ፣ ስኳር ድንች ፣ ክብ ድንች ፣ ካሳቫ ፣ ማሽላ, የሸንኮራ አገዳ, ማር"),
      Paragraph(title: "ጥቅሙ: ", body: "ሃልና መቀት ሰጭ ምግቦች"),
      SubTitleText(
        text: "የስጋ እና የስጋ ውጤቶች ፣ የዶሮ እና የዶሮ ምርቶች ፣ ወተት፣ አሳ፣ ጥራጥሬዎች",
      ),
      Paragraph(
          title: "",
          body:
              "ይህ የምግብ ክፍል ሥጋ፡ የብልት ሥጋ፡ ዶሮ፡ እንቁላል፡ አሳ ፡ ባቄላ፡ አተር፡ ምስር፤ ለውዝ፣ አደንጓሬ፣ ጓያ እና ወተት ያጠቃልላል። እነዚህ ምግቦች ከኃይል በተጨማሪ ጥሩ የፕሮቲን ምንጭ ነው በተጨማሪም በመጀመሪያዎቹ ሁለት አመታት ውስጥ ለህጻናት እድገት ወሳኝ ናቸው፡፡"),
      Paragraph(title: "ጥቅሙ: ", body: "ገንቢ ምግቦች"),

      SubTitleText(
        text: "ዘይቶችና ቅባቶች",
      ),
      Paragraph(
          title: "",
          body:
              "ኮኮናት, አቮካዶ, የምግብ ዘይት, ሰሊጥ እና ዱባ ፣ የእንስሳት ስብ ፣ ለውዝ ፣ የሱፍ አበባ የስብ ምንጮች ናቸው። "),
      Paragraph(title: "ጥቅሙ: ", body: "የቅባት ምግቦች"),

      SubTitleText(
        text: "አትክልቶች",
      ),
      Paragraph(
          title: "",
          body:
              "እነዚሀ የምግብ ክፍሎች ጎመን፣ ስፒናች፣ ሴሊሪ፣ ዱባ፣ በርበሬ፣ ብሮኮሊ፣ ካሮት፣ አበባ ጎመን፣ ሽንኩርት እና ቲማቲምን ጨምሮ አረንጓዴ ቅጠል እና ቢጫ አትክልቶችን ያጠቃልላል። አትክልቶች አስፈላጊ የሆኑ ማይክሮ ኤለመንቶችን (ቫይታሚን እና ማዕድኖችን) ይሰጣሉ፡፡"),
      Paragraph(title: "ጥቅሙ: ", body: "ቪታሚኖችና ማዕድናት"),

      SubTitleText(
        text: "ፍራፍሬዎች",
      ),
      Paragraph(
          title: "",
          body:
              "እነዚሀ የምግብ ክፍሎች አረንጓዴ ቅጠላማ አትክልቶች, ብርቱካንማ ቀለም ያላቸው አትክልቶች፤ ኦክራ, ዱባ, ቲማቲም, ሽንኩርት እና ሌሎችን ያካትታል፡፡ በዋናነት ኃይልን እና አስፈላጊ የሆኑ ማይክሮ ኤለመንቶችን (ቫይታሚን እና ማዕድኖችን) ይሰጣሉ፡፡"),
      SubTitleText(
        text: "ዉሃ",
      ),
      Paragraph(title: "", body: ""),
      Remember(title: "ያስታዉሱ፦", children: [
        "አንድ ምግብ ሁሉንም ንጥረ ነገሮች አይሰጥም፡፡ አሰባጥረው ይመገቡ።",
        'ጤናማ አመጋገብ ማለት ውድ ምግብ መመገብ ማለት አይደለም፡፡ በአካባቢያችሁ የሚገኙ ምግቦችን ተጠቀሙ፡፡',
      ]),
      //
      // Dietary diversiﬁcation
      //
      SubTitleText(
        text: 'አሰባጥሮ ስለመመገብ',
        fontSize: 27.0,
      ),
      Objectives(title: 'ዓላማ፡ ', children: ['ምግብን አሰባጥሮ የመመገብ ጥቅም']),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        Bullet(children: [
          "ጤናማ እና የተመጣጠነ አመጋገብ ማለት ዋጋቸው ውድ የሆኑ ምግቦችን መመገብ ማለት ሳይሆን ለሰውነታችን ንጥረ ነገር የሚሰጡ የተለያዩ ምግቦችን መመገብ ማለት ነው።",
          "የሰው አካል እንዲሰራ: እንዲያድግ እና ጤናማ ሆኖ እንዲቆይ የሚያስፈልጉት ንጥረ ነገሮች ሊሆኑ ይችላሉ፡፡",
          "በአካባቢያችን በሚገኙ ምግቦች ውስጥ ይገኛሉ፡፡",
          "ከእያንዳንዱ የምግብ ቡድን በየእለቱ በአካባቢው የሚገኙ ምግቦችን ይምረጡ፡-",
          "ዋና ምግቦች (ጥራጥሬዎች / ሥሮች እና ቱቦዎች); አትክልቶች እና ፍራፍሬዎች (የተለያዩ ቅጠላቅጠሎች፡ፍራፍሬዎች እና ቱቦዎች - እና ቀለሞች - አረንጓዴ, ቀይ, ቢጫ / ብርቱካንማ)፡፡",
          "የስጋ ውጤቶች / የእንስሳት ምርቶች እና ጥራጥሬዎች / ፍሬዎች (ፕሮቲን); ስብ ወዘተ፡፡",
          "ከፍተኛውን ንጥረ ነገር ለማረጋገጥ ቀላል እና ጥንቃቄ የተሞላበት የማብሰያ ዘዴዎችን ይጠቀሙ፡፡"
        ])
      ]),
      CourseBodyImage(image: "assets/materials/images/11.png"),

      Remember(title: "አስታውሱ", children: [
        'ጤናማ አመጋገብ ማለት ውድ ምግብ መመገብ ማለት አይደለም፡፡ በአካባቢያችሁ የሚገኙ ምግቦችን ተጠቀሙ፡፡'
      ]),

      //
      // Essential food based micronutrients: vitamins
      //
      SubTitleText(
        text: 'አስፈላጊ የንጥረ ምግብ አይነቶች፡ ቫይታሚኖች',
        fontSize: 27.0,
      ),
      Remember(
          title: "አስታውሱ፦", children: ["የንጥረ ምግቦችን ጥቅም በመረዳት አወሳሰድወን ያስተካክሉ"]),
      CourseBodyImage(image: "assets/materials/images/12.png"),

      SubTitleText(
        text: "ቫይታሚን ኤ",
      ),
      SubTitleText(text: "ቫይታሚን ኤ - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "አይናችን መደበኛ ስራውን እንዲያከናውን",
        "ለትክክለኛ እድገት",
        "ከበሽታ ለመከላከል",
        "ለትክክለኛ አጥንት እድገት"
      ]),
      SubTitleText(text: "ቫይታሚን ኤ - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ጉበት፡ እንቁላል ፡ የአሳ ዘይት፡ ወተት፡ ማንጎ ፣ ብርቱካናማ ጣፋጭ ድንች፡ ዱባ፡ ካሮት፡ ቀይ የዘንባባ ዘይት፡አረንጓዴ ቅጠላማ አትክልቶች"),
      SubTitleText(text: "ቫይታሚን ኤ - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: ['በጨለማ ለማየት መቸገር', 'መቀንጨር', 'በሽታ የመከላከል አቅም መቀነስ']),

      SubTitleText(
        text: "ቫይታሚን ቢ1",
      ),
      SubTitleText(text: "ቫይታሚን ቢ1 - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "የኃይል ልውውጥን ያፋጥናል",
        "የነርቭ ሥርዓት በአግባቡ እንዲሰራ ያደርጋል",
        "የምግብ ፍላጎትን ይጨምራል"
      ]),
      SubTitleText(text: "ቫይታሚን ቢ1 - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body: "የብርዕ እህሎች ፣ ባቄላ ፣ ሥጋ ፣ ዓሳ ፣ ዶሮ ፣ እንቁላል ፣ ወተት, ዘይት፡ ጥራጥሬዎች"),
      SubTitleText(text: "ቫይታሚን ቢ1 - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: [
        "የነርቭና ጡንቻ ህመም",
        "የጡንቻ መድከም",
        "የተለያየ የሰዉነት ክፍላችን ማበጥ",
        "የልብ እብጠት",
        "ግራ መጋባት",
      ]),

      SubTitleText(
        text: "ቫይታሚን ቢ2",
      ),
      SubTitleText(text: "ቫይታሚን ቢ2 - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "ምግብን ወደ ሃይል ይቀይራል",
        "እይታን ያስተካክላል",
        "ጤናማ ቆዳ እንዲኖረን ያደርጋል"
      ]),
      SubTitleText(text: "ቫይታሚን ቢ2 - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ወተት ፣ እንቁላል ፣ ጉበት ፣ እርጎ ፣ ስጋ፡ አረንጓዴ ቅጠል አትክልቶች፡ የእህል ዘሮች፡ ጥራጥሬዎች፡ አሳ፡ ባቄላ"),
      SubTitleText(text: "ቫይታሚን ቢ2 - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: ["የምላስ መቁስል", "የሆድ መነፋት", "የሰውነት ማበጥ"]),

      SubTitleText(
        text: "ማዕድን ብረት",
      ),
      SubTitleText(text: "ማዕድን ብረት - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "አዲስ ሴል ለመገንባት ያስፈልጋል",
        "ቀይ የደም ሴልን ለመገንባት ይረዳል",
        "በጨጓራ በሽታ እንዳንጋለጥ ይረዳል"
      ]),
      SubTitleText(text: "ማዕድን ብረት - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ጉበት : ቀይ ሥጋ: አረንጓዴ ቅጠል አትክልቶች ፣ አሳ ፣ ጥራጥሬዎች ፣ለውዝ: የብርዕ እህሎች: ጥራጥሬዎች: የእንቁላል አስኳሎች: አቮካዶ"),
      SubTitleText(text: "ማዕድን ብረት - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: ["ደም ማነስ", "ዘገምተኛ ጨቅላ ህጻናት"]),

      SubTitleText(
        text: "ቫይታሚን ሲ",
      ),
      SubTitleText(text: "ቫይታሚን ሲ - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "ካልተመገብነው ምን ጉዳት ያስከትላል",
        "ቁስል ቶሎ እንዲያገግም ያደርጋል",
        "የአጥንት ግንባታን ያፋጥናል",
        "የፕሮቲን ግንባታን ያፋጥናል"
      ]),
      SubTitleText(text: "ቫይታሚን ሲ - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ብርቱካን፡ ሎሚ፡ መንደሪን፡ ማንጎ፣ጓቫ፣ቲማቲም፣ ስፒናች ፣ ትኩስ አተር ፣ ጎመን ፣ አረንጓዴ ቅጠሎች፡ ቲማቲሞች፡በርበሬ ፣ ድንች ፣ እንጆሪ ፣ ትኩስ ወተት"),
      SubTitleText(text: "ቫይታሚን ሲ - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: [
        "የድድ መድማት",
        "የምግብ ፍላጎት መቀነስ",
        "ድካም",
      ]),
      //
      // Essential food based micronutrients: minerals
      //
      SubTitleText(
        text: 'አስፈላጊ የንጥረ ምግብ አይነቶች፡ ማዕድናት',
        fontSize: 27.0,
      ),
      SubTitleText(
        text: "Iron",
      ),
      SubTitleText(text: "ብረት - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "ኦክስጅንን ወደ ደም ያስተላልፋል",
        "አሮጌ ቀይ የደም ሴሎችን ያስወግዳል",
        "አዳዲስ ሴሎችን ይገነባል።"
      ]),
      SubTitleText(text: "ብረት - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ቀይ ሥጋ፣ ጉበት፣ የዶሮ ፣ እንቁላል፣ የተፈጨ ለውዝ ፣ ቅጠላማ አትክልቶች ፣ ምስር ፣ባቄላ፣ አተር፣ አኩሪ አተር፣ ጥራጥሬዎች፤ የደረቁ ፍራፍሬዎች"),
      SubTitleText(text: "ብረት - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: ["ደም ማነስ", "ከፍተኛ ድካም"]),

      SubTitleText(
        text: "አዮዲን",
      ),
      SubTitleText(text: "አዮዲን - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "አንጎል እና የነርቭ ስርዓትን ማስተካከል",
        "ለእድገት እና ለሜታቦሊዝም መስተካከል",
        "የተመጣጠነ ንጥረ ነገር ዑደትን ማፋጠን"
      ]),
      SubTitleText(text: "አዮዲን - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ዓሳ እና ሌሎች የባህር ምግቦች ፣ የእንስሳት ተዋጽኦ፣ በአዮዲን የበለፀጉ ተክሎች ፡ የአዮዲድ ጨው"),
      SubTitleText(text: "አዮዲን - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: ["እንቅርት"]),

      SubTitleText(
        text: "ዚንክ",
      ),
      SubTitleText(text: "ዚንክ - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "የሕብረ ሕዋሳት እድገት ማፋጠን",
        "የካርቦሃይድሬትን ወደ ሀይል መቀየር",
        "የፕሮቲኖች እና ቅባቶች ምንጭ በመሆን",
        "ለሴል ክፍፍል አስተዋጽኦ ማድረግ",
        "የበሽታ መከላከያ ስርዓት ማስተካከል",
        "ለተስተካከለ ማሽተት እና ጥሩ ጣዕም",
        "ቁስልን መፈወስ",
        "ተቅማጥን ለመቆጣጠር ይረዳል"
      ]),
      SubTitleText(text: "ዚንክ - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ቀይ ሥጋ፣ ጉበት፣ የዶሮ ፣ አሳ ፤ እንቁላል፣ የብርዕ እህሎች፤ አይብ፤ ፣ ለውዝ፤ ጥራጥሬ፤ የቅባት እህሎች፤ ዱባ ፤የወተት ተዋጽኦ"),
      SubTitleText(text: "ዚንክ - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
      Bullet(children: ["በሽታ የመከላከል አቅም መቀነስ", "የቆዳ ህመም", "መቀንጨር"]),
    ],
  ),
);
