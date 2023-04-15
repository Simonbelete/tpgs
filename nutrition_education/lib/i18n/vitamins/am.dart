import 'package:flutter/material.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/food_listtile.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Nutrient AM = Nutrient(
  coverImage: 'assets/materials/vitamind_opengraph.jpg',
  name: 'ቫይታሚኖች',
  icon: 'assets/icons/supplement.png',
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Paragraph(
          title: 'ቫይታሚኖች ',
          body:
              'የሰውነታችንን ዕድገት ለማፋጠን ፣ ከበሽታ ለመከላከል፣ ከውጥረት እና ተያያዥ ችግሮች ሰውታችንን ለመጠበቅ የህዋሳቶቻችንን የመከፋፈልና መራባት ሂደት በማገዝ ዘርን ተክቶ ለማለፍና ልጅ ለመውለድ የሚያስፈልጉ ቅድመ ሁኔታዎችን በማመቻቸት ረገድ ከፍተኛ ጠቀሜታዎች አሏቸው፡፡'),
      Paragraph(
          title: '',
          body:
              'ለሰውነታችንና አስፈላጊ የሆኑ ቫይታሚኖች በአብዛኛው በሰውነታችን ውስጥ የሚሰሩ ሲሂን ከምንመገባቸው ምግቦችና መጠጦች የምናገኛቸው የቫይታሚን አይነቶችም አሉ፡፡ ከዚህ በተጨማሪም በፋብሪካ ተመርተው በእንክብል መልክ አልያም በፈሳሽ ሸሮች መልክ እየተሰሩ በጥቅም ላይ የሚውሉ የቫይታሚን አይነቶችም አሉ፡፡ ለሰውነታችን ከሚሰጡ ጠቀሙታ አንፃር በስፋት በቀጥታም ላይ ከሚውሉት ቫይታሚን አይነቶችና አገልግሎቶቻቸው ጥቂቶቹ :-'),
      Paragraph(
          title: 'ቫይታሚን ኤ ',
          body:
              'እይታዎ የተሟላና የተስተካከለ እንዲሆን ይረዳዎታል፡፡ የቆዳዎ ጤና እንዲጠበቅ በማድረጉ ረገድም ጠቀሜታው ከፍ ያለ ነው፡፡ ህዋሳቶቻችን በመደበኛ ሁኔታ ማደግና መራባታቸውን ይቆጣራል፡፡ ጀልጅ መውለድ ጋር የተያያዙ ሂደቶችን የተሟሉና ውጤታማ የሆኑ በማድረጊ በኩልም ትልቅ አስተዋፅኦ አለው፡፡'),
      Paragraph(
          title: 'የቫይታሚን ኤ መገኛዎች ',
          body:
              'ወተት ጉበት ብርቱካን አበባ ጎመን ካሮት የተለያዩ አትክልቶች በምላስ ዝርዝረዎ ውስጥ መኖራቸውን ልብ ይበሉ፡፡'),
      Paragraph(
          title: 'ቫይታሚን ቢ ',
          body:
              'ድካም፣ አቅም ማጣት፣ በቀላሉ መዛል የቫይታሚን ቢ የተለያዩ መልኮችና አይነቶች አሉት፡- ቫይታሚን ቢ፣ በ2፣ቢ6፣ቢቢኒያሲን እና ፎሊክ አለደ ዋንኞቹ የቫይታሚን ቢ አይነቶች ናቸው። ቫይታሚን ቢ ቀይ የደም ህዋሳትን በማዘጋጀትና ኦክስጅንን በሰውነት ውስጥ በማዘዋወር ሂደትም ቫይታሚን ቦ ወሣኝ ሚና አለው፡፡ የቫይታሚን ቢ ወሣኝ ሚና አለው፡፡ የቫይታሚን ቢ እጥረት እጅግ አደገኛ ለሆነ የጤና ችግር የሚዳርግ በመሆኑም ሃኪሞች ብዙ ጊዜ ቫይታሚን ቢ ኮምክሎክሰን ለህመምተኞቻቸው ያዛሉ፡፡'),
      Paragraph(
          title: 'ቫይታሚን ቢ የት ያገኛል',
          body:
              'አሣ፣ ስንዴ፣ አጃ፣ እንቁላል፣ ወተትና የወተት ተዋፅኦዎች፣ አተር፣ ባቄላ ሥጋ፣ የቫይታሚን ቢ ዋንኛ ምንጮች ናቸው፡፡'),
      Paragraph(
          title: 'ቫይታሚን ሲ ',
          body:
              'የሚደማ ድድ፣ የሚላጥና የሚቆስል ቆዳ አልዎት? እንግድያውስ የቫይታሚን ሲ እጥረት አለብዎት ማለት ነው፡፡ ቫይታሚን ሲ የቆዳዎቻችንና ድዳችንን ጤና በመጠበቁ ረገድ ከፍተኛ ሚና አላቸው፣ ኢንፌክሽን በሰውነታችን ላይ የከፋ ጉዳት እንዳያስከትልም ቫይታሚን ሲ ከፍተና እገዛ ያደርጋል፡፡'),
      Paragraph(
          title: 'የቫይታሚን ሲ መገኛዎች ',
          body:
              'ሎሚና ብርቱካን፣ ስትሮበሪ፣ ቲማቲም፣ ጎመን፣ ሚጥሚጣና በርበሬ በቫይታሚን ሲ የበለፀጉ የምግብ አይነቶች ናቸው፡፡'),
      Paragraph(
          title: 'ቫይታሚን ዲ ',
          body:
              'ቫይታሚን ዲ በሰውነታችን ውስጥ የሚዘጋጀው ከፀሐይ ብርሃን አልትራናዮሴት ጨረሮችን በቆዳ አማካኝነት በሚያገኝበት ወቅት ነው፡፡ ቫይታሚን ዲ የአጥንትን ጥንካሬ ይጠብቃል፡፡ የዚህ ቫይታሚን እጥረት የአጥንት መሳሳትን ያስከትላል፡፡'),
      Paragraph(
          title: 'ቫይታሚን ቢ የት ያገኛል ',
          body:
              'ቫይታሚን ዲ ከፀሐይ ብርሃን በተጨማሪ ከወተትና ከወተት ተዋፅኦዎች እንዲሁም ከተለያዩ ጥራጥሬወፐች ማግኘት ይቻላል፡፡  '),
      SubTitleText(text: 'የቪታሚኖች ምንጮች'),
      FoodListTile(
          image: 'assets/materials/carot.png', title: 'ካሮት', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/tomato.png', title: 'ቲማቲም', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/watermelon.png',
          title: 'ሐብሐብ',
          subtitle: ''),
      FoodListTile(
          image: 'assets/materials/avocado.png', title: 'አቮካዶ', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/banana.png', title: 'ሙዝ', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/orange.png', title: 'ብርቱካን', subtitle: ''),
      FoodListTile(
          image: 'assets/materials/pumpkin.png', title: 'ዱባ', subtitle: '')
    ],
  ),
);
