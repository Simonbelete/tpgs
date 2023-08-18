import 'package:flutter/material.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/category_button.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Food AM = Food(
    coverImage: 'assets/materials/foods/egg.png',
    title: 'እንቁላል',
    description: const Paragraph(
      title: '',
      body:
          'እንቁላል በፕላኔታችን ላይ ካሉ በጣም ገንቢ ምግቦች መካከል አንዱ ነው። አንድ ሙሉ እንቁላል አንድን ሕዋስ ወደ ሕፃን ዶሮ ለመለወጥ የሚያስፈልጉትን ሁሉንም ንጥረ ነገሮች ይዟል አንድ ትልቅ, የተቀቀለ እንቁላል ይዟል',
    ),
    facts: Column(children: [
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: const [
          CategoryButton(
              horizontal: true,
              text: 'ቫይታሚን ኤ 6% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
              icon: 'assets/icons/vitamin-a.png'),
          CategoryButton(
              horizontal: true,
              text: 'ፎሌት 5% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
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
              text: 'ቫይታሚን ቢ5 7% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
              icon: 'assets/icons/vitamin_b5.png'),
          CategoryButton(
              horizontal: true,
              text: 'ቫይታሚን ቢ5 9% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
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
              text: 'ቫይታሚን ቢ5 15% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
              icon: 'assets/icons/vitamin_b2.png'),
          CategoryButton(
              horizontal: true,
              text: 'ፎስፈረስ 9% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
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
              text: 'ሴሊኒየም 22% የ አርዲኤ(የሚመከር ዕለታዊ አበል)',
              icon: 'assets/icons/selenium_icon.png'),
        ],
      )
    ]),
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: '',
            body:
                'እንቁላሎች ጥሩ መጠን ያለው ቫይታሚን ዲ፣ ቫይታሚን ኢ፣ ቫይታሚን ኬ፣ ቫይታሚን B6፣ ካልሲየም እና ዚንክ ይይዛሉ ይህ ከ77 ካሎሪ፣ 6 ግራም ፕሮቲን እና 5 ግራም ጤናማ ስብ ጋር አብሮ ይመጣል። እንቁላሎች ለጤና ጠቃሚ የሆኑ የተለያዩ የመከታተያ ንጥረ ነገሮችን ይዘዋል እንደ እውነቱ ከሆነ እንቁላሎች በጣም ጥሩው ምግብ ናቸው። ከሞላ ጎደል ከሚፈልጓቸው ንጥረ ነገሮች ውስጥ በጥቂቱ ይይዛሉ።'),
        SubTitleText(text: 'እንቁላሎች ተጨማሪ ንጥረ ነገሮች አሏቸው'),
        Paragraph(
            title: '',
            body:
                'ይህም ማለት እንቁላሎች ከአብዛኞቹ ምግቦች የበለጠ ንጥረ ነገር አላቸው -- ቫይታሚኖች፣ ማዕድናት፣ አሚኖ አሲዶች - በካሎሪ። እንቁላል ይኑርዎት፣ እና የሚከተለውን ያገኛሉ፡-'),
        Bullet(children: [
          'ከፍተኛ ጥራት ያለው ፕሮቲን',
          'ሴሊኒየም',
          'ፎስፈረስ',
          'ኮሊን',
          'ቫይታሚን ቢ12',
          'የሴሎችዎን ጤና ለመጠበቅ የሚረዱ ብዙ ፀረ-ንጥረ-ምግቦች'
        ]),
        SubTitleText(text: 'እንቁላል ዓይኖችዎን ይረዳሉ'),
        Paragraph(
            title: '',
            body:
                'ዶክተሮች ሉቲን እና ዜአክሳንቲን የተባሉት አንቲኦክሲደንትስ እንደ የዓይን ሞራ ግርዶሽ እና ከእድሜ ጋር ተዛማጅነት ያለው ማኩላር ዲጄኔሬሽን ያሉ የአይን በሽታዎች እንዳይያዙ እንደሚረዳዎት ያውቃሉ። እንደ ስፒናች እና ጎመን ያሉ አረንጓዴ፣ ቅጠላማ አትክልቶችም አሏቸው። ነገር ግን እንቁላል የተሻለ ምንጭ ነው. ይህ የሆነበት ምክንያት የእነሱ ስብ ለሰውነትዎ ጠቃሚ ንጥረ ነገሮችን ለመጠቀም ቀላል ያደርገዋል።'),
        SubTitleText(text: 'እንቁላል መብላት'),
        CourseBodyImage(image: 'assets/materials/foods/egg_boiled.png'),
        Paragraph(
            title: 'አንጎልን ለማንፀባረቅ ያግዙ ',
            body:
                'እንቁላሎች ቫይታሚን ዲ አላቸው፣ ይህም ለግራጫ ጉዳይዎ ጠቃሚ እና ከምግብ ለማግኘት ከባድ ነው። እና በ noggin ውስጥ ያሉ የነርቭ ሴሎች (ኒውሮኖች) እርስ በርስ እንዲነጋገሩ የሚረዳ ቾሊን የሚባል ነገር አላቸው። ቾሊን ለነፍሰ ጡር እና ጡት ለሚያጠቡ ሴቶችም በጣም አስፈላጊ ነው ምክንያቱም በአንጎል እድገት ውስጥ ያለው ሚና ከፍተኛ ነው።'),
        Paragraph(
            title: 'የፕሮቲን እና የአሚኖ አሲዶች ምንጭ ',
            body:
                'በአመጋገባችን ውስጥ በቂ ፕሮቲን ማግኘታችን የሰውነታችንን ጤና የምንረዳበት ወሳኝ መንገድ ነው። እያንዳንዱ እንቁላል ወደ ስድስት ግራም ፕሮቲን እንዲሁም ጠቃሚ አሚኖ አሲዶች ይዟል. የእለቱን የፕሮቲን ድርሻ ማግኘታችን ክብደትን ለመቆጣጠር፣ የጡንቻን ብዛት ለመጨመር፣ የደም ግፊትን ለመቀነስ እና አጥንታችንን ለመርዳት ይረዳል።'),
        CourseBodyImage(image: 'assets/materials/foods/egg_scrumbled.png'),
        Paragraph(
            title: 'ጥሩ የ choline ምንጭ ',
            body:
                'ቾሊን በውሃ ውስጥ የሚሟሟ ቫይታሚን ሲሆን ብዙውን ጊዜ ከ B ቫይታሚኖች ጋር ይመደባል. የሴል ሽፋኖችን ለመገንባት የሚያገለግል ሲሆን በአንጎል ውስጥ ምልክት ሰጪ ሞለኪውሎችን ለማምረት ይረዳል። አንድ ጠንካራ የተቀቀለ እንቁላል 147 ሚሊ ግራም ቾሊን አለው፣ ይህም በአሜሪካ የምግብ እና የመድሃኒት አስተዳደር (ኤፍዲኤ) ከሚመከረው የቀን እሴት 27% ነው።'),
        Paragraph(
            title: 'እንቁላሎች በንጥረ-ምግብ የበለጸጉ ናቸው ',
            body: 'በአማካይ የ 2 እንቁላሎች አመጋገብ የሚከተሉትን ያጠቃልላል ።'),
        Bullet(children: [
          'ከዕለታዊ የቫይታሚን ዲ ፍላጎቶች 82%',
          'ከዕለታዊ የ ፎሌት ፍላጎቶችዎ 50%',
          'ከዕለታዊ የሪቦፍላቪን (ቫይታሚን ቢ2) ፍላጎቶች 25%',
          '40% ዕለታዊ የሴሊኒየም ፍላጎቶች',
        ])
      ],
    ));
