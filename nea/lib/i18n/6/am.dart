import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  title: "ሴቶችን ማብቃትና የወንዶች ተሳትፎ",
  coverImage: "assets/materials/images/4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(title: "ዓላማ፡ ", children: [
        "ጥሩ የቤተሰብ አመጋገብን በማስተዋወቅ ረገድ የወንዶች ሚና ያላቸውን ግንዛቤ ለማሳደግ እና ሴቶች ጥሩ አመጋገብን ለማግኘት በቤተሰብ ሃብት ዙሪያ ውሳኔ እንዲያደርጉ ለማበረታታት"
      ]),
      CourseBodyImage(
        image: "assets/materials/images/4.png",
      ),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ባልና ሚስት ያገኙትን ገቢ እንዴት መጠቀም እንደሚችሉ በጋራ መወያየት አለባቸው፡፡",
        "ባል በቤተሰቡ ውስጥ በቂ የተለያዩ ምግብ መኖሩን ማረጋገጥ አለበት።",
        "ባል የሚስትን የሥራ ጫና ለመርዳት አስፈላጊ በሚሆንበት ጊዜ መደገፍ አለበት።",
        "ሚስት ለመስራት በቂ ጊዜ እንድታገኝ ነፃ ጊዜ ሊኖራት ይገባል፡፡",
        "ባልና ሚስት በጋራ መወያየት እና የቤተሰብ ምግቦችን ማቀድ አለባቸው፡፡",
        "ባልና ሚስት በጋራ በመወያየት በምግብ አቅርቦት ላይ ክፍተቶችን መለየት አለባቸው፡፡",
      ]),
      SubTitleText(text: 'ሴቶችን ማብቃት ለምን ያስፈልጋል?'),
      Bullet(children: [
        "ሴቶች በስልጣን እና በውሳኔ ሰጪነት ሚና ዝቅተኛ ውክልና ስላላቸው፡፡",
        "ሴቶች ለእኩል ሥራ እኩል ያልሆነ ክፍያ ያገኛሉ።",
        "ለአካላዊ እና/ወሲባዊ ጥቃት ስለሚጋለጡ።",
        "ተመሳሳይ የስራ እድሎች፣ ትምህርት፣ ስልጠና እና ሙያዊ እድገት እድሎች ስለማያገኙ።",
        "ሴቶች በኢኮኖሚ የተቸገሩ እና ለንግድ ስራ ለመወዳደር እኩል እድል ስለሌላቸው።",
        "የሥርዓተ-ፆታ እኩልነት በውሳኔ ሰጪዎች ትኩረት ስላልተሰጠው፡፡",
      ]),
      SubTitleText(text: 'እድሎች'),
      Bullet(children: [
        "የሴቶችን ጤና መደገፍ የቤተሰቡን ገቢ በማሻሻል እድገትን ያመጣል፡፡",
        "በሴቶች ላይ የሚደርሱ ጥቃቶችን መፍታት የድርጅቶችን ወጪ ይቀንሳል።",
        "ለሴቶች ሃላፊነትን መስጠት ምርታማነትን ይጨምራል።",
        "በሴቶች ባለቤትነት ስር ባሉ የንግድ ሥራዎች ላይ ኢንቨስት ማድረግ ለኢንቨስትመንት ከፍተኛ ትርፍ ያስገኛል።",
        "የሴቶችን የሸማች ሃይል መጠቀም ብልህ የንግድ ውሳኔ ነው።",
        "ሴቶችን በአመራር ላይ ማሳደግ ወደ ድርጅታዊ ውጤታማነት ብልጽግና መስመር ይመራል።"
      ]),
      Paragraph(
          title:
              'ሴቶችን ማብቃት ለዘላቂ ልማት ወሳኝ ነው። ሴቶች በሁሉም ዘርፎች እና በሁሉም የኢኮኖሚ እንቅስቃሴዎች ውስጥ ሙሉ በሙሉ እንዲሳተፉ ማብቃት ለሚከተሉት አስፈላጊ ነው፡፡',
          body: ""),
      Bullet(children: [
        "የኢኮኖሚ እድገትን በማስፋት ጠንካራ ኢኮኖሚዎችን መገንባት።",
        "ማህበራዊ ልማትን ማሳደግ እና የተረጋጋ እና ፍትሃዊ ማህበረሰብን ማቋቋም።",
        "ለሴቶች፣ ለወንዶች፣ ለቤተሰብ እና ለማህበረሰብ የህይወት ጥራትን ማሻሻል።",
        "የንግድ ሥራዎችን እና ግቦችን ያንቀሳቅሱ እና የንግድ ሥራ አፈፃፀምን ማሳደግ።"
      ])
    ],
  ),
);
