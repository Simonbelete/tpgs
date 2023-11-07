import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/category_button.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';
import 'package:nea/widgets/title_text.dart';

Course AM = Course(
    coverImage: 'assets/materials/foods/egg.png',
    title: 'እንቁላል',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CourseBodyImage(image: 'assets/materials/foods/egg.png'),
        const SizedBox(
          height: 30.0,
        ),
        const Paragraph(
          title: '',
          body: 'እንቁላል በፕላኔታችን ላይ ካሉ በጣም ገንቢ ምግቦች መካከል አንዱ ነው።',
        ),
        // አንድ ሙሉ እንቁላል አንድን ሕዋስ ወደ ሕፃን ዶሮ ለመለወጥ የሚያስፈልጉትን ሁሉንም ንጥረ ነገሮች ይዟል አንድ ትልቅ, የተቀቀለ እንቁላል ይዟል
        const SubTitleText(text: "አንድ ትልቅ የተቀቀለ እንቁላል የሚከተሉትን ንጥረ ነገሮች ይዟል"),
        Column(children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'ቫይታሚን ኤ 6% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/vitamin-a.png'),
              CategoryButton(
                  horizontal: true,
                  text: 'ፎሌት 5% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/vitamins.png'),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'ቫይታሚን ቢ5 7% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/vitamin_b5.png'),
              CategoryButton(
                  horizontal: true,
                  text: 'ቫይታሚን ቢ5 9% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/vitamin_b12.png'),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'ቫይታሚን ቢ5 15% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/vitamin_b2.png'),
              CategoryButton(
                  horizontal: true,
                  text: 'ፎስፈረስ 9% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/phosphorus.png'),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              CategoryButton(
                  horizontal: true,
                  text: 'ሴሊኒየም 22% የ አርዲኤ(በቀን መወሰድ ያለበት መጠን)',
                  icon: 'assets/icons/selenium_icon.png'),
            ],
          )
        ]),
        const SizedBox(
          height: 30.0,
        ),
        const Paragraph(
            title: '',
            body:
                'እንቁላሎች ጥሩ መጠን ያለው ቫይታሚን ዲ፣ ቫይታሚን ኢ፣ ቫይታሚን ኬ፣ ቫይታሚን ቢ6፣ ካልሲየም እና ዚንክ ይይዛሉ ይህ ከ77 ካሎሪ፣ 6 ግራም ፕሮቲን እና 5 ግራም ጤናማ ስብ ጋር አብሮ ይመጣል። እንቁላሎች ለጤና ጠቃሚ የሆኑ የተለያዩ የመከታተያ ንጥረ ነገሮችን ይዘዋል እንደ እውነቱ ከሆነ እንቁላሎች በጣም ጥሩው ምግብ ናቸው። ከሞላ ጎደል ከሚፈልጓቸው ንጥረ ነገሮች ውስጥ በጥቂቱ ይይዛሉ።'),
        const SubTitleText(text: 'እንቁላሎች ተጨማሪ ንጥረ ነገሮች አሏቸው'),
        const Paragraph(
            title: '',
            body:
                'ይህም ማለት እንቁላሎች ከአብዛኞቹ ምግቦች የበለጠ ንጥረ ነገር አላቸው - ቫይታሚኖች፣ ማዕድናት፣ አሚኖ አሲዶች - በካሎሪ። እንቁላል ይኑርዎት፣ እና የሚከተለውን ያገኛሉ፡-'),
        const Bullet(children: [
          'ከፍተኛ ጥራት ያለው ፕሮቲን',
          'ሴሊኒየም',
          'ፎስፈረስ',
          'ኮሊን',
          'ቫይታሚን ቢ12',
          'የሴሎችዎን ጤና ለመጠበቅ የሚረዱ ብዙ ፀረ-ንጥረ-ምግቦች'
        ]),
        const SubTitleText(text: 'እንቁላል ለዓይን ጤና ጠቃሚ ነው'),
        const Paragraph(
            title: '',
            body:
                'ዶክተሮች ሉቲን እና ዜአክሳንቲን የተባሉት አንቲኦክሲደንትስ እንደ የዓይን ሞራ ግርዶሽ እና ከእድሜ ጋር ተዛማጅነት ያለው ማኩላር ዲጄኔሬሽን ያሉ የአይን በሽታዎች እንዳይያዙ እንደሚረዳዎት ያውቃሉ። እንደ ስፒናች እና ጎመን ያሉ አረንጓዴ፣ ቅጠላማ አትክልቶችም አሏቸው። ነገር ግን እንቁላል የተሻለ ምንጭ ነው. ይህ የሆነበት ምክንያት የእነሱ ስብ ለሰውነትዎ ጠቃሚ ንጥረ ነገሮችን ለመጠቀም ቀላል ያደርገዋል።'),
        const SubTitleText(text: 'እንቁላል መመገብ የሚሰጠው ተጨማሪ ጥቅም'),
        const CourseBodyImage(image: 'assets/materials/foods/egg_boiled.png'),
        const Paragraph(
            title: 'አንጎልን ለማዳበር ያግዛል ',
            body:
                'እንቁላሎች ቫይታሚን ዲ አላቸው፣ ይህም ለግራጫ ጉዳይዎ ጠቃሚ እና ከምግብ ለማግኘት ከባድ ነው። እና በ ጭንቅላት ውስጥ ያሉ የነርቭ ሴሎች (ኒውሮኖች) እርስ በርስ እንዲነጋገሩ የሚረዳ ቾሊን የሚባል ነገር አላቸው። ቾሊን ለነፍሰ ጡር እና ጡት ለሚያጠቡ ሴቶችም በጣም አስፈላጊ ነው ምክንያቱም በአንጎል እድገት ውስጥ ያለው ሚና ከፍተኛ ነው።'),
        const Paragraph(
            title: 'የፕሮቲን እና የአሚኖ አሲዶች ምንጭ ነው ',
            body:
                'በአመጋገባችን ውስጥ በቂ ፕሮቲን ማግኘታችን የሰውነታችንን ጤና የምንረዳበት ወሳኝ መንገድ ነው። እያንዳንዱ እንቁላል ወደ ስድስት ግራም ፕሮቲን እንዲሁም ጠቃሚ አሚኖ አሲዶች ይዟል. የእለቱን የፕሮቲን ድርሻ ማግኘታችን ክብደትን ለመቆጣጠር፣ የጡንቻን ብዛት ለመጨመር፣ የደም ግፊትን ለመቀነስ እና አጥንታችንን ለመርዳት ይረዳል።'),
        const CourseBodyImage(
            image: 'assets/materials/foods/egg_scrumbled.png'),
        const Paragraph(
            title: 'ጥሩ የ ኮሊን ምንጭ ነው ',
            body:
                'ቾሊን በውሃ ውስጥ የሚሟሟ ቫይታሚን ሲሆን ብዙውን ጊዜ ከ ቢ ቫይታሚኖች ጋር ይመደባል. የሴል ሽፋኖችን ለመገንባት የሚያገለግል ሲሆን በአንጎል ውስጥ ምልክት ሰጪ ሞለኪውሎችን ለማምረት ይረዳል። አንድ ጠንካራ የተቀቀለ እንቁላል 147 ሚሊ ግራም ቾሊን አለው፣ ይህም በአሜሪካ የምግብ እና የመድሃኒት አስተዳደር (ኤፍዲኤ) ከሚመከረው የቀን እሴት 27% ነው።'),
        const Paragraph(
            title: 'እንቁላሎች በንጥረ-ምግብ የበለጸጉ ናቸው ',
            body: 'በአማካይ የ 2 እንቁላሎች አመጋገብ የሚከተሉትን ያጠቃልላል ።'),
        const Bullet(children: [
          'ከዕለታዊ የቫይታሚን ዲ ፍላጎቶች 82%',
          'ከዕለታዊ የ ፎሌት ፍላጎቶችዎ 50%',
          'ከዕለታዊ የሪቦፍላቪን (ቫይታሚን ቢ2) ፍላጎቶች 25%',
          '40% ዕለታዊ የሴሊኒየም ፍላጎቶች',
        ]),
        const SubTitleText(text: 'እንቁላሉን ለማዘጋጀት'),
        const Bullet(children: [
          'ዘይት ያቁላሉ::',
          'እንቁላሉን በጥንቃቄ ይስበሩ::',
          'በደንብ ያበስሉት እና በዳቦ፣ በሩዝ ወይም በማንኛውም የሚገኝ ምግብ ያቅርቡት::'
        ]),
        const SubTitleText(text: 'የእንቁላል እውነታዎች'),
        const Bullet(children: [
          'እንቁላል ለዓይንዎ ጥሩ ነው፡፡ የዓይን ሞራ ግርዶሽ እና የጡንቻ መበላሸትን የሚከላከል ሉቲን ይይዛሉ፡፡',
          'የእንቁላል ቅርፊት እስከ 17,000 የሚደርሱ ቀዳዳዎች ሊኖሩት ይችላል።',
          'የእንቁላል ቅርፊት እና ቢጫ ቀለም ሊለያዩ ይችላሉ ነገር ግን በጣዕም እና በጥራት ላይ ምንም ተጽእኖ አይኖራቸውም፡፡',
          'የዶሮ ዝርያ የእንቁላል ለምን ይወስናል፡፡ አንዳንድ ዝርያዎች ሰማያዊ, አረንጓዴ ወይም ሮዝ እንቁላል ሊጥሉ ይችላሉ፡፡',
          'የእንቁላል አስኳል በተፈጥሮ ቫይታሚን ዲ ከያዙ ጥቂት ምግቦች ውስጥ አንዱ ነው።',
          'ቡናማ እንቁላሎች በብዙዎች ዘንድ ተመራጭ ናቸው፡፡',
          'እንቁላል በኮሊን የበለፀገ ሲሆን ይህም መደበኛ የሕዋስ እንቅስቃሴን ያበረታታል።',
          'በጥሬ እንቁላል እና በጠንካራ የበሰለ እንቁላል መካከል ያለውን ልዩነት ለመለየት ያሽከርክሩት ጠንካራ የበሰለ እንቁላሎች በቀላሉ ይሽከረከራሉ፡፡',
          'መሬት ላይ የተጣለን እንቁላል በቀላሉ ለማጽዳት በጨው ይሹት።',
          'እንቁላሎች  በቤት ውስጥ በሙቀት በአንድ ቀን ብናስቀምጣቸው በአንድ ሳምንት ማቀዝቀዣ ከማስቀመጥ የበለጠ ያረጃሉ፡፡',
          'አንድ የተሻሻለች ዶሮ በዓመት ከ 300 እስከ 325 እንቁላል ትጥላለች፡፡',
          'ዶሮ እንቁላል ለማምረት ከ 24 እስከ 26 ሰአታት ይወስድባታል፡፡',
          'ዶሮዎች ሲያረጁ እንቁላሎቻቸው ትልልቅ ይሆናሉ፡፡',
        ]),
      ],
    ));
