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

Course AM = Course(
  title: "የቤተሰብ ስርዓተ ምግብ",
  coverImage: "assets/materials/images/family_nutration.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: 'ዓላማ', children: ['ስለ የተመጣጠነ ምግብ እጥረት እና መንስኤዎች ማወቅ']),
      CourseBodyImage(
        image: 'assets/materials/images/10_am.jpg',
        description: "ስድስቱ የምግብ አይነቶች",
      ),
      Paragraph(
          title: "",
          body:
              "ከላይ በምስሉ ከተዘረዘሩት የምግብ አይነቶች  መካከል የስጋ እና የስጋ ውጤቶች በሚለው ዝርዝር ውስጥ ሁለት የምግብ አይነቶች ተቀላቅለው ይገኛሉ።"),
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
        text: 'የምግብ አይነቶች ምንድን ናቸው?',
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
        text: "ብረት",
      ),
      SubTitleText(text: "ብረት - ጥቅም", fontSize: 16.0),
      Bullet(children: [
        "አዲስ ሴል ለመገንባት ያስፈልጋል",
        "ቀይ የደም ሴልን ለመገንባት ይረዳል",
        "በጨጓራ በሽታ እንዳንጋለጥ ይረዳል"
      ]),
      SubTitleText(text: "ብረት - የምግብ ምንጭ", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "ጉበት : ቀይ ሥጋ: አረንጓዴ ቅጠል አትክልቶች ፣ አሳ ፣ ጥራጥሬዎች ፣ለውዝ: የብርዕ እህሎች: ጥራጥሬዎች: የእንቁላል አስኳሎች: አቮካዶ"),
      SubTitleText(text: "ብረት - ካልተመገብነው ምን ጉዳት ያስከትላል", fontSize: 16.0),
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
        text: "ብረት",
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
      SubTitleText(text: 'በህጻናት በቀን መወሰድ ያለበት የማክሮ ንጥረ ነገር መጠን (RDAs)'),
      Paragraph(
          title: "",
          body:
              "ካርቦሃይድሬት፣ ፕሮቲኖች እና ቅባቶች በእድሜ እና በጾታ ላይ ተመስርተው ይሰጣሉ። በተጨማሪም፣ የተለየ የጤና ሁኔታ ወይም ከፍ ያለ የእንቅስቃሴ ደረጃ ያላቸው ልጆች የማክሮ ንጥረ ነገር አወሳሰዳቸውን ማስተካከል ሊያስፈልጋቸው ይችላል። ለህጻናት በቀን መወሰድ ያለባቸው የማክሮ ንጥረ ነገሮች እንደሚከተለው ቀርበዋል፡፡ ካርቦሃይድሬት ከጠቅላላው የቀን ካሎሪዎች 45-65% መያዝ አለበት፡፡"),
      Paragraph(
          title: "ፕሮቲኖች፡-",
          body:
              " ለእድገት አስፈላጊ ናቸው። በቀን መወሰድ ያለበት የፕሮቲን መጠን (RDA) በእድሜ ላይ የተመሰረተ ነው፡-"),
      Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 13 ግራም',
        'ከ 4-8 ዓመት: በቀን 19 ግራም',
        'ከ 9-13 ዓመት: በቀን 34 ግራም',
        'ከ 14-18 ዓመት: በቀን 46-52 ግራም (በጾታ ይለያያል)'
      ]),
      Paragraph(
          title: 'ስብ፡-', body: " ለአእምሮ እድገት እና በስብ የሚሟሟ ቪታሚኖችን ለማዋሃድ ጠቃሚ ነው።"),
      Bullet(children: [
        'ከ1-3 አመት ለሆኑ ህፃናት ስብ ከጠቅላላው የቀን ካሎሪ ከ30-40% መስጠት አለበት፡፡',
        'ከ4-18 አመት ለሆኑ ህጻናት ስብ ከ25-35% የሚሆነውን የቀን ካሎሪ መጠን መስጠት አለበት።',
        'የሳቹሬትድ ስብ፡ የስብ መጠን ከጠቅላላው ካሎሪ ከ10% በታች መሆን አለበት።',
        'ትራንስ ፋት፡ ትራንስ-ስብ መጠን ዝቅተኛ መሆን አለበት።',
      ]),

      SubTitleText(text: "በአዋቂዎች በቀን መወሰድ ያለበት የማይክሮ ንጥረ ነገር መጠን (RDAs)"),
      SubTitleText(
        text: "ቫይታሚኖች",
        fontSize: 14,
      ),
      Bullet(children: [
        'ቫይታሚን ኤ: ለወንዶች 900 ማይክሮግራም , ለሴቶች 700 ማይክሮግራም',
        'ቫይታሚን ሲ: ለወንዶች 90 ሚሊ ግራም, ለሴቶች 75 ሚ.ግ',
        'ቫይታሚን ዲ፡ 15 ማይክሮ ግራም (600 IU) እስከ 70 አመት ለሆኑ አዋቂዎች 20 ማይክሮ ግራም (800 IU) ከ 70 በላይ ለሆኑ አዋቂዎች',
        'ቫይታሚን ኢ: ለወንዶች እና ለሴቶች 15 ሚሊግራም (22.4 ኢዩ).',
        'ቫይታሚን ኬ: ለወንዶች 120 ማይክሮግራም፡ ለሴቶች 90 ማይክሮግራም',
        'ቲያሚን (ቫይታሚን ቢ1): ለወንዶች 1.2 ሚ.ግ ፡ ለሴቶች 1.1 ሚ.ግ',
        'ሪቦፍላቪን (ቫይታሚን ቢ2)፡ ለወንዶች1.3 ሚ.ግ ፣ ለሴቶች 1.1 ሚ.ግ',
        'ኒያሲን (ቫይታሚን ቢ3): ለወንዶች16 ሚ.ግ፡14 ሚ.ግ ለሴቶች',
        'ቫይታሚን ቢ6: ለወንዶች 1.7 ሚ.ግ, ለሴቶች 1.5 ሚ.ግ',
        'ፎሌት (ቫይታሚን ቢ9): ለወንዶች እና ለሴቶች 400 ማይክሮግራም',
        'ቫይታሚን ቢ12: ለወንዶች እና ለሴቶች 2.4 ማይክሮግራም',
        'ፓንታቶኒክ አሲድ (ቫይታሚን ቢ5): ለወንዶች እና ለሴቶች 5 ሚ.ግ',
        'ባዮቲን (ቫይታሚን ቢ7): ለወንዶችም ለሴቶችም 30 ማይክሮግራም',
      ]),
      SubTitleText(
        text: 'ማዕድናት',
        fontSize: 14.0,
      ),
      Bullet(children: [
        'ካልሲየም፡ እድሜያቸው እስከ 50 አመት ለሆኑ አዋቂዎች 1000 ሚ.ግ 50 በላይ ለሆኑ 200 ሚ.ግ.',
        'ብረት፡ ለወንዶች 8 ሚሊ ግራም፡ ለሴቶች 18 ሚ.ግ',
        'ማግኒዥየም: ለወንዶች 400 ሚ.ግ፡ ለሴቶች 310 ሚ.ግ',
        'ፎስፈረስ: ለወንዶች እና ለሴቶች 700 ሚ.ግ',
        'ፖታስየም: ለወንዶች እና ለሴቶች 3400 ሚ.ግ',
        'ሶዲየም፡ ለወንዶች እና ለሴቶች 1500 ሚ.ግ',
        'ዚንክ: ለወንዶች 11 ሚ.ግ፡ ለሴቶች 8 ሚ.ግ',
      ]),

      SubTitleText(text: 'በአዋቂዎች በቀን መወሰድ ያለበት የማክሮ ንጥረ ነገር መጠን (RDAs)'),
      Paragraph(
          title: "ፕሮቲን:", body: " ለአዋቂዎች: በቀን 0.8 ግራም (በኪሎ ግራም የሰውነት ክብደት)"),
      Paragraph(title: "ስብ፡", body: " ከጠቅላላው የቀን ካሎሪ መጠን 20-35% መሆን አለበት።"),
      Paragraph(
          title: "የሳቹሬትድ", body: " ስብ፡ ከጠቅላላው የቀን ካሎሪ ከ10% በታች እንዲገደብ ይመከራል።"),
      Paragraph(
          title: "ካርቦሃይድሬት፡-", body: "ከ45-65% የቀን ካሎሪ መጠን እንዲያበረክቱ ይመክራሉ።"),

      SubTitleText(
          text: "በእርግዝና ጊዜ በእናቶች በቀን መወሰድ ያለበት የማይክሮ ንጥረ ነገር መጠን (RDAs)"),
      Paragraph(title: "ፎሊክ አሲድ ፡-", body: " በቀን 600 ማይክሮ ግራም"),
      Paragraph(title: "አይረን፡", body: " በቀን 27 ሚግ"),
      Paragraph(title: "ካልሲየም:", body: " በቀን 1,000 ሚግ (ከ19-50 አመት ለሆኑ ሴቶች)"),
      Paragraph(title: "ቫይታሚን ዲ:", body: " በቀን 600 ዓለም አቀፍ ዩኒት"),
      Paragraph(title: "አዮዲን:", body: " በቀን 220 ማይክሮ ግራም"),
      Paragraph(title: "ቫይታሚን ኤ:", body: " በቀን 770 ማይክሮ ግራም"),
      Paragraph(title: "ቫይታሚን ሲ:", body: " በቀን 85 ሚ.ግ"),
      Paragraph(title: "ቫይታሚን ኢ:", body: " በቀን 15 ሚ.ግ"),
      Paragraph(title: "ቲያሚን (ቫይታሚን ቢ1):", body: " በቀን 1.4 ሚ.ግ"),
      Paragraph(title: "ቫይታሚን ቢ2:", body: " በቀን 1.4 ሚ.ግ"),
      Paragraph(title: "ኒያሲን (ቫይታሚን ቢ3):", body: " በቀን 18 ሚ.ግ"),
      Paragraph(title: "ቫይታሚን ቢ6:", body: " በቀን 1.9 ሚ.ግ"),
      Paragraph(title: "ቫይታሚን ቢ12:", body: " በቀን 2.6 ማይክሮ ግራም"),
      Paragraph(title: "ዚንክ:", body: " በቀን 11 ሚ.ግ"),

      SubTitleText(
          text: "በእርግዝና ጊዜ በእናቶች በቀን መወሰድ ያለበት የማክሮ ንጥረ ነገር መጠን (RDAs)"),
      Paragraph(
          title: "ፕሮቲን:", body: " አንድ እናት በእርግዝና ወቅት በቀን 71 ግራም ነውመውሰድ አለባት፡፡"),
      Paragraph(
          title: "ካርቦሃይድሬት፡",
          body: " አንድ እናት በእርግዝና ወቅት ከ45-65% የየቀኑ የካሎሪ መጠን መጨመር አለባት።"),
      Paragraph(
          title: "ስብ፡",
          body: " በእርግዝና ወቅት ስብ ከጠቅላላው የቀን ካሎሪ መጠን ከ20-35% መሆን አለበት።"),

      SubTitleText(
          text: "እናቶች ጡት በሚያጠቡበት ጊዜ በቀን መወሰድ ያለባቸው የማይክሮ ንጥረ ነገር መጠን (RDAs)"),
      Paragraph(title: "ቫይታሚን ኤ:", body: " በቀን 1,300 ማይክሮ ግራም"),
      Paragraph(title: "ቫይታሚን ሲ፡", body: " በቀን 120 ሚሊግራም"),
      Paragraph(title: "ቫይታሚን ዲ:", body: " በቀን 15 ማይክሮ ግራም"),
      Paragraph(title: "ቫይታሚን ኢ:", body: " በቀን 19 ሚ.ግ."),
      Paragraph(title: "ቫይታሚን ኬ:", body: " በቀን 90 ማይክሮ ግራም"),
      Paragraph(title: "ታይአሚን (ቫይታሚን ቢ1):", body: " በቀን 1.4 ሚ.ግ."),
      Paragraph(title: "ሪቦፍላቪን (ቫይታሚን ቢ2)፡", body: " በቀን 1.6 ሚ.ግ."),
      Paragraph(title: "ኒያሲን (ቫይታሚን ቢ3):", body: " በቀን 17 ሚ.ግ."),
      Paragraph(title: "ቫይታሚን ቢ6:", body: " በቀን 2 ሚ.ግ."),
      Paragraph(title: "ፎሌት (ቫይታሚን ቢ9):", body: " በቀን 500 ማይክሮ ግራም"),
      Paragraph(title: "ቫይታሚን ቢ12:", body: " በቀን 2.8 ማይክሮ ግራም"),
      Paragraph(title: "ካልሲየም፡", body: " በቀን 1,000 ሚ.ግ."),
      Paragraph(title: "ብረት:", body: " በቀን 9 ሚ.ግ."),
      Paragraph(title: "ዚንክ፡", body: " በቀን 12 ሚ.ግ."),
      Paragraph(title: "መዳብ:", body: " በቀን 1,300 ማይክሮ ግራም"),
      Paragraph(title: "አዮዲን:", body: " በቀን 290 ማይክሮ ግራም"),

      SubTitleText(
          text: "እናቶች ጡት በሚያጠቡበት ጊዜ በቀን መወሰድ ያለባቸው የማክሮ ንጥረ ነገር መጠን (RDAs)"),

      Paragraph(
          title: "ፕሮቲን፡-",
          body:
              " እናቶች ጡት በሚያጠቡበት ወቅት በየቀኑ መወሰድ ያለበት የፕሮቲን መጠን በእርግዝና ጊዜ ወይም ከእርግዝና ውጭ ከሚወሰደዉ የበለጠ መሆን አለበት።"),
      Paragraph(
          title: "ፕሮቲን፡",
          body:
              " በአማካይ, የሚያጠቡ ሴቶች በየቀኑ ወደ 71 ግራም ፕሮቲን እንዲወስዱ ይመከራሉ. ጥሩ የፕሮቲን ምንጮች ስጋ፣ የዶሮ ስጋ፤ አሳ፣ የወተት ተዋጽኦዎች፣ እንቁላል፣ ጥራጥሬዎች እና ለውዝ ያካትታሉ።"),
      Paragraph(
          title: "ካርቦሃይድሬት፡-",
          body:
              " እናቶች ጡት በሚያጠቡበት ወቅት በቀን ከ210 እስከ 175 ግራም ያስፈልጋቸዋል፡፡ እናቶች ጡት በሚያጠቡበት ወቅት የካርቦሃይድሬት ፍላጎት በእርግዝና ወቅት ከሚያስፈልገው ጋር ተመሳሳይ ነው። እህሎች፣ ፍራፍሬ፣ አትክልቶች እና ጥራጥሬዎች በጣም ጥሩ የካርቦሃይድሬት ምንጮች ናቸው።"),
      Paragraph(
          title: "ስብ፡-",
          body:
              " እናቶች ጡት በሚያጠቡበት ወቅት በቀን ከ44 እስከ 55 ግራም ስብ መውሰድ አለባቸው። እንደ አቮካዶ፣ ለውዝ፣ የወይራ ዘይት እና የሰባ ዓሳ ውስጥ በሚገኙ ጤናማ ቅባቶች ላይ ማተኮር አስፈላጊ ነው።"),
      Paragraph(
          title: "ካሎሪ፡",
          body:
              " የሚያጠቡ እናቶች በተለምዶ የወተት ውጤትን ለመተካት ተጨማሪ ካሎሪዎች ያስፈልጋቸዋል። በአማካይ በየቀኑ ተጨማሪ 500 ካሎሪዎች እንዲወስዱ ይመከራል፡፡ የሚያጠቡ እናቶች ውሃ በደንብ መጠጣት አለባቸው፡፡ ስለዚህ ብዙ ውሃ መጠጣት አለባቸው፡፡ በተጨማሪም የሚያጠቡ እናቶች ከቅድመ ወሊድ በፊት በተለይም አይረን እና ፎሊክ አሲድ ያላቸውን ቪታሚኖች መውሰዳቸውን እንዲቀጥሉ ይመከራል።"),
    ],
  ),
);
