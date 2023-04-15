import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/nutrition_status_same_age_children.png',
  title: 'የተመጣጠነ ምግብ እጥረት',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(
        image: 'assets/materials/nutrition_status_same_age_children.png'),
    Paragraph(
        title: 'የተመጣጠነ ምግብ እጥረት ',
        body:
            'ከክብደት በታች፣ አጭር፣ ቀጭን እና የቪታሚኖች እና ማዕድናት እጥረትን ጨምሮ የተለያዩ ሁኔታዎችን ይገልጻል። አንድ ልጅ በጣም ቀጭን ወይም ከእድሜው አማካይ በጣም ያነሰ ከሆነ የተመጣጠነ ምግብ እጥረት ተብሎ ይገለጻል። በጣም ጥቅም ላይ የዋሉት የተመጣጠነ ምግብ እጥረት አመላካቾች፡-'),
    Bullet(children: [
      'ማባከን፡- በተለምዶ የአጣዳፊ ወይም የአጭር ጊዜ በቂ ምግብ አለመውሰድ ውጤት፣ ብዙ ጊዜ ከበሽታ ጋር ተደምሮ። በአደገኛ ሁኔታ ቀጭን (ማለትም, ለቁመታቸው በጣም ዝቅተኛ ክብደት ያላቸው) ልጅ ላይ ውጤቶች.',
      'ስታንቲንግ፡ በመደበኛነት ሥር የሰደደ ወይም የረዥም ጊዜ በቂ ያልሆነ ኃይል ወይም ማይክሮ ኤነርጂ አወሳሰድ አመላካች፣ ምንም እንኳን ብዙ ያልተመጣጠነ እንደ ሄልሚንት ኢንፌክሽን እና ተደጋጋሚ ወይም ሥር የሰደደ ኢንፌክሽን ያሉ ቢሆንም። በጣም አጭር በሆነ ልጅ ውስጥ ያሉ ውጤቶች (ማለትም, ለዕድሜያቸው በጣም አጭር ቁመት አላቸው).',
      'ከክብደት በታች፡- የክብደት-ለዕድሜ በቂ መሆኑን የሚገመግም አመላካች። መንስኤዎቹ የአጭር ጊዜ ወይም የረጅም ጊዜ ሊሆኑ የሚችሉ እና ለመለየት አስቸጋሪ ናቸው.'
    ]),
    Paragraph(
        title: '',
        body: 'ከታች የሚታዩት ሁሉም ልጆች እድሜያቸው ተመሳሳይ ነው። ከነሱ መካከል የትኛው ማልኑ ይሰቃያል'),
    CourseBodyImage(image: 'assets/materials/image_66.png'),
    CourseBodyImage(image: 'assets/materials/image_67.png'),
  ]),
);
