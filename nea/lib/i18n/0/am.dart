import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/utils/open_url.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/course_video_player.dart';
import 'package:nea/widgets/food_grid_list.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course AM = Course(
  title: "መግቢያ",
  coverImage: "assets/materials/images/nu.jpg",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Paragraph(
          title: "ምግብ ምንድን ነው? ",
          body:
              "ምግብ በሰውነት አካል ውስጥ እድገትን እና አስፈላጊ ሂደቶችን ለማስቀጠል እና ኃይልን ለማቅረብ በዋናነት ፕሮቲን ፣ካርቦሃይድሬት ፣ ስብ እና ሌሎች ንጥረ ነገሮችን ያቀፈ ንጥረ ነገር ነው። ሰውነታችን ምግብን መፍጨት እና መጠቀም ለሥነ-ምግብ መሠረታዊ ነገሮች ናቸው፡፡ "),
      const Paragraph(
          title: "ስርዓተ ምግብ ",
          body:
              " ስርዓተ ምግብ የምግብ ቅበላ እና የስነ ህይወት፣ማህበራዊ እና ኢኮኖሚያዊ ሂደቶች መስተጋብር ሲሆን ይህም በሰውነት እድገት፣ ተግባር እና ጥገና ላይ ተጽዕኖ ያሳድራል። "),
      const Paragraph(
          title: "ንጥረ ነገሮች ",
          body:
              "ንጥረ ነገሮች ሰውነታችን ለመኖር እና ለማደግ የሚጠቀምባቸው የምግብ ክፍሎች ናቸው። ሁለት ዓይነት ንጥረ ነገሮች አሉ-ማክሮ ንጥረ ነገሮች እና ማይክሮ ንጥረ ነገሮች ሲሆኑ የሰውነት ሜታቦሊዝም ሥርዓት እንዲሠራ የሚፈልገውን ከፍተኛ ኃይል ይሰጣሉ ፡፡ ማይክሮ ንጥረ ነገሮች ደግሞ ሜታቦሊዝምን ለማከናወን ተጨማሪ ሀይል ይሰጣሉ ። ሁለቱም የምግብ ዓይነቶች ከአመጋገብ ሊገኙ ይችላሉ፡፡ የማክሮ ንጥረ ነገሮች በ 4 ይከፈላሉ፦ ካርቦሃይድሬትስ፣ ፕሮቲኖች፣ ቅባት እና ውሃ ያካትታሉ፡፡ "),
      const SubTitleText(
        text: "ማክሮ ንጥረ ነገሮች",
      ),
      const SubTitleText(
        text: "ካርቦሃይድሬት",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "ካርቦሃይድሬት ",
          body:
              "ሰውነታችን በሕይወት እንዲቆይ፣ ሕብረ ሕዋሳትን እንዲገነባ እና እንዲጠግን፣ እንዲንቀሳቀስ እና እንዲሰራ ሃይል ይሰጣል። ካርቦሃይድሬት በአመጋገብ ስርዓት ውስጥ በጣም የበለፀገ ምግብ እና የኃይል ምንጭ ነው "),
      // const Paragraph(
      //     title: "",
      //     body:
      //         "What major food sources of carbohydrates does a diet include?"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/carbohydrates.png",
      //   // description: "በካርቦሀይድሬት የበለፀጉ ምግቦች",
      // ),
      const SubTitleText(
        text: "በካርቦሀይድሬት የበለፀጉ ምግቦች ፥",
        fontSize: 14,
      ),
      FoodGridList(foods: carbohydratesFood),
      const SubTitleText(
        text: "ፕሮቲኖች",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "ፕሮቲኖች ",
          body:
              "የተለያዩ ተግባራትን ያካተቱ አስፈላጊ አሚኖ አሲዶችን ይሰጣሉ። እድገት እና ግዝፈትን፣ የሕብረ ሕዋሳትን መጠገንን ወይም መተካትን ፣ የሜታቦሊክ እና የምግብ መፈጨትን ኢንዛይሞችን ማምረትን እና አንዳንድ ሆርሞኖችን ማምረትን ያከናውናሉ። "),
      // const Paragraph(
      //     title: "",
      //     body: "What major food sources of proteins does a diet include?"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/proteins.png",
      //   description: "በፕሮቲን የበለፀጉ ምግቦች",
      // ),
      // Fats
      const SubTitleText(
        text: "ስብ",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "ቅባቶች ",
          body:
              "የሴል ሽፋኖችን ለመገንባት እና ሆርሞኖችን ለማምረት አስፈላጊ ናቸው፡፡ በተጨማሪም ሰውነት አንዳንድ አስፈላጊ ቪታሚኖችን እንዲስብ እና እንዲያጓጉዝ ይረዳሉ. ቅባቶችም ለሰውነት የተከማቸ የኃይል ምንጭ ይሰጣሉ። ስብ ለእድገት፣ ለመራባት፣ ለቆዳ ታማኝነት፣ ሴሎችን ለመጠበቅ እና የሰውነት ስብን ለኃይል ለመጠቀም አስፈላጊ ናቸው። "),
      // const Paragraph(
      //     title: "",
      //     body: "What major food sources of fats does a diet include?"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/fats.png",
      //   // description: "በስብ የበለፀጉ ምግቦች",
      // ),
      const SubTitleText(
        text: "በስብ የበለፀጉ ምግቦች ፥",
        fontSize: 14,
      ),
      FoodGridList(foods: fatsFood),
      const SubTitleText(
        text: "ውሃ",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "ውሃ ",
          body:
              "ለሕይወት አስፈላጊ ነው እና ጤናማ ለመሆን ትክክለኛውን ፈሳሽ ማግኘት በጣም አስፈላጊ ነው:: ሰውነት በየቀኑ በቂ ንጹህ ውሃ ይፈልጋል::"),
      const SubTitleText(
        text: "ማይክሮ ንጥረ ነገሮች ደግሞ ቫይታሚኖችን እና ማዕድናትን ያካትታሉ።",
      ),
      // Vitamins
      const SubTitleText(
        text: "ቫይታሚኖች",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "ቫይታሚኖች ",
          body:
              "በሰውነት ውስጥ ጠቃሚ ተግባራትን የሚጫወቱ የኦርጋኒክ ውህዶች ቡድን ናቸው:: ነገር ግን በሰውነት ውስጥ ሊፈጠሩ አይችሉም :: በቅባት የሚሟሙ ቪታሚኖች ( ኤ፣ ዲ፣ ኢ እና ኬ) በሰውነት ውስጥ ሊቀመጡ ስለሚችሉ በየቀኑ ላንመገባቸው አንችላለን ሌሎች(በውሃ የሚሟሙ ቢ ቪታሚኖች፣ ቫይታሚን ሲ) ደግሞ በሰውነታችን ውስጥ ሊከማቹ ስለማይችሉ በየቀኑ መወሰድ አለባቸው፡፡ ቫይታሚኖች አካልን በአስፈላጊ መንገዶች በመጠገን ረገድ የተለያዩ ሚናዎችን ይጫወታሉ። ለምሳሌ ፕሮቲን እና ህዋሶችን መገንባት፣ ሴሎችን ከጉዳት መከላከል፣ አጥንቶችን መገንባት፡ ማክሮ ንጥረ ነገሮችን ማስተካከል እና ቁስሎችን መፈወስን ያካትታሉ።"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/vitamins.png",
      //   // description: "በቫይታሚን የበለፀጉ ምግቦች",
      // ),
      const SubTitleText(
        text: "በቫይታሚን የበለፀጉ ምግቦች ፥",
        fontSize: 14,
      ),
      FoodGridList(foods: vitaminsFood),
      // Minerals
      const SubTitleText(
        text: "ማዕድናት",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "ማዕድናት ",
          body:
              "እንደሌሎች የሕዋስ ዓይነቶች አስፈላጊ የግንባታ ብሎኮች ጠንካራ፣ ኦርጋኒክ ያልሆኑ ውህዶች ናቸው። ከጠቃሚ ማዕድናት መካከል ብረት ፡ ዚንክ ፡ ካልሲየም ፡ አዮዲን እና ሌሎችም ያካትታሉ፡፡ ለምሳሌ ብረት በሰውነት ውስጥ ኦክስጅንን የሚያጓጉዙ ቀይ የደም ሴሎች አካል ነው ፡፡ ዚንክ በሰውነት ውስጥ የሴሎች እና የሰውነት ስርዓቶችን መፈጠርን ጨምሮ የበሽታ መቋቋም እና ሌሎች ወሳኝ ተግባራት አሉት፡፡"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/minerals.png",
      //   // description: "በማዕድን የበለፀጉ ምግቦች",
      // ),
      const SubTitleText(
        text: "በማዕድን የበለፀጉ ምግቦች ፥",
        fontSize: 14,
      ),
      FoodGridList(foods: mineralsFood),

      const SubTitleText(text: "በህጻናት በቀን መወሰድ ያለበት የማይክሮ ንጥረ ነገር መጠን"),
      const Paragraph(
          title: "",
          body:
              "ይታሚንና ማዕድኖችን ጨምሮ፣ እንደ ዕድሜ፣ ጾታ እና የተለያየ የጤና ሁኔታ ሊለያይ ይችላል። በቀን መወሰድ ያለበት የንጥረ ነገር መጠን በመንግስት የጤና ኤጀንሲዎች የተቋቋሙ እና የአብዛኛውን ህዝብ የአመጋገብ ፍላጎት ለማሟላት የተነደፉ ናቸው። የግለሰብ መስፈርቶች ሊለያዩ እንደሚችሉ ልብ ሊባል የሚገባው ጉዳይ ነው፣ እና ሁልጊዜም የግል ባለሙያ ምክር የጤና እንክብካቤ ባለሙያን ማማከር ጥሩ ሀሳብ ነው። ለህጻናት አንዳንድ ዋና ዋና የማይክሮ ኤለመንቶች በቀን መወሰድ ያለባቸው መጠን የሚከተሉት ናቸው፡፡"),
      const SubTitleText(
        text: "ቫይታሚኖች",
        fontSize: 16.0,
      ),
      const SubTitleText(
        text: "ቫይታሚን ኤ፡",
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 300 ማይክሮ ግራም',
        'ከ 4-8 ዓመት: በቀን 400 ማይክሮ ግራም',
        'ከ 9-13 ዓመት: በቀን 600 ማይክሮ ግራም',
      ]),
      const SubTitleText(
        text: "ቫይታሚን ሲ፡",
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: ት: በቀን 15 ሚሊግራም',
        'ከ 4-8 ዓመት: በቀን 25 ሚ.ግ',
        'ከ 9-13 ዓመት: በቀን 45 ሚ.ግ'
      ]),
      const SubTitleText(
        text: 'ቫይታሚን ዲ፡',
        fontSize: 14.0,
      ),
      const Bullet(children: ['ከ 1-18 ዓመት: በቀን 600 ዓለም አቀፍ ዩኒት (IU)']),
      const SubTitleText(
        text: 'ቫይታሚን ኢ፡',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 6 ሚ.ግ',
        'ከ 4-8 ዓመት: በቀን 7 ሚ.ግ',
        'ከ 9-13 ዓመት: በቀን 11 ሚ.ግ'
      ]),
      const SubTitleText(
        text: 'ቫይታሚን ኬ፡',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 30 ማይክሮ ግራም',
        'ከ4-8 ዓመት: በቀን 55 ማይክሮ ግራም',
        'ከ 9-13 ዓመት: በቀን 60 ማይክሮ ግራም'
      ]),
      const SubTitleText(
        text: 'ማዕድን:',
        fontSize: 16.0,
      ),
      const SubTitleText(
        text: 'ካልሲየም፡',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 700 ሚ.ግ',
        'ከ 4-8 ዓመት: በቀን 1,000 ሚ.ግ',
        'ከ 9-18 ዓመት: በቀን 1,300 ሚ.ግ',
      ]),
      const SubTitleText(
        text: 'ብረት፡',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 7 ሚ.ግ',
        'ከ 4-8 ዓመት: በቀን 10 ሚ.ግ',
        'ከ 9-13 ዓመት: በቀን 8 ሚ.ግ',
        'ከ 14-18 ዓመት: በቀን 11 ሚ.ግ',
      ]),
      const SubTitleText(
        text: 'ዚንክ፡',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 3 ሚ.ግ',
        'ከ 4-8 ዓመት: በቀን 5 ሚ.ግ',
        'ከ 9-13 ዓመት: በቀን 8 ሚ.ግ',
        'ከ 14-18 ዓመት: በቀን 11 ሚ.ግ',
      ]),
      const SubTitleText(
        text: 'አዮዲን፡',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-8 ዓመት: በቀን 90 ማይክሮ ግራም',
        'ከ 9-13 ዓመት: በቀን 120 ማይክሮ ግራም',
        'ከ 14-18 ዓመት: በቀን 150 ማይክሮ ግራም'
      ]),
      const SubTitleText(
        text: 'ማግኒዥየም:',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 80 ሚ.ግ',
        'ከ 4-8 ዓመታት: በቀን 130 ሚ.ግ',
        'ከ 9-13 ዓመታት: በቀን 240 ሚ.ግ',
        'ከ 14-18 ዓመታት: በቀን 410 ሚ.ግ'
      ]),

      const SubTitleText(text: 'በህጻናት በቀን መወሰድ ያለበት የማክሮ ንጥረ ነገር መጠን (RDAs)'),
      const Paragraph(
          title: "",
          body:
              "ካርቦሃይድሬት፣ ፕሮቲኖች እና ቅባቶች በእድሜ እና በጾታ ላይ ተመስርተው ይሰጣሉ። በተጨማሪም፣ የተለየ የጤና ሁኔታ ወይም ከፍ ያለ የእንቅስቃሴ ደረጃ ያላቸው ልጆች የማክሮ ንጥረ ነገር አወሳሰዳቸውን ማስተካከል ሊያስፈልጋቸው ይችላል። ለህጻናት በቀን መወሰድ ያለባቸው የማክሮ ንጥረ ነገሮች እንደሚከተለው ቀርበዋል፡፡ ካርቦሃይድሬት ከጠቅላላው የቀን ካሎሪዎች 45-65% መያዝ አለበት፡፡"),
      const Paragraph(
          title: "ፕሮቲኖች፡-",
          body:
              " ለእድገት አስፈላጊ ናቸው። በቀን መወሰድ ያለበት የፕሮቲን መጠን (RDA) በእድሜ ላይ የተመሰረተ ነው፡-"),
      const Bullet(children: [
        'ከ 1-3 ዓመት: በቀን 13 ግራም',
        'ከ 4-8 ዓመት: በቀን 19 ግራም',
        'ከ 9-13 ዓመት: በቀን 34 ግራም',
        'ከ 14-18 ዓመት: በቀን 46-52 ግራም (በጾታ ይለያያል)'
      ]),
      const Paragraph(
          title: 'ስብ፡-', body: " ለአእምሮ እድገት እና በስብ የሚሟሟ ቪታሚኖችን ለማዋሃድ ጠቃሚ ነው።"),
      const Bullet(children: [
        'ከ1-3 አመት ለሆኑ ህፃናት ስብ ከጠቅላላው የቀን ካሎሪ ከ30-40% መስጠት አለበት፡፡',
        'ከ4-18 አመት ለሆኑ ህጻናት ስብ ከ25-35% የሚሆነውን የቀን ካሎሪ መጠን መስጠት አለበት።',
        'የሳቹሬትድ ስብ፡ የስብ መጠን ከጠቅላላው ካሎሪ ከ10% በታች መሆን አለበት።',
        'ትራንስ ፋት፡ ትራንስ-ስብ መጠን ዝቅተኛ መሆን አለበት።',
      ]),

      const SubTitleText(text: "በአዋቂዎች በቀን መወሰድ ያለበት የማይክሮ ንጥረ ነገር መጠን (RDAs)"),
      const SubTitleText(
        text: "ቫይታሚኖች",
        fontSize: 14,
      ),
      const Bullet(children: [
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
      const SubTitleText(
        text: 'ማዕድናት',
        fontSize: 14.0,
      ),
      const Bullet(children: [
        'ካልሲየም፡ እድሜያቸው እስከ 50 አመት ለሆኑ አዋቂዎች 1000 ሚ.ግ 50 በላይ ለሆኑ 200 ሚ.ግ.',
        'ብረት፡ ለወንዶች 8 ሚሊ ግራም፡ ለሴቶች 18 ሚ.ግ',
        'ማግኒዥየም: ለወንዶች 400 ሚ.ግ፡ ለሴቶች 310 ሚ.ግ',
        'ፎስፈረስ: ለወንዶች እና ለሴቶች 700 ሚ.ግ',
        'ፖታስየም: ለወንዶች እና ለሴቶች 3400 ሚ.ግ',
        'ሶዲየም፡ ለወንዶች እና ለሴቶች 1500 ሚ.ግ',
        'ዚንክ: ለወንዶች 11 ሚ.ግ፡ ለሴቶች 8 ሚ.ግ',
      ]),

      const SubTitleText(text: 'በአዋቂዎች በቀን መወሰድ ያለበት የማክሮ ንጥረ ነገር መጠን (RDAs)'),
      const Paragraph(
          title: "ፕሮቲን:", body: " ለአዋቂዎች: በቀን 0.8 ግራም (በኪሎ ግራም የሰውነት ክብደት)"),
      const Paragraph(
          title: "ስብ፡", body: " ከጠቅላላው የቀን ካሎሪ መጠን 20-35% መሆን አለበት።"),
      const Paragraph(
          title: "የሳቹሬትድ", body: " ስብ፡ ከጠቅላላው የቀን ካሎሪ ከ10% በታች እንዲገደብ ይመከራል።"),
      const Paragraph(
          title: "ካርቦሃይድሬት፡-", body: "ከ45-65% የቀን ካሎሪ መጠን እንዲያበረክቱ ይመክራሉ።"),

      const SubTitleText(
          text: "በእርግዝና ጊዜ በእናቶች በቀን መወሰድ ያለበት የማይክሮ ንጥረ ነገር መጠን (RDAs)"),
      const Paragraph(title: "ፎሊክ አሲድ ፡-", body: " በቀን 600 ማይክሮ ግራም"),
      const Paragraph(title: "አይረን፡", body: " በቀን 27 ሚግ"),
      const Paragraph(
          title: "ካልሲየም:", body: " በቀን 1,000 ሚግ (ከ19-50 አመት ለሆኑ ሴቶች)"),
      const Paragraph(title: "ቫይታሚን ዲ:", body: " በቀን 600 ዓለም አቀፍ ዩኒት"),
      const Paragraph(title: "አዮዲን:", body: " በቀን 220 ማይክሮ ግራም"),
      const Paragraph(title: "ቫይታሚን ኤ:", body: " በቀን 770 ማይክሮ ግራም"),
      const Paragraph(title: "ቫይታሚን ሲ:", body: " በቀን 85 ሚ.ግ"),
      const Paragraph(title: "ቫይታሚን ኢ:", body: " በቀን 15 ሚ.ግ"),
      const Paragraph(title: "ቲያሚን (ቫይታሚን ቢ1):", body: " በቀን 1.4 ሚ.ግ"),
      const Paragraph(title: "ቫይታሚን ቢ2:", body: " በቀን 1.4 ሚ.ግ"),
      const Paragraph(title: "ኒያሲን (ቫይታሚን ቢ3):", body: " በቀን 18 ሚ.ግ"),
      const Paragraph(title: "ቫይታሚን ቢ6:", body: " በቀን 1.9 ሚ.ግ"),
      const Paragraph(title: "ቫይታሚን ቢ12:", body: " በቀን 2.6 ማይክሮ ግራም"),
      const Paragraph(title: "ዚንክ:", body: " በቀን 11 ሚ.ግ"),

      const SubTitleText(
          text: "በእርግዝና ጊዜ በእናቶች በቀን መወሰድ ያለበት የማክሮ ንጥረ ነገር መጠን (RDAs)"),
      const Paragraph(
          title: "ፕሮቲን:", body: " አንድ እናት በእርግዝና ወቅት በቀን 71 ግራም ነውመውሰድ አለባት፡፡"),
      const Paragraph(
          title: "ካርቦሃይድሬት፡",
          body: " አንድ እናት በእርግዝና ወቅት ከ45-65% የየቀኑ የካሎሪ መጠን መጨመር አለባት።"),
      const Paragraph(
          title: "ስብ፡",
          body: " በእርግዝና ወቅት ስብ ከጠቅላላው የቀን ካሎሪ መጠን ከ20-35% መሆን አለበት።"),

      const SubTitleText(
          text: "እናቶች ጡት በሚያጠቡበት ጊዜ በቀን መወሰድ ያለባቸው የማይክሮ ንጥረ ነገር መጠን (RDAs)"),
      const Paragraph(title: "ቫይታሚን ኤ:", body: " በቀን 1,300 ማይክሮ ግራም"),
      const Paragraph(title: "ቫይታሚን ሲ፡", body: " በቀን 120 ሚሊግራም"),
      const Paragraph(title: "ቫይታሚን ዲ:", body: " በቀን 15 ማይክሮ ግራም"),
      const Paragraph(title: "ቫይታሚን ኢ:", body: " በቀን 19 ሚ.ግ."),
      const Paragraph(title: "ቫይታሚን ኬ:", body: " በቀን 90 ማይክሮ ግራም"),
      const Paragraph(title: "ታይአሚን (ቫይታሚን ቢ1):", body: " በቀን 1.4 ሚ.ግ."),
      const Paragraph(title: "ሪቦፍላቪን (ቫይታሚን ቢ2)፡", body: " በቀን 1.6 ሚ.ግ."),
      const Paragraph(title: "ኒያሲን (ቫይታሚን ቢ3):", body: " በቀን 17 ሚ.ግ."),
      const Paragraph(title: "ቫይታሚን ቢ6:", body: " በቀን 2 ሚ.ግ."),
      const Paragraph(title: "ፎሌት (ቫይታሚን ቢ9):", body: " በቀን 500 ማይክሮ ግራም"),
      const Paragraph(title: "ቫይታሚን ቢ12:", body: " በቀን 2.8 ማይክሮ ግራም"),
      const Paragraph(title: "ካልሲየም፡", body: " በቀን 1,000 ሚ.ግ."),
      const Paragraph(title: "ብረት:", body: " በቀን 9 ሚ.ግ."),
      const Paragraph(title: "ዚንክ፡", body: " በቀን 12 ሚ.ግ."),
      const Paragraph(title: "መዳብ:", body: " በቀን 1,300 ማይክሮ ግራም"),
      const Paragraph(title: "አዮዲን:", body: " በቀን 290 ማይክሮ ግራም"),

      const SubTitleText(
          text: "እናቶች ጡት በሚያጠቡበት ጊዜ በቀን መወሰድ ያለባቸው የማክሮ ንጥረ ነገር መጠን (RDAs)"),

      const Paragraph(
          title: "ፕሮቲን፡-",
          body:
              " እናቶች ጡት በሚያጠቡበት ወቅት በየቀኑ መወሰድ ያለበት የፕሮቲን መጠን በእርግዝና ጊዜ ወይም ከእርግዝና ውጭ ከሚወሰደዉ የበለጠ መሆን አለበት።"),
      const Paragraph(
          title: "ፕሮቲን፡",
          body:
              " በአማካይ, የሚያጠቡ ሴቶች በየቀኑ ወደ 71 ግራም ፕሮቲን እንዲወስዱ ይመከራሉ. ጥሩ የፕሮቲን ምንጮች ስጋ፣ የዶሮ ስጋ፤ አሳ፣ የወተት ተዋጽኦዎች፣ እንቁላል፣ ጥራጥሬዎች እና ለውዝ ያካትታሉ።"),
      const Paragraph(
          title: "ካርቦሃይድሬት፡-",
          body:
              " እናቶች ጡት በሚያጠቡበት ወቅት በቀን ከ210 እስከ 175 ግራም ያስፈልጋቸዋል፡፡ እናቶች ጡት በሚያጠቡበት ወቅት የካርቦሃይድሬት ፍላጎት በእርግዝና ወቅት ከሚያስፈልገው ጋር ተመሳሳይ ነው። እህሎች፣ ፍራፍሬ፣ አትክልቶች እና ጥራጥሬዎች በጣም ጥሩ የካርቦሃይድሬት ምንጮች ናቸው።"),
      const Paragraph(
          title: "ስብ፡-",
          body:
              " እናቶች ጡት በሚያጠቡበት ወቅት በቀን ከ44 እስከ 55 ግራም ስብ መውሰድ አለባቸው። እንደ አቮካዶ፣ ለውዝ፣ የወይራ ዘይት እና የሰባ ዓሳ ውስጥ በሚገኙ ጤናማ ቅባቶች ላይ ማተኮር አስፈላጊ ነው።"),
      const Paragraph(
          title: "ካሎሪ፡",
          body:
              " የሚያጠቡ እናቶች በተለምዶ የወተት ውጤትን ለመተካት ተጨማሪ ካሎሪዎች ያስፈልጋቸዋል። በአማካይ በየቀኑ ተጨማሪ 500 ካሎሪዎች እንዲወስዱ ይመከራል፡፡ የሚያጠቡ እናቶች ውሃ በደንብ መጠጣት አለባቸው፡፡ ስለዚህ ብዙ ውሃ መጠጣት አለባቸው፡፡ በተጨማሪም የሚያጠቡ እናቶች ከቅድመ ወሊድ በፊት በተለይም አይረን እና ፎሊክ አሲድ ያላቸውን ቪታሚኖች መውሰዳቸውን እንዲቀጥሉ ይመከራል።"),

      const CourseVideoPlayer(video: 'assets/videos/food_groups.mp4'),
      InkWell(
        onTap: () {
          openUrl(
              'https://www.youtube.com/watch?v=Y3dtjjO4Kk4&t=2s&ab_channel=CertaNutritio');
        },
        child: const Text(
          'ምንጭ - Youtube Certa Nutritio',
          style: TextStyle(color: Colors.blueAccent),
        ),
      ),
      // const Paragraph(
      //     title: "Nutrient requirements ",
      //     body:
      //         "refer to the different nutrients the body requires for energy, growth and repair, and protection from disease. They differ according to age, gender, physical activity, height, weight, and health status of the individual. ")
    ],
  ),
);
