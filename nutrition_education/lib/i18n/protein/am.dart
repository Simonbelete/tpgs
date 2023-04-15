import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/utils/open_url.dart';
import 'package:nutrition_education/widgets/course_video_player.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient AM = Nutrient(
    coverImage: 'assets/materials/vitamind_opengraph.jpg',
    name: 'ፕሮቲኖች',
    icon: 'assets/icons/meat.png',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const CourseVideoPlayer(video: 'assets/videos/protine_video.mp4'),
      InkWell(
        onTap: () {
          openUrl(
              'https://www.youtube.com/watch?v=bnXJVPIxlTk&list=PLOS5MMmDL-YfeyCd_9XH9OroWjFENho6P&index=3&ab_channel=CertaNutritio');
        },
        child: const Text(
          'ምንጭ - Youtube Certa Nutritio',
          style: TextStyle(color: Colors.blueAccent),
        ),
      ),
      const Paragraph(
          title: 'ፕሮቲኖች ',
          body:
              'በሰው አካል ውስጥ የሁሉም ሕዋሳት ፣ ሕብረ ሕዋሳት ፣ የአካል ክፍሎች ዋና አካል ናቸው። ፕሮቲኖች ለቁጥጥር፣ ለሞተር፣ ለመጓጓዣ፣ ለኃይል እና ለሜታቦሊክ ተግባራት ኃላፊነት አላቸው። ውህዶቹ ማዕድናትን፣ ቫይታሚኖችን፣ ስብን፣ ካርቦሃይድሬትን በመምጠጥ፣ በሽታ የመከላከል አቅምን ይጨምራሉ እና ለጡንቻ ፋይበር አንድ የግንባታ ቁሳቁስ ሆነው ያገለግላሉ።'),
      const SubTitleText(text: 'የእንስሳት እና የእፅዋት ፕሮቲኖች ጥቅሞች ምንድ ናቸው?'),
      const Paragraph(
          title: '',
          body:
              'ከእንስሳት የሚገኙ ፕሮቲን ዋነኛው ጥቅም ለሰውነት አስፈላጊ የሆኑትን ሁሉንም አስፈላጊ አሚኖ አሲዶች በዋነኛነት በተከማቸ መልክ ይይዛሉ። የእንደዚህ አይነት ፕሮቲን ጡንቻን በመጠገን ክፍተኛ ጥቅም አላችው ፣ ይህም በየቀኑ ከ 2፡3 ጊዜ እጥፍ ነው። በተጨማሪም የእንስሳት መገኛ ምርቶች ብዙውን ጊዜ ጎጂ የሆኑ ንጥረ ነገሮችን (ሆርሞን፣ አንቲባዮቲክስ፣ ስብ፣ ኮሌስትሮል) ይይዛሉ፣ ይህም በሰውነት ውስጥ በተበላሹ ምርቶች መርዝ ይመርዛሉ፣ ዕካልሲየምዕ ከአጥንት ይታጠቡ፣ በጉበት ላይ ተጨማሪ ጭነት ይፈጥራሉ።'),
      const Paragraph(
          title: '',
          body:
              'የአትክልት ፕሮቲኖች በሰውነት ውስጥ በደንብ ይወሰዳሉ። ከእንስሳት ፕሮቲኖች ጋር የሚመጡትን ጎጂ ንጥረ ነገሮች አያካትቱም። ይሁን እንጂ የእፅዋት ፕሮቲኖች ያለ ውዝግቦች አይደሉም። አብዛኛዎቹ ምርቶች (ከአኩሪ አተር በስተቀር) ከቅባት (በዘር) ጋር ይጣመራሉ፣ ያልተሟላ አስፈላጊ የአሚኖ አሲዶች ስብስብ ይይዛሉ።'),
      const SubTitleText(text: 'የፕሮቲን ምንጮች'),
      const FoodListTile(
          image: 'assets/materials/raw_meat.png', title: 'ስጋ', subtitle: ''),
      const FoodListTile(
          image: 'assets/materials/fish.png', title: 'ዓሳ', subtitle: ''),
      const FoodListTile(
          image: 'assets/materials/egg.png', title: 'እንቁላል', subtitle: ''),
      const FoodListTile(
          image: 'assets/materials/milk.png', title: 'ወተት', subtitle: ''),
      const FoodListTile(
          image: 'assets/materials/yogurt_food.jpg',
          title: 'እርጎ',
          subtitle: ''),
      const FoodListTile(
          image: 'assets/materials/raw_chicken.png', title: 'ዶሮ', subtitle: ''),
    ]));
