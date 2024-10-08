import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/utils/open_url.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/course_video_player.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  title: "የህጻናት አመጋገብ",
  coverImage: "assets/materials/images/14.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      CourseBodyImage(image: "assets/materials/images/14.png"),
      Objectives(
          title: "ዓላማ፡ ",
          children: ['አዲስ የተወለዱ ሕፃናትን ጡት በማጥባት ስለሚሰጠው ጥቅም ግንዛቤ መፍጠር']),
      SubTitleText(text: "ከ ከወሊድ እስከ 6 ወራት የሆናቸው ሕፃናት ተጨማሪ ምግብ አመጋገብ"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "በተወለዱ በመጀመሪያዎቹ 30 ደቂቃዎች ውስጥ ልጅዎን ጡት ማጥባት ይጀምሩ።",
        "ጡት ማጥባት መጀመር የወተት ምርትን ይጨምራል እንዲሁም እርስዎን ጤነኛ ያደርጋል፡፡",
        "ጡት ማጥባት ማህፀን በፍጥነት ወደ መጀመሪያው ቅርፅ እንዲመለስ እንዲሁም የደም መፍሰስን ያስቆማል፡፡",
        "በመጀመሪያወቹ ስድስት ወራት ለልጅዎ የእናት ጡት ወተት ብቻ ይመግቡ፡፡",
        "ህጻናት ከተወለዱ ከስድስት ወር በኋላ ተጨማሪ ምግብ በየ 20 እና 45 ደቂቃዎች መካከል ይመግቡ፡፡",
        "በመጀመሪያወቹ 6 ወራት የእናት ጡት ብቻ መመገብ ህጻናት የተስተካከለ እድገት አእንዲኖራቸው፡ ጤነኛ እንዲሆኑ ይረዳል፡፡",
        "የእናት ጡት በቂ ውሃ ያለው፡ በሽታ የሚከላከል እና በቂ የሙቀት መጠን የያዘ ፈሳሽ ነው፡፡",
        "ልጅዎን በማነኛውም ስዓትና በሚፈለገው መጠን ጡት ማጥባት ይኖርብወታል።",
        "የህፃናትን አይን ይመልከቱ፣ ፊታቸውን እና ሰውነታቸውን በቀስታ ይምቱ እንዲሁም ጡት ሲያጠቡ ዘፈኖችን ይዘምሩ ።",
        "ከማጥባትወ በፊት እጅዎን በሳሙና ይታጠቡ፡፡",
        "ኤች።አይቪ ፖዘቲቭ ከሆኑ ወዲያውኑ ሃኪም ያማክሩ፡፡",
        "ህጻኑ አምስትይ ወር ሲሆነው እንዴት መመገብ እንደሚችሉ ማሰብ እና መዘጋጀት ይጀምሩ፡፡"
      ]),
      Remember(title: "ያስታውሱ፦", children: [
        "የልጅዎን የጡት ወተት ከወለዱ በኋላ ባሉት ስድስት ወራት ውስጥ ብቻ ይመግቡ, ምንም አይነት ፈሳሽ, ውሃ እንኳን አይስጡ"
      ]),
      SubTitleText(text: "ህጻናት 6 ወራት ከሆናቸው በኋላ ተጨማሪ ምግብ ስለማስጀመር"),
      Objectives(
          title: 'ዓላማ፡ ',
          children: ["ሕፃናትን 7 ወራት ሲሞላቸው ተጨማሪ ምግብ ማስጀመር ስለሚሰጠው ጥቅም ግንዛቤ መፍጠር"]),
      CourseBodyImage(image: "assets/materials/images/3.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        " ሕፃናት ሰባት ወር ሲሞላቸው ከሌሎች ምግቦች ተጨማሪ ንጥረ ነገሮችን ይፈልጋሉ፡፡",
        "ሕፃናት ሰባት ወር ሲሞላቸው በቀን ከ 2 እስከ 3 ጊዜ የተመጣጠነ ምግብ መመገብ ይጀምሩ፡፡",
        "በእያንዳንዱ የምግብ ስዓት ከ2-3 የሾርባ ማንኪያ ምግብ በመስጠት ያለማምዱት።",
        "በተዘጋጀው የተመጣጠነ ምግብ ውስጥ ተጨማሪ የእንስሳት ወተት ይጨምሩ።",
        "ምግቡ ከማንኪያው ላይ እንዳይፈስ ወፍራም መሆኑን ያረጋግጡ።",
        "ልጅዎን በኃይል ሳይሆን በዝግታ እና በትዕግስት ይመግቡ፡፡",
        "ልጅዎ ማልቀስ ከመጀመሩ በፊት እንደተራበ የሚያሳዩ ምልክቶችን ይፈልጉ፡፡",
        "ልጅዎን ለመመገብ ጠርሙሶችን አይጠቀሙ፡ ጠርሙሶች ንጽህናን ለመጠበቅ በጣም አስቸጋሪ በመሆናቸው ልጅዎን ለተቅማጥ ህመም ሊያጋልጡት ይችላሉ፡፡",
        "የእናት ጡት ወተት ለልጅዎ በጣም አስፈላጊ ሆኖ ይቀጥላል። ሌሎች ምግቦችን ከመስጠትዎ በፊት በመጀመሪያ ልጅዎን ጡት ያጥቡት፡፡",
        "ልጅዎ ሁለት ዓመትና ከዚያ በላይ እስኪሆን ድረስ ጡት ጡት ማጥባትዎን ይቀጥሉ።"
      ]),
      Remember(
          title: "ያስታውሱ፦",
          children: ["ተጨማሪ ምግቦች በቀን 2-3 ጊዜ በ 7 ወራት ውስጥ ይጀምራሉ"]),
      SubTitleText(text: "ከ 7 እስከ 8 ወራት የሆናቸው ሕፃናት ተጨማሪ ምግብ አመጋገብ"),
      Objectives(title: 'ዓላማ፡ ', children: [
        "ከ 7 እስከ 8 ወራት የሆናቸው ሕፃናት ምን እና እንዴት መመገብ እንዳለባቸው ግንዛቤ መፍጠር"
      ]),
      CourseBodyImage(image: "assets/materials/images/16.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ልጅዎን ጤናማ ሆኖ እንዲቆይ ቀንና ሌሊት ጡት ማጥባትዎን ይቀጥሉ።",
        "የእናት ጡት ወተት ለልጅዎ በጣም አስፈላጊ ስለሆነ ከሁለት ዓመት በላይ እስኪሆነው ድረስ ጡት ማጥባትዎን ይቀጥሉ",
        "ሕፃኑ 7 ወራት ከሞላው ጀምሮ በቀን 3 ጊዜ እና በዋና ምግቡ መካከል ከ 1 እስከ 2 መክሰስ ይመግቡት፡፡",
        "ቀስ በቀስ የምግቡን መጠን በመጨመር ህጻኑን ቶሎ ቶሎ መመገብዎን ይቀጥሉ፡፡",
        "ህፃኑ በቀላሉ ማኘክ እና መዋጥ እንዲችል ምግቦቹን መፍጨት እና ማለስለስ አይርሱ፡፡ ለዚህም የእናት ጡት ወተት ወይም ሌላ የእንስሳት ወተትን ለማለስለሻነት ይጠቀሙ፡፡",
        "ህፃኑ እያደገ ሲሄድ የልጅዎን ምግብ በመጠኑ ወፍራም ያድርጉት፡፡",
        "በህፃኑ በየቀኑ ውስጥ ቢያንስ 5 የምግብ አይነቶች ለማካተት ይሞክሩ፡፡",
        "ለልጅወ ገንፎ በማዘጋጀት ይመግቡተ፡፡ ለዚህም ትንሽ መጠን ያለው ዘይት፡ የተፈጨ አትክልት፣ የተፈጨ ፍራፍሬ፣የእንስሳት ወተት በመጨር ያዘጋጁ፡፡",
        "በልጅዎ ምግብ ውስጥ በአዮዲን የበለጸገ ጨው ይጨምሩ።",
        "ልጅዎ ማልቀስ ከመጀመሩ በፊት እንደተራበ የሚያሳዩ ምልክቶችን ይፈልጉ እንጅ በጭራሽ እንዲበላ አያስገድዱት፡፡"
      ]),
      Remember(title: "ያስታውሱ፦", children: [
        "ከ 7 ወር ጀምሮ ልጅዎን በቀን 3 ጊዜ ይመግቡ. በምግብ መካከል ከ 1 እስከ 2 ምግብ (ፍራፍሬ, የተፈጨ ለውዝ) ይስጡ"
      ]),
      SubTitleText(text: "ከ 9 እስከ 11 ወራት የሆናቸው ሕፃናት ተጨማሪ ምግብ አመጋገብ"),
      Objectives(title: 'ዓላማ፡ ', children: [
        "ከ 9 እስከ 11 ወራት የሆናቸው ሕፃናት ምን እና እንዴት መመገብ እንዳለባቸው ግንዛቤ መፍጠር"
      ]),
      CourseBodyImage(image: "assets/materials/images/17.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ከ 9 ወር ጀምሮ ልጅዎን በቀን 4 ጊዜ ይመግቡ (3 ምግቦች እና ከ 1-2 መክሰስ ይጨምሩበት)።",
        "ህጻኑ 9 ወር ሲሆነው እንደ የበሰለ ማንጎ እና ፓፓያ፣ ሙዝ እና አትክልቶች እንዲሁም ፍራፍሬ ምግቦችን መመገብ መጀመር አለበት።",
        "በየቀኑ ቢያንስ 5 የምግብ አይነቶችን በህጻኑ ምግብ ላይ ለማካተት ይሞክሩ፡፡",
        "በልጅዎ ምግብ ውስጥ ትንሽ መጠን ያለው ዘይት ወይም ቅባት ይጨምሩ። የእንስሳት ወተት መመገብ ለልጅዎ ጤናን ይጨምራል፡፡",
        "ህጻኑ ምግቡን በሙሉ መብላቱን ለማረጋገጥ የራሱን ሰሃን ይስጡት።",
        "በልጅዎ ምግብ ውስጥ በአዮዲን የበለጸገ ጨው ይጨምሩ።",
        "ልጅዎ ማልቀስ ከመጀመሩ በፊት እንደተራበ የሚያሳዩ ምልክቶችን ይፈልጉ እንጅ በጭራሽ እንዲበላ አያስገድዱት፡፡",
        "ምግብ ከማዘጋጀትዎ ፤ልጅዎን ከመመገብዎ በፊት እና በኋላ እጅዎን በሳሙና ይታጠቡ።",
        "ልጅዎ ሁለት ዓመት እና ከዚያ በላይ እስኪሆነው ድረስ ጡት ማጥባትዎን ይቀጥሉ፡፡ የአእናት ጡት ወተት ጤንነቱን እና ጥንካሬውን በመጠብቅ አቻ ስለሌለው፡፡"
      ]),
      Remember(title: "ያስታውሱ፦", children: [
        "ተጨማሪ ምግብን በጥንቃቄ ማዘጋጀት እና ማከማቸት፡ ምግብ በተሸፈነና ንጹህ መያዣ ውስጥ በማጠራቀም ምግብ ካበስል በ2 ሰአት ውስጥ ለልጅዎ ይስጡት (ፍሪጅ ከሌለዎት)"
      ]),
      SubTitleText(text: "ከ 12 እስከ 24 ወራት የሆናቸው ሕፃናት ተጨማሪ ምግብ አመጋገብ"),
      Objectives(title: 'ዓላማ፡ ', children: [
        "ከ 12 እስከ 24 ወራት የሆናቸው ሕፃናት ምን እና እንዴት መመገብ እንዳለባቸው ግንዛቤ መፍጠር"
      ]),
      CourseBodyImage(image: "assets/materials/images/18.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "በ 12 ወራት ውስጥ ለህጻኑ ከቤተሰብ ምግብ ይስጡት፡፡ ልጁ በዝግታ ስለሚመገብ መብላቱን ለማረጋገጥ የራሱን/የራሷን ሳህን ይስጡት፡፡",
        "ህፃኑ በቀን 3-4 ጊዜ ይመግቡ በመካከልም ከ1-2 መክሰስ ይጨምሩበት።",
        "ህፃኑ በቀላሉ ማኘክ እና መዋጥ እንዲችል ምግቡን በትናንሽ ቁርጥራጮች ይቁረጡ።",
        "በየቀኑ ቢያንስ 5 የምግብ አይነት ምግቦችን ያካትቱ፡፡",
        "በልጅዎ ምግብ ውስጥ ትንሽ መጠን ያለው ዘይት ወይም ቅባት ይጨምሩ። የእንስሳት ወተት መመገብ ለልጅዎ ጤናን ይጨምራል፡፡",
        "በልጅዎ ምግብ ውስጥ በአዮዲን የበለጸገ ጨው ይጨምሩ።",
        "ተቅማጥን ለማስወገድ የህጻኑን ምግቦችን በንጹህ እና ደህንነቱ በተጠበቀ ቦታ ያስቀምጡ፡፡",
        "ምግብ ከማዘጋጀትዎ ፤ልጅዎን ከመመገብዎ በፊት እና በኋላ እጅዎን በሳሙና ይታጠቡ።",
        "ልጅዎን ሁለት አመት እስኪሞላው ድረስ ጡት ማጥባትዎን ይቀጥሉ፡፡"
      ]),
      // Remember(title: "ያስታውሱ፦", children: [
      //   "Safe preparation and storage of complementary foods: Store food in a covered, clean container and give it to your baby within 2 hours after cooking (if you don’t have a refrigerator)"
      // ]),
      SubTitleText(text: "በህመም ጊዜ የህጻናት አመጋገብ ሂደት"),
      Objectives(
          title: 'ዓላማ፡ ',
          children: ["ሕፃናት በታመሙ ጊዜና ከህመም በኋላ እንዴት መመገብ እንዳለባቸው ግንዛቤ መፍጠር"]),
      CourseBodyImage(image: "assets/materials/images/19.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        "ልጆች በህመም ጊዜና ከህመም በኋላ የተመጣጠነ ምግብ ከመስጠት በተጨማሪ ጡት ማጥባት በፍጥነት እንዲያገግሙ ይረዳቸዋል፡፡",
        "ህጻኑ ሲታመም በፍጥነት እንዲያገግም ቶሎ ቶሎ ጡት ማጥባት ይኖርብዎታል፡፡",
        "ልጅዎ በህመም ጊዜ ተቅማጥ ካለው የቀነሰዉን ክብደት መልሶ እንዲያገኝ ጡት ማጥባት አስፈላጊ ነው፡፡",
        "ልጅዎ ለመጥባት በጣም ደካማ ከሆነ፣ወተቱን በማለብ በኩባያ ያጠጡት፡፡",
        "ጡት ከማጥባት በተጨማሪ ሀኪሙ የሚሰጠውን የህክምና ምክር ይከተሉ።",
      ]),
      Remember(
          title: "ያስታውሱ፦",
          children: ["ህፃኑን ጡት ማጥባትዎን እና ትንሽ ምግብን ቢያንስ በቀን 8 ጊዜ መስጠትዎን ያስታውሱ"]),
      SubTitleText(text: "የህጻናት ስርዓተ ምግብ አገልግሎት አስፈላጊነት"),
      Objectives(title: 'ዓላማ፡ ', children: [
        "ህጻናት ከተወለዱበት ሁለት አእስኪሆናቸው ድረስ ስለሚደረግ ስርዓተ ምግብ እንክብካቤ ግንዛቤ መፍጠር"
      ]),
      CourseBodyImage(image: "assets/materials/images/20.png"),
      KeyMessages(title: 'ጭብጥ መልዕክቶች', children: [
        Paragraph(title: "የጨቅላ ህጻናት እንደተወለዱ የሚደረግ እንክብካቤ", body: ""),
        "ጨቅላ ሕፃናትን በሙቅ ውሃ ማጠብ",
        "ህፃናት እንዲሞቁ ማድረግና ወዲያውኑ ጡት ብቻ ማጥባት",
        "የጤናቸዉን ሁኔታ ቶሎ ቶሎ መከታተል፡፡",
        Paragraph(title: "የድህረ ወሊድ እንክብካቤ", body: ""),
        "በጤና ሚኒስቴር መመሪያ መሰረት የክትባት እና የእድገት ክትትል ማድረግ፡፡",
        "የሕፃኑን ክብደት በየጊዜው መለካት",
        "የሕፃን/እናት የአደጋ ምልክቶችን መለየት አስፈላጊ ናቸው።",
        Paragraph(title: "ከ 6 ወር አእስከ 2 ዓመት", body: ""),
        "የኩፍኝ ክትባት እስከ 9 ወሩ ማስከተብ",
        "የትላትል እና ቫይታሚን ኤ እንክብሎችን 12 ወር እስኪሞላው መስጠት",
        "የእድገቱን ሁኔታ መከታተል አስፈላጊ ናቸው፡፡"
      ]),
      CourseVideoPlayer(video: 'assets/videos/kids_dietary_diversity.mp4'),
      InkWell(
        onTap: () {
          openUrl(
              'https://www.youtube.com/watch?v=5u9tFIXUZ00&list=PLOS5MMmDL-YfeyCd_9XH9OroWjFENho6P&index=2&ab_channel=CertaNutritio');
        },
        child: const Text(
          'ምንጭ - Youtube Certa Nutritio',
          style: TextStyle(color: Colors.blueAccent),
        ),
      ),
      // Remember(title: "ያስታውሱ፦", children: [
      //   "Always remember to take your child under the age of 5 to under five clinic so that their growth and development is monitored"
      // ])
    ],
  ),
);
