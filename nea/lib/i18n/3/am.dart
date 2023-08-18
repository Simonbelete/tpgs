import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  title: "የእናቶች ስርዓተ ምግብ",
  coverImage: "assets/materials/images/13.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      SubTitleText(text: "የእናቶች የተመጣጠነ ምግብ እጥረት መንስኤዎች"),
      Objectives(
          title: "ዓላማ፡",
          children: ['ለነፍሰ ጡር ሴቶች እና ለሚያጠቡ እናቶች መሰረታዊ የአመጋገብ መስፈርቶች']),
      CourseBodyImage(image: "assets/materials/images/13.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "በምግብ እጥረት፣ በገበያ ላይ ያለ ምግብ አለመገኘት ወይም ለመግዛት ገንዘብ ባለመኖሩ ምክንያት አስፈላጊውን የምግብ አቅርቦት አለማግኘት፡፡",
        "የእውቀት ውስንንት፡ ስለ ምግብ፣ ስለ ስነ-ምግብ፣ ደህንነቱ ስለተጠበቀ እና የንፅህና አጠባበቅ ዝግጅት፣ ምግብን ስለመጠበቅ፣ ጤናማ የአኗኗር ዘይቤ በግለሰብ፣ በቤተሰብ፣ በማህበረሰብ እና በአገር አቀፍ ደረጃ እውቀት ማነስ።",
        "ባህል እና እምነት፡ በጾም ወቅት ጠቃሚ የሆኑ ንጥረ ነገሮች አይበሉም ፡፡ ለምሳሌ የእንስሳት ተዋጽኦዎች። በቤተሰብ አባላት መካከል በመመገብ ላይ አድልዎ; አዋቂ ወንዶች (የቤተሰቡ አስተዳዳሪ) ከሴቶች በፊት መመገብ፡ እና ለህፃናት የተረፈንን ምግብ መመገብ፡፡",
        "የቤተሰብ የገቢ ሁኔታ፡ በእርግዝና እና ጡት በማጥባት ወቅት የሚበሉት ምግቦች አይነት እና ብዛት በቤተሰቡ ገቢ ላይ የተመሰረተ ነው።"
      ]),
      SubTitleText(text: "እርግዝና እና ጡት ማጥባት"),
      Bullet(children: [
        "ነፍሰ ጡር እና የምታጠባ ሴት አመጋገብ በካሎሪ፣ ፕሮቲን፣ ካልሲየም፣ ፎሊክ አሲድ እና ብረት ላይ ከፍተኛ ጭማሪን ማካተት አለበት።",
        "በተለይ ለአመጋገብ እጦት የተጋለጡ ነፍሰ ጡር እናቶች በጉርምስና ዕድሜ ላይ የሚገኙ ወጣቶች፣ ከክብደታቸው በታች የሆኑ ሴቶች፣ ወፍራም ሴቶች፣ ሥር የሰደደ የአመጋገብ ችግር ያለባቸው ሴቶች፣ አልኮል ወይም አደንዛዥ ዕፅ የሚጠጡ ወይም የሚያጨሱ ሴቶች፣ ዝቅተኛ ገቢ ያላቸው ሴቶች እና",
        "እንደ የስኳር በሽታ ወይም የደም ማነስ ያሉ ሥር የሰደደ ሕመም ያለባቸው ሴቶች ከዚህ በታች የተዘረዘሩትን ምክሮች ማከናወን አለባቸው፡፡"
      ]),
      SubTitleText(text: "በእርግዝና ወቅት ለእናቶች ምክሮች"),
      Bullet(children: [
        "በእርግዝና ወቅት ክብደት መጨመር አስፈላጊ ነው።",
        "ወፍራም የሆኑ እናቶች በእርግዝና ወቅት ክብደት ለመቀነስ እንዳይሞክሩ አጥብቀው ያበረታቱ።",
        "በእርግዝና ወቅት የሚያስፈልጉትን ንጥረ ነገሮች በሙሉ ከመጠን በላይ ካሎሪ ሳይኖራቸው እንዲካተቱ ምግብን በጥንቃቄ እንዲያቅዱ ማበረታታት። ለእርግዝና የምግብ መመሪያን መጠቀም ጠቃሚ ነው፡፡",
        "የካፌይን መጠን መገደብ አለበት።",
        "እናቶች የታዘዙትን ቪታሚኖች እና ማዕድናት ብቻ እንዲወስድ ያዝዙ። ከመጠን በላይ መጠኑ ጎጂ ሊሆን ይችላል፡፡ ",
        "ምግብን መዝለል በተለይ ለነፍሰ ጡር እናቶች መጥፎ ተግባር መሆኑን መምከር። ፅንሱ ቋሚ የምግብ አቅርቦት ያስፈልገዋል፡፡",
        "ነፍሰ ጡር እናት የሆድ ድርቀትን ለማስወገድ ከፍተኛ ፋይበር የያዙ ምግቦችን እና ብዙ ፈሳሾችን እንድትጠቀም ማበረታታት።",
        "ነፍሰ ጡር እናቶች የአመጋገብ ልማዳቸውን እንዲያሻሽሉ ለመርዳት ቅድሚያ ይስጡ። ከታዳጊዎቹ ጋር፣ ገንቢ እና በተመሳሳይ ጊዜ፣ በአሥራዎቹ ዕድሜ ውስጥ የሚገኙ ምግቦችን እና መክሰስ ያቅዱ። የጉርምስና ዕድሜ እርግዝና የማይፈለግ ነው፡፡",
        "ለቤተሰብ እና ለነፍሰ ጡር ሴት የአመጋገብ ትምህርት ለመስጠት በእርግዝና ወቅት የእናቶች ከፍተኛ ተነሳሽነት ይጠቀሙ፡፡",
      ])
    ],
  ),
);