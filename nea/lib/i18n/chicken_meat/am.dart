import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/images/206.png',
  title: 'የዶሮ ስጋ',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/images/203.jpg'),

    SubTitleText(
      text: "የዶሮ ስጋን የመመገብ የጤና ጥቅሞች",
    ),
    Paragraph(
        title: "",
        body:
            "ዶሮ በዓለም ዙሪያ በሁሉም የዕድሜ ክልል ውስጥ ካሉ ሰዎች መካከል በጣም ዋጋ ከሚሰጣቸው ምግቦች ውስጥ አንዱ ነው። ለተለያዩ የምግብ አሰራር ወጎች ወሳኝ አካል ብቻ ሳይሆን ስንመገበውም በጣም ገንቢ እና ጣፋጭ ነው። ትልቅ የፕሮቲን ምንጭ የሆነው ዶሮ ከበርካታ የጤና ጠቀሜታዎች ዝርዝር ጋር እንደሚከተለው ቀርቧል፡፡"),
    SubTitleText(
      text: "የዶሮ ስጋ ጡንቻዎችን ለመገንባት ይረዳል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "ዶሮ ከአትክልት ውጪ ከሆኑ የፕሮቲን ምንጮች አንዱ ነው። ስስ ስጋ ነው፡፡ ይህም ማለት ብዙ ፕሮቲኖችን እና አነስተኛ መጠን ያለው ስብ ይዟ፡፡ 100 ግራም የተጠበሰ ዶሮ 31 ግራም ፕሮቲን ይይዛል፡፡ ይህም ክብደት መጨመር እና ጡንቻዎችን ለመገንባት ለሚፈልጉ በጣም ጠቃሚ ያደርገዋል፡፡"),
    SubTitleText(
      text: "የዶሮ ስጋ የአጥንትዎን ጤንነት ይጠብቃል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "ዶሮ ከፕሮቲን በተጨማሪ እንደ ፎስፈረስ እና ካልሲየም ባሉ ማዕድናት የበለፀገ በመሆኑ አጥንትን እንዳያረጅ ይረዳል። በተጨማሪም የዶሮ ስጋ ሴሊኒየም ስላለው የመገጣጠሚያ አእብጠት ስጋትን እንደሚቀንስ የታወቀ ነው፡፡"),
    SubTitleText(
      text: "የዶሮ ስጋ ጭንቀትን ያስወግዳል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "ዶሮ ውጥረትን ለመቀነስ በጣም ጥሩ የሆኑ ሁለት ንጥረ ነገሮች አሉት እነሱም ትሪፕቶፋን እና ቫይታሚን B5፡፡ ሁለቱም በሰውነታችን ላይ የመረጋጋት ስሜት ይሰጣሉ፡፡ በተጨማሪም ፣ በጣም ጥሩ ጣዕም ያለው እና ጭንቀትን በመቀነስ ፣ ደስታን የሚፈጥር ባህሪያትን ይጨምራል።"),
    SubTitleText(
      text: "የዶሮ ስጋ ከወር አበባ በፊት ያለ ህመምን ይቀንሳል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "በዶሮ ውስጥ የሚገኘው ማግኒዥየም ከወር አበባ በፊት የሚመጡ የሕመም ምልክቶችን ለማስታገስ እና አንዲት ሴት በወር አበባዋ ወቅት ሊያጋጥማት የሚችለውን የተለያዩ የስሜት ለውጦችን ለመከላከል ይረዳል። ከወር አበባ በፊት ያለ ህመምን ለመቀነስ የዶሮ ስጋ መመገብ"),
    SubTitleText(
      text: "የዶሮ ስጋ የቴስቶስትሮን መጠን እንዲጨምር ይረዳል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "ወንዶች በዚንክ የበለፀጉ ምግቦችን መመገብ አለባቸው ምክንያቱም ቴስቶስትሮን መጠንን ለመቆጣጠር እና የወንድ የዘር ፍሬን ለማምረት ይረዳል ።"),
    SubTitleText(
      text: "የዶሮ ስጋ በሽታ የመከላከል አቅምን ይጨምራል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "የዶሮ ሾርባ ለጉንፋን እና ለሌሎች የተለመዱ የመተንፈሻ አካላት ተላላፊ በሽታዎችን ለማስታገስ የቤት ውስጥ መፍትሄ ሆኖ ቆይቷል። ትኩስ የዶሮ ሾርባ የአፍንጫ እና የጉሮሮ መጨናነቅን ለማስወገድ ይረዳል ። ይህንን የተመለከት ጥናት እንደሚያሳየው የዶሮ ሾርባ የኒውትሮፊል ፍልሰትን የሚገታ ሲሆን ይህም የበሽታ መከላከያ ሴል አይነት ነው፡፡ በዚህም በተለመደው ኢንፌክሽን ወቅት እብጠትን በመቀነስ የበሽታ መከላከያዎችን ይጨምራል፡፡"),
    SubTitleText(
      text: "የዶሮ ስጋ የልብ ጤናን ያበረታታል",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "በቫይታሚን B6 የበለፀገ ዶሮ የልብ ድካምን ለመከላከል ጠቃሚ ነው። ቫይታሚን B6 ለልብ ድካም ስጋት ከሚዳርጉ ዋና ዋና ክፍሎች ውስጥ አንዱ የሆነውን የሆሞሳይስቴይን መጠን በመቀነስ ይረዳል። በተጨማሪም ዶሮ ጥሩ የኒያሲን ምንጭ ሲሆን ይህም የኮሌስትሮል መጠንን ለመቀነስ ይረዳል፡፡ ይህም ለልብ ሕመም እድገት አደጋ ነው፡፡"),
    SubTitleText(
      text: "የዶሮ ስጋ አበሳሰል ዘዴዎች - በደረቅ ሙቀት የማብሰል ዘዴዎች",
    ),
    Paragraph(
        title: "",
        body:
            "ይህ ሂደት እርጥብ ሳያደርጉ የማብሰል ዘዴ ነው፡፡ በእርጥበት ሙቀት ማብሰያ ዘዴዎች ከሚጠቀሙት የበለጠ የሙቀት መጠን በመጠቀም በደረቅ ሙቀት የማብሰል ሲሆን ይህም በምግብ የአመጋገብ ሂደት ላይ የተለያዩ የአበሳሰል ሂደትቶች አሉት፡፡ ከአብዛኞቹ ንጥረ ነገሮች በስተቀር ሁሉም ሙቀት-ነክ የሆኑ ንጥረ ነገሮች በደረቅ ሙቀት አበሳሰል ዘዴ በተወሰነ ደረጃ ይጎዳሉ፡፡"),
    SubTitleText(text: "1. አርስቶ አጠባበስ"),
    CourseBodyImage(image: 'assets/materials/images/206.png'),
    Paragraph(
        title: "",
        body:
            "መጥበስ በደረቅ ሙቀት ውስጥ በስብ ወይም በዘይት በመታገዝ ምድጃ ውስጥ ማብሰል ነው። በምድጃ ውስጥ ስጋን ወይም አትክልቶችን ማብሰል መድረቅን ለመከላከል እና ቀለምን እና ጣዕምን ለማዳበር በሙቅ ስብ ማብሰል ይመከራል፡፡ ይህ ዘዴ የጨረር ሙቀትን በመጠቀም ምግብ የማብሰል ዘዴ ሲሆን የምድጃ ማብሰያ ኮንቬክሽን እና ጨረሮችን ያጣምራል፡፡ መጥበስ 2 አይነት ዘዴዎች አሉት"),
    Paragraph(
        title: "ሀ. በምድጃ መጥበስ: -",
        body:
            "በምድጃ ውስጥ በስብ በመታገዝ ማብሰል እና ለአንደኛ ደረጃ ስጋ የዶሮ ስጋ እና አንዳንድ አትክልቶች ላይ ይተገበራል፡፡"),
    Paragraph(
        title: "ለ. አርስቶ አጠባበስ፡-",
        body:
            "በቀጥታ (በጨረር) ሙቀት በስብ እርዳታ ማብሰል ነው፡፡ አርስቶ ያለማቋረጥ መዞር አለበት)። ይህ ዘዴ ስጋን ሳይገነጣጥሉ ለማብሰል የመጀመሪያው የማብሰያ ዘዴ ነው፡፡ ነገር ግን በብዙ ሰውች የምድጃ ማብሰያ ይመረጣል፡፡"),
    Remember(title: "ማስታወሻ", children: [
      "ጥብሱ አንዲያምር ባልተከደነ መጥሻ መጠበስ አለበት",
      "ስጋ በአብዛኛው የሚጠበሰው በመደርደሪያ ላይ ነው (ወይንም የጎድን አጥንት ጥብስ ከሆነ በራሱ የተፈጥሮ አጥንት ላይ)።",
      "በተለመደው ምድጃ ውስጥ በሚጠበስበት ጊዜ ምግብ ማብሰያው የስጋውን አቀማመጥ አልፎ አልፎ በመለወጥ ያልተስተካከለ ሙቀትን መፍቀድ አለበት፡፡ በበሩ ላይ ሙቀት ስለሚጠፋ የምድጃው ጀርባ ብዙ ጊዜ ይሞቃል፡፡"
    ]),
    SubTitleText(text: "የስጋ መጥበስ ጥቅሞች", fontSize: 16.0),
    Bullet(children: [
      "ተስማሚ ጥራት ያላቸው የስጋ ማያያዣዎች ሊጣበቁ ይችላሉ እና ጣዕማቸው በደንብ የተገነባ ነው፡፡",
      "ስጋው በሚጠበስበት ጊዜ ትኩረት ያስፈልገዋል፡፡",
      "ከመገጣጠሚያው ውስጥ የሚገኙት የስጋ ክፍሎች ለመቅመስ እና ጣዕምን ለመጨመር ያገለግላሉ፡፡",
      "እሳት አደጋን ይቀንሳል ፡፡",
      "በአሩስቶ መጥበስ ልዩ ክህሎት እና ቴክኒኮች ይጠይቃል።",
      "ይህ አጠባበስ ነዳጅ እና ጉልበት ይድናል፡፡",
    ]),
    SubTitleText(text: "የጊዜ እና የሙቀት መጠን ቁጥጥር", fontSize: 16.0),
    Bullet(children: [
      "ምድጃዎች አስቀድመው መሞቅ አለባቸው",
      "የማብሰያ ትሪዎች በጣም ትንሽ ከሆነ ተስማሚ መሆን አለባቸው በጣም ትልቅ ከሆኑ ፣ በትሪው ውስጥ ያለው ስብ ይቃጠላል የስጋውን ጣዕምም ያበላሸዋል።",
      "ጥቅጥቅ ያለ ደረቅ ጨርቅ በመጠቀም በማንኛውም ጊዜ ትኩስ የማብሰያ ትሪዎችን በጥንቃቄ ይያዙ።",
      "ምግብ ከማብሰያው ትሪ ከማስወገድዎ በፊት ንጽህናው በተጠበቀ ሁኔታ መያዙን ያረጋግጡ።",
    ]),
    // SubTitleText(text: "Safety"),
    // Bullet(children: [
    //   "Roasting trays should be suitable if too small; basting becomes difficult and dangerous; if too large, fat in the tray will burn, spoiling the flavor of the meat and gravy.",
    //   "Handle hot roasting trays carefully at all times, using a thick, dry cloth.",
    //   "Ensure food is securely held before removing it from the roasting tray."
    // ]),
    SubTitleText(text: "2. በጋለ ዘይት መጥበስ"),
    Paragraph(
        title: "",
        body:
            "መጥበስ ከፍተኛ ሙቀትን የሚያካትት ፈጣን፣ ምቹ እና ታዋቂ የማብሰል ዘዴ ነው። ቅባቶች ወይም ዘይቶች ጥቅም ላይ ይውላሉ፡፡"),
    Paragraph(
        title: "ሁለት ዓይነት የመጥብስ ዘዴዎች አሉ፡፡:-", body: "ለብ ለብ አጠባበስ እና በጥልቀት መጥበስ"),
    SubTitleText(text: "2.1 ለብ ለብ አጠባበስ"),
    SubTitleText(
      text: "የለብ ለብ አጠባበስ ዘዴዎች",
      fontSize: 16.0,
    ),
    Paragraph(
        body: "",
        title: "ለብ ለብ አጠባበስ የስብ ወይም የዘይት መጠን በመጠቀም አራት የማብሰያ ዘዴዎች አሉ።:"),
    Paragraph(
        title: "ለብ ለብ ጥብስ:-",
        body:
            "በትንሽ ቅባት መጠን ምግብ ማብሰል ሲሆን የምግቡ ማቅረቢያ በመጀመሪያ የተጠበሰ መሆን አለበት ምክንያቱም ይህ ጎን የተሻለ መልክ ይኖረዋል ምክንያቱም ስቡ ንጹህ ነው፡፡ ከዚያም ሁለቱም ወገኖች እንዲበስሉ እና ቀለም እንዲቀቡ ይደረጋል፡፡ ይህ ትናንሽ የዓሣ፣ የስጋ፣ የዶሮ እና ትናንሽ ሙሉ ዓሦች ቁርጥራጮችን ይመለከታል። እንቁላል ፓንኬኮች እና አንዳንድ አትክልቶች በዚህ ዘዴ ይጠበሳሉ፡፡"),
    Paragraph(
        title: "መረቅ::-",
        body:
            "የተቆረጠ የስጋ እና የዶሮ ስጋ መጥበሻ ውስጥ ይዘጋጃል፡፡ ምግቡ በሁለቱም በኩል ከተበሰለ በኋላ, ስቡ ይጣላል ድስቱ በአልኮል ወይም በወይን ይቀልጣል፡፡"),
    Paragraph(
        title: "ፍርግርግ:-",
        body:
            "በፍርግርግ ላይ የሚበስሉ ምግቦች (ጠንካራ የብረት ሳህን)፡- ሀምበርገር፣ ቋሊማ ወይም የተከተፈ ሽንኩርት ቀድሞ በትንሹ ዘይት በተቀባ ፍርግርግ ላይ ስጋን የማብሰል ዘዴ ነው፡፡"),
    Paragraph(
        title: "ለጋ ጥብስ:-",
        body: "አትክልት የበሬ ሥጋ ዶሮ ወዘተ ... መጥበሻ ውስጥ በትንሽ ስብ ወይም ዘይት ሊጠበስ ይችላል፡፡"),
    SubTitleText(text: "2.2 በጥልቀት በማብሰል መጥበስ"),
    Paragraph(
        title: "",
        body:
            "ይህ በቅድሚያ በማሞቅ ዘይት ወይም የተጣራ ስብ ውስጥ ምግብ ማብሰል ነው፡፡ ምግብ በሚበስልበት ጊዜ በስብ እንዲሸፈን ምግቡን በሙቀት ስብ ውስጥ ማስገባትን ያካትታል።"),
    // SubTitleText(
    //   text: "በ ጥልቅ ጥብስ ምግብ ማዘጋጀት",
    //   fontSize: 16.0,
    // ),
    Paragraph(
        title: "",
        body:
            "በጥልቅ የተጠበሱ ምግቦች፣ ለምሳሌ፣ አሳ፣ ስጋ እና ፍራፍሬ፣ መጀመሪያ ከመጠን በላይ ማብሰልን፣ ከምግቡ ውስጥ ያለውን ንጥረ ነገር ማጣት እና ከመጠን በላይ መብሰልን ለመከላከል መቀባት አለባቸው።"),
    Paragraph(title: "ተስማሚ የመከላከያ ሽፋኖች የሚከተሉትን ያካትታሉ:-", body: ""),
    Bullet(children: [
      "የተከተፈ እንቁላል እና የዳቦ ፍርፋሪ",
      "የተፈጨ ዱቄት እና የተከተፈ እንቁላል",
      "ዱቄት የተበጠበጠ እንቁላል ወይም የዳቦ ፍርፋሪ",
      "እንቁላል ዱቄት እና ወተት",
    ]),
    Paragraph(
        title: "",
        body:
            "የስብ ሞለኪውሎች በከፍተኛ ሙቀት ውስጥ መበስበስ ስለሚከሰት ስብ ከሚፈለገው የሙቀት መጠን በላይ መሞቅ የለበትም፡፡ ይህ ደግሞ ነፃ የሰባ አሲድ እንዲለቀቅ ያደርገዋል፡፡ ይህም ስብን የመጠበቅ ባህሪያት እና ጣዕም ይጎዳል፡፡"),
    SubTitleText(
      text: "በጥልቀት የማብሰል ዘዴዎች",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "ሀ. የተለመደው የማብሰል ዘዴ ",
        body: "በወተት እና በዱቄት፣ በእንቁላል እና በሊጥ ወይም መጋገሪያ ላዩን ቀብቶ ለማብሰል"),
    Bullet(children: [
      "የምግቡን ገጽታ ከኃይለኛ ሙቀት መጠበቅ",
      "ከእርጥበት እና ከአልሚ ምግቦች መባከን መከላከል",
      "የኃይለኛውን ሙቀት በፍጥነት መግባቱን መቆጣጠር",
    ]),
    Paragraph(
        title: "",
        body:
            "ምግቡ በጥንቃቄ በተቀዳ ዘይት ወይም ስብ ውስጥ ይቀመጣል, እስኪዘጋጅ እና ወርቃማ ቡናማ እስኪሆን ድረስ የተጠበሰ, በደንብ ይደርቃል እና ያገለግላል፡፡"),
    Paragraph(
        title: "ለ. ከፊል ጥልቅ-ጥብስ ",
        body:
            "መቧጠጥ በመባል ይታወቃል እና በተቆራረጡ ድንች ላይ ሊተገበር ይችላል:: ዓላማው ከአገልግሎት በፊት ምግብ ማብሰል እና በፍጠነት ትዕዛዝ ለማድረስ ይጠቅማል፡፡"),
    Remember(title: "አጠቃላይ ህጎች", children: [
      "መጥበሻዎችን በስብ ወይም በዘይት ወይም በሚበስል ምግብ በጭራሽ አይሙሉ።",
      "የተለመደው የመጥበሻ መቀት በ 1750 ዲግሪ ሴልስየስ እና 1950 ዲግሪ ሴልስየስ መካከል መሆን አለበት፡፡",
      "ብዙ ምግብ በአንድ ጊዜ ለመጠበስ አይሞክሩ።",
      "የሚቀጥለውን የምግብ ስብስብ ከመጨመራቸው በፊት ስቡ ከሙቀቱ እንዲያገግም ይፍቀዱለት፡፡",
      "ትክክለኛውን የዘይት/የስብ ጥምርታ ከምግብ ጋር ያረጋግጡ።",
      "ዘይት እና ቅባት ከተጠቀሙ በኋላ መጸዳት አለባቸው፡፡ ያለበለዚያ የቀረው የምግብ ቅንጣቶች ስቡ በሚሞቅበት ጊዜ ይቃጠላሉ እናም ስለዚህ የምግቡን ገጽታ እና ጣዕም ያበላሻሉ፡፡",
      "ኦክሳይድን ለመከላከ ዘይት ወይም ስብን ሁልጊዜ ጥቅም ላይ በማይውልበት ጊዜ ይሸፍኑት፡፡"
    ])
  ]),
);
