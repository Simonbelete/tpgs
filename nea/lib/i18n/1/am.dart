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

Course AM = Course(
  title: "ስርዓተ ምግብ ለምን ያስፈልጋል?",
  coverImage: "assets/materials/images/imag_4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: "ዓላማ፡", children: ['ስርዓተ ምግብ ለምን አስፈላጊ እንደሆነ ይረዱ']),
      CourseBodyImage(image: "assets/materials/images/imag_4.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        'ስርዓተ ምግብ በሁሉም የህይወት ደረጃዎች ውስጥ አስፈላጊ ነው።',
        'ለሰውነታችን ጉልበት እንዲሰጠን፣ እንድናድግ፣ እንድንማር፣ ጤናማ እንድንሆን፡ እንድንሰራ የሚያስችል በቂ ምግብ ይፈልጋል',
        'ጤና እና አመጋገብ በቅርበት የተሳሰሩ ናቸው ፡፡ አንድ ሰው ጤናማ ለመሆን በደንብ መመገብ አለበት።',
        'የጤና መጓደል አመጋገብ ሁኔታን ሊጎዳ ይችላል',
        'የተመጣጠነ ምግብ የማትገኝ እናት ነፍሰ ጡር ስትሆን ጤነኛ ያልሆነ፡ ዝቅተኛ ክብደት ያለው / አእምሮው የተዛባ ልጅ ልትወልድ ትችላለች።',
        'የተፀነሱ እና ከሁለት አመት በታች የሆኑ ህጻናት ከፍተኛ የምግብ ፍላጎት አላቸው። ምክንያቱም ከመውለዳቸው በፊት ሰውነታቸው በፍጥነት እያደገ እና እየተቀየረ ስለሚሄድ ነው፡፡',
        'የስርዓተ ምግብ ሶስት ቁልፍ መርሆዎች፡- \n\nየተመጣጠነ ምግብ - በቂ ምግቦችን መመገብ.\n\nበበሽታ አለመጠቃት- ጤናማ መሆን.\n\nተገቢ የእንክብካቤ ልምዶች - ጥሩ እንክብካቤ፡ እረፍት ፡ንፅህና፡ ጤናማ የመኖሪያ አካባቢን መፍጠር'
      ]),
      Remember(title: 'ያስታውሱ', children: ['ቤተሰቡ በየቀኑ የተመጣጠነ ምግብ ያስፈልገዋል']),
      // CourseBodyImage(
      //   image: 'assets/materials/images/imag_4.png',
      //   description:
      //       "A poorly nourished pregnant woman is likely to give birth to an underweight baby who grows up as a weaker adolescent and likely to give birth to an underweight baby in future.",
      // ),
      // CourseBodyImage(
      //   image: 'assets/materials/images/img_5.png',
      //   description:
      //       "A well-nourished pregnant woman will give birth to a healthy baby who grows up as a healthy adolescent and likely to give birth to a health baby in the future.",
      // ),
      //
      // Causes of malnutrition
      //
      SubTitleText(
        text: 'የተመጣጠነ ምግብ አስፈላጊነት',
        fontSize: 27.0,
      ),
      Paragraph(
          title: "",
          body:
              "የተመጣጠነ ምግብ በሰውነት ውስጥ ለኃይል፡ ለእድገት እና ሰውነትነ ለመጠገን እና ከበሽታ ለመከላከል የሚያስፈልጉትን የተለያዩ ንጥረ ነገሮችን ያካትታል፡፡ እንደ ዕድሜ፡ ጾታ፡ የአካል ብቃት እንቅስቃሴ፡ ቁመት፡ ክብደት እና የግለሰቡ የጤና ሁኔታ ይለያያሉ፡፡"),
      // Objectives(
      //     title: "OBJECTIVE",
      //     children: ['Know about malnutrition and its causes']),
      // KeyMessages(children: [
      //   Paragraph(
      //       title: "",
      //       body:
      //           "የተመጣጠነ ምግብ በሰውነት ውስጥ ለኃይል፡ ለእድገት እና ሰውነትነ ለመጠገን እና ከበሽታ ለመከላከል የሚያስፈልጉትን የተለያዩ ንጥረ ነገሮችን ያካትታል፡፡ እንደ ዕድሜ፡ ጾታ፡ የአካል ብቃት እንቅስቃሴ፡ ቁመት፡ ክብደት እና የግለሰቡ የጤና ሁኔታ ይለያያሉ፡፡"),
      //   Bullet(children: [
      //     'Immediate causes (inadequate diet - quantity and quality, diseases)',
      //     'Underlying causes (food insecurity, inadequate mother and child care, and inadequate healthcare and unhealthy environment)'
      //   ]),
      //   'A person who does not eat a diverse diet may lack certain vitamins and minerals (micronutrients). This can aﬀ ect health at all stages of life and prevent adequate growth and development in children. Micronutrients of public health signiﬁ cance are iron, vitamin A and iodine, lack of which aﬀ ect health and growth. A varied diet or taking special supplements can ensure people get the micronutrients they need.'
      // ]),
      CourseBodyImage(
        image: 'assets/materials/images/8.png',
        description: 'በቂ ያልሆነ የምግብ አቅርቦት',
      ),
      CourseBodyImage(
        image: 'assets/materials/images/9.png',
        description: 'በቂ የምግብ አቅርቦት',
      ),
      Remember(title: 'ያስታውሱ', children: ['በየቀኑ የተለያዩ ምግቦችን ይመገቡ']),

      SubTitleText(text: "የተመጣጠነ ምግብ እጥረት ዓይነቶች"),
      Paragraph(
          title: "",
          body:
              "የተመጣጠነ ምግብ እጥረት ከመጠን በላይ መመገብና እና የተመጣጠነ ምግብ እጥረትን የሚያካትት ቃል ነው። የተመጣጠነ ምግብ እጥረት በእድሜ፣ በፆታ፣ በአካል ብቃት እንቅስቃሴ፣ በክብደት እና በጤንነት ሁኔታ ላይ ተመስርተው ከንጥረ-ምግብ ፍላጎቶች አንፃር ከመጠን በላይ በመመገብ ወይም በምግብ እጥረት ምክንያት የሚከሰት ነው።"),
      Paragraph(
          title: "ከመጠን በላይ በመመገብ የሚመጣ ችግር ",
          body:
              "ከመጠን በላይ የተመጣጠነ ምግብ መመገብ ከሚያስከትላቸው ውጤቶች መካከል የስኳር በሽታ፣ የልብና የደም ሥር (cardiovascular) በሽታ፣ ከመጠን ያለፈ ውፍረት እና ካንሰርን ጨምሮ ሥር የሰደዱ በሽታዎችን የመጋለጥ እድላቸው ይጨምራል። "),
      CourseBodyImage(
        image: 'assets/materials/images/c_4.png',
        description: "The Above child is Obese",
      ),
      Paragraph(
          title: "የተመጣጠነ ምግብ እጥረት ",
          body:
              "በአጠቃላይ በቂ ያልሆነ ምግብ መመገብ፤ የምግብ ጥራት ጉድለት እና በተደጋጋሚ በተላላፊ በሽታዎች ምክንያት የሚከሰት ውጤት ነው፡፡ የተመጣጠነ ምግብ እጥረት በተለያዩ ሁኔታዎችን ይገልፃል፣ ይህም ከክብደት በታች መሆን፣ አጭር፣ ቀጭን እና የቪታሚኖች እና ማዕድናት እጥረት መሆንን ያካትታል። አንድ ልጅ በጣም ቀጭን ወይም ከእድሜው አማካይ በጣም ያነሰ ከሆነ የተመጣጠነ ምግብ እጥረት ተብሎ ይገለጻል። በጣም ጥቅም ላይ የዋሉት የተመጣጠነ ምግብ እጥረት አይነቶች፡-"),
      // Paragraph(
      //     title: "",
      //     body:
      //         "Undernutrition describes a range of conditions, including being underweight, short, thin, and being deficient in vitamins and minerals. A child is defined as undernourished if they are very thin or much shorter than the average for their age. The most used indicators of under-nutrition are: "),
      // SubTitleText(
      //   text: "Underweight",
      //   fontSize: 16.0,
      // ),
      // Paragraph(
      //     title: "Underweight ",
      //     body:
      //         "an indicator assessing the adequacy of weight-for-age. The causes can be short-term or long-term and are difficult to define. "),
      SubTitleText(
        text: "Wasting",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "መመንመን ",
          body:
              "በተለምዶ የአጣዳፊ ወይም የአጭር ጊዜ በቂ ምግብ አለመመገብ ብዙ ጊዜ ከበሽታ ጋር ተደምሮ የሚመጣ ነው። በከፈተኛ ሁኔታ ቀጭን የሆኑ ህጻናት (ማለትም ለቁመታቸው በጣም ዝቅተኛ ክብደት ያላቸው) የመነመኑ ሊሆኑ ይችላሉ፡፡"),
      CourseBodyImage(
        image: 'assets/materials/images/c_1.png',
        description: "ከላይ ያለው ልጅ የመመንመነ አና ከክብደት በታች ነው",
      ),
      SubTitleText(
        text: "Stunting",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "መቀንጨር ",
          body:
              "መቀንጨር ማለት ልጆችን በተመጣጠነ ምግብ እጥረት፣ በተደጋጋሚ ለብሽታ በመጋለጥ እና በቂ ያልሆነ የስነ-ልቦና እንክብካቤ ምክንያት የሚያጋጥማቸው የዕድገት ውስንነት ነው፡፡ መቀንጨር ለአእምሮ እድገት ውስንነት ያጋልጣል፡፡ ይህን ለመከላከል የተመጣጠነ ምግብ መመገብ ያስፈልጋል፡፡"),
      CourseBodyImage(
        image: 'assets/materials/images/c_2.png',
        description: "ከላይ ያለው ልጅ የቀነጨረ አና ከክብደት በታች ነው",
      ),
      CourseBodyImage(
        image: 'assets/materials/images/c_3.png',
        description: "ከላይ ያለው ልጅ ትክ ከለኛ ነው",
      ),

      // SubTitleText(
      //   text: "Deficiencies in vitamins and minerals",
      //   fontSize: 16.0,
      // ),
      // Paragraph(
      //     title: "Deficiencies in vitamins and minerals",
      //     body:
      //         "result from a poor-quality diet. Micronutrient deficiencies can also result from frequent illness, which may increase requirement, utilization, or loss of nutrients. "),
      // Paragraph(
      //     title: "NOTE: ",
      //     body: " All these children may also be micronutrient deficient")
    ],
  ),
);
