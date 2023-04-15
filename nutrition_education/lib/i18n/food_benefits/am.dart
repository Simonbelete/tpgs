import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
    coverImage: 'assets/materials/image105.png',
    title: 'የምግብ ጥቅም',
    body: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Paragraph(
            title: '',
            body:
                'የተመጣጠነ ምግብ ለሰውነታችን አስፈላጊ የሆኑትን ንጥረ ነገሮች በሙሉ በትክክለኛው መጠን ማካተት አለበት፡፡'),
        Paragraph(
            title: '',
            body:
                'የምንመገበው ምግብ የተለያየ እና ሚዛናዊ በሆነ መጠን ሰውነታችን የእለት ከዕለት ፍላጎታችንን የማሟላት እድሉ ሰፊ ይሆናል፡፡ '),
        Paragraph(
            title: '',
            body:
                'የተመጣጠነ አመጋገብ ከአምስት የምግብ አይነቶች (ከፍራፍሬዎች፡ ከአትክልቶች፡ ከጥራጥሬዎች፡ ከፕሮቲን ምግቦች እና ከወተት ተዋጽኦዎች)የተውጣጡ ምግቦችን ያካትታል፡፡  የተመጣጠነ ምግብ መመገብ ሰዎች ጤናቸውን እንዲጠብቁ እና ለበሽታ የመጋለጥ እድላቸውን እንዲቀንስ ይረዳል።'),
        SubTitleText(text: '1. ገንቢ ምግቦች'),
        Paragraph(
            title: '',
            body:
                'በአጠቃላይ ከፍተኛ የፕሮቲን ይዘት ያላቸው ምግቦች እንደ ሰውነት ግንባታ ምግቦች ይቆጠራሉ። ስጋ፣ የዶሮ እንቁላል እና ስጋ፡ ዓሳ፡ የተፈጨ የበሬ ሥጋ፣ የአሳማ ሥጋ፣ ሳልሞን፣ ቲላፒያ፡፡ የወተት ተዋጽኦዎች፡ እርጎ፣ አነስተኛ ቅባት ያለው ወተት እና አይብ። እንዲሁም የአእል ዘሮች እንደ ዳቦ፣ ብስኩቶች፣ ፈንድሻ እና ሩዝ።'),
        CourseBodyImage(image: 'assets/materials/image99.jpg'),
        SubTitleText(text: '2. ሃይል ሰጭ ምግቦች'),
        Paragraph(
            title: '',
            body:
                'ሁሉም ምግቦች ኃይል ይሰጣሉ፡፡ በካርቦሃይድሬት እና በስብ የበለፀጉ ምግቦች በአጠቃላይ ሃይል ሰጪ ምግቦች ተደርገው ይወሰዳሉ። ሃይል ሰጪ ምግቦች ከተፈጩ በኋላ ስራን ለማከናወን ለሰውነታቸውን ሃይል የሚያቀርቡ ናቸው።'),
        Paragraph(
            title: '', body: 'ከሌሎቹ የምግብ ዓይነቶች በአንፃራዊነት ከፍተኛ የስኳር ይዘት አላቸው።'),
        Paragraph(title: '', body: 'የኃይል ሰጪ ምግብ ምሳሌዎች፡-'),
        Bullet(children: [
          'ካርቦሃይድሬት: ለአካላችን ዋነኛ የኃይል ምንጮች ሲሆኑ ኦርጋኒክ ሞለኪውሎችም ናቸው፡፡ ዳቦ፣ እህሎች እና ፍራፍሬዎች በካርቦሃይድሬት የበለፀጉ የምግብ ምሳሌዎች ናቸው።',
          'ስብ: ማንኛውም የሰባ አሲድ ወይም ተመሳሳይ ውህዶች ድብልቅ፣ በብዛት በአእንስሳት ተዋጽኦ ምግብ ውስጥ የሚገኘው፣ ስብ ይባላል። አይብ፣ ለውዝ እና ቅቤ በስብ የበለፀጉ ምግቦች ምሳሌዎች ናቸው።'
        ]),
        CourseBodyImage(image: 'assets/materials/image101.jpg'),
        SubTitleText(text: '3. በሽታ ተከላካይ ምግቦች'),
        Paragraph(
            title: '', body: 'በቪታሚኖች እና ማዕድናት የበለፀጉ ምግቦች መከላከያ ምግቦች ይባላሉ::'),
        Paragraph(title: '', body: 'ምሳሌዎች፡-'),
        Paragraph(
            title: '',
            body:
                'በስብ የሚሟሟ ቫይታሚን ኤ፣ ዲ፣ ኢ እና ኬ በምሳሌነት ሲጠቀሱ ከእንስሳት ተዋጸኦ አእና ከአሳ ይገኛሉ። እንደ ቫይታሚን ሲ፣ ፎሊክ አሲድ እና ቢ ቪታሚኖች በውሃ ውስጥ የሚሟሟ ቫይታሚኖች በፍራፍሬ፣ አትክልት፣ ጥራጥሬ እና የወተት ምግቦች ውስጥ ይገኛሉ።'),
        CourseBodyImage(image: 'assets/materials/image102.jpg'),
      ],
    ));
