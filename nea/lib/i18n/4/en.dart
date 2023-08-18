import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "CHILD NUTRITION",
  coverImage: "assets/materials/images/14.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      CourseBodyImage(image: "assets/materials/images/14.png"),
      Objectives(children: [
        'Create awareness on the benefits of exclusive breastfeeding newborn and infants'
      ]),
      SubTitleText(text: "Child feeding from birth to age 6 months"),
      KeyMessages(children: [
        "Put your baby to the breast within the first 30 minutes of birth. Initiating breastfeeding facilitates milk production and helps your uterus to go back to shape faster and controls bleeding after delivery.",
        "Feed your baby breast milk only, not even water, during the ﬁ rst six months after birth. Each feed-ing session should take between 20 and 45 minutes.",
        "Exclusive breastfeeding promotes the child’s adequate growth and development. It is always clean; contains antibodies that protect against diseases. Breast milk is always ready and at the right temperature and is easy to digest. It contains enough water for the baby’s needs.",
        "Breastfeed as often as your child wants especially at night. Your child might be hungry if he/she is fussing, sucking fingers, or moving lips.",
        "Look into your babies eyes, gently stroke their face and body and sing songs as they breastfeed. Wash your hands with soap before breastfeeding and keep your nails trimmed.",
        "If you are HIV positive, consult the doctor immediately for guidance (see National Guideline) on how to feed your baby.",
        "When the child is 5 months old, begin to think and prepare for timely introduction of optimal complementary feeds."
      ]),
      Remember(children: [
        "Feed your baby breast milk only during the first six months after birth, do not give any fluid, not even water"
      ]),
      SubTitleText(text: "Initiation of complementary feeding after 6 months"),
      Objectives(children: [
        "Instill skills on how to introduce complementary foods for a 7 months baby"
      ]),
      CourseBodyImage(image: "assets/materials/images/3.png"),
      KeyMessages(children: [
        "When the baby turns 7 months, he/she requires more nutrients from other foods",
        "Start to give soft balanced food at 7 months of age, 2 to 3 times a day.",
        "Start with 2-3 tablespoonful per feed.",
        "Add other animal milk to prepared soft food.",
        "Food should be thick enough so that it does not run oﬀ the spoon.",
        "Feed your child slowly and patiently, make eye contact, encourage and motivate the child to eat. Never force-feed children.",
        "Look for cues that show your child is hungry before she/he starts to cry (e.g. puts fingers in the mouth, spits, looks what others are eating)",
        "Do not use bottles to feed your baby. They are very difficult to keep clean and can make your baby sick with diarrhea.",
        "Breast milk continues to be very important for your baby. Breastfeed your baby first before giving other foods.",
        "Breastfeed until your baby is two years or older. Continue breastfeeding your baby whenever he or she wants, day and night, for good health."
      ]),
      Remember(children: [
        "Complementary foods start at 7 months for 2-3 times a day"
      ]),
      SubTitleText(text: "Complementary feeding at age 7 - 8 months"),
      Objectives(children: [
        "Enhance an understanding on what and how to feed a child aged 7 - 8 months of age"
      ]),
      CourseBodyImage(image: "assets/materials/images/16.png"),
      KeyMessages(children: [
        "Continue breastfeeding your baby day and night to keep him or her healthy.",
        "Breast milk is very important for your baby. Continue to breastfeed until your baby is two years older.",
        "From 7 months onwards, feed your baby 3 times a day. Give 1 to 2 snacks in between meals.",
        "Gradually increase the amount of food to ½ of a 250 ml cup. Babies have small stomachs and can only eat small amounts at each meal.",
        "Mash and soften the foods so the baby can easily chew and swallow; use breast milk or other animal milk to prepare soft food.",
        "Thicken your baby’s food as the baby grows older, making sure that he or she is still able to easily swallow without choking.",
        "Try to include at food from at least 5 food groups every day",
        "Add small amounts of oil or margarine, mashed vegetables, mashed fruits, to your baby’s porridge. Animal milks (goat, cow, etc.) are also good food to add.",
        "Use iodized salt in your baby’s food.",
        "Be patient , make eye contact and actively encourage your baby to eat. Never force your child to eat.",
        "Look for cues that show your child is hungry before s/he starts to cry (e.g. puts fingers in the mouth, spits, looks what others are eating)"
      ]),
      Remember(children: [
        "From 7 months onwards, feed your baby 3 times a day. Give 1 to 2 snacks (fruit, ground nuts) in between meals"
      ]),
      SubTitleText(text: "Complementary feeding at 9 - 11 months"),
      Objectives(children: [
        "Enhance an understanding on what and how to feed a child aged 9 - 11 months of age"
      ]),
      CourseBodyImage(image: "assets/materials/images/17.png"),
      KeyMessages(children: [
        "From 9 months onwards, feed your young child 4 times a day (3 meals and 1 - 2 snacks). Give your young child 3/4 of a 250 ml cup/bowl at each feed.",
        "By 9 months the young child should be able to begin eating finger foods such as pieces of ripe mango and papaya, banana and vegetables.",
        "Try to include at food from at least 5 food groups each day",
        "Add small amounts of oil or margarine to your baby’s food. Animal milks (goat, cow, etc.) are healthy for your baby.",
        "Give your baby his or her own plate to make sure she or he eats all the food given.",
        "Be patient, show love, make eye contact and actively encourage your baby to eat more food. Never force-feed children.",
        "Look for cues that show your child is hungry before s/he starts to cry (e.g. puts fingers in the mouth, spits, looks what others are eating)",
        "Wash your hands with soap before preparing food and feeding your child. REMEMBER to wash your baby’s hands before and after giving them food.",
        "Continue breastfeeding your baby until your baby is two years or older to maintain his/her health and strength."
      ]),
      Remember(children: [
        "Safe preparation and storage of complementary foods: Store food in a covered, clean container and give it to your baby within 2 hours after cooking (if you don’t have a refrigerator)"
      ]),
      SubTitleText(text: "Complementary feeding at age 12 - 24 months"),
      Objectives(children: [
        "Enhance an understanding on what and how to feed a child aged 12 - 24 months of age"
      ]),
      CourseBodyImage(image: "assets/materials/images/18.png"),
      KeyMessages(children: [
        "At age 12 months give the baby food from the family meal. Children eat more slowly than adults, so give the baby his/ her own bowl to make sure s/he eats enough food.",
        "Be patient and actively encourage your baby to eat. Never force-feed children.",
        "The child should be fed 3 - 4 times per day (a full filled cup) + 1 - 2 snacks Give your young child ¾ to one 250 ml cup/bowl at each feed.",
        "Cut the food into small pieces so the young child can easily chew and swallow.",
        "Include food from at least 5 food groups each day",
        "Add small amounts of oil or margarine to your baby’s food. Animal milks (goat, cow, etc.) are healthy for your baby. Use iodized salt in your baby’s food",
        "Store foods given to the baby in clean, safe conditions to avoid diarrhea and illness.",
        "Wash your hands with soap before preparing food and feeding your child. REMEMBER to wash your baby’s hands before and after giving them food.",
        "Continue breastfeeding your young child until they are two years old to maintain his/her health and strength."
      ]),
      // Remember(children: [
      //   "Safe preparation and storage of complementary foods: Store food in a covered, clean container and give it to your baby within 2 hours after cooking (if you don’t have a refrigerator)"
      // ]),
      SubTitleText(text: "Feeding during and after illness"),
      Objectives(children: [
        "Enhance an understanding of the breastfeeding problems and possible remedies"
      ]),
      CourseBodyImage(image: "assets/materials/images/19.png"),
      KeyMessages(children: [
        "When the child is sick continue to breastfeed often, to help quick recovery and regain the weight lost. Even if your baby has diarrhea it is important to keep breastfeeding.",
        "If your baby is too weak to suckle, express breast milk to give to the baby, either by cup or by expressing directly into the baby’s mouth. This will help you keep up making milk for your baby and prevent breast problems (engorgement).",
        "For a child aged 0-6 months breastfeed more frequently during and after illness.",
        "For a child aged 6-24 months, increase breastfeeding frequency and also feed small amounts of enriched meals/ porridge more frequently",
        "Follow treatment recommendation given by the medical practitioner.",
        Paragraph(title: "Feeding during recovery", body: ""),
        "When your young child has recovered, give him/her one additional meal of solid food each day during the next two weeks. Add more fruits and vegetables to the baby’s food every day. This will help him or her to regain weight lost during illness.",
        "Breastfeed more frequently during two weeks after recovery.",
        "If you are sick you can still breastfeed."
      ]),
      Remember(children: [
        "Remember to continue breastfeeding the child and give small amount of food more frequently (at least 8  times per more day)"
      ]),
      SubTitleText(text: "Child nutrition services needed"),
      Objectives(children: [
        "Enhance an understanding of the nutrition services needed from birth to 2 years"
      ]),
      CourseBodyImage(image: "assets/materials/images/20.png"),
      KeyMessages(children: [
        Paragraph(title: "From birth to 6 months", body: ""),
        "Newborn care - clean cord-cutting and care, washing infants in warm water, immediate breastfeeding, and keeping infants warm, early and exclusive breastfeeding",
        "Post-natal care - immunization and growth monitoring (based on MoH guideline) and promotion (baby weighing, detection of baby/ mother danger signs etc).",
        Paragraph(title: "From 6 months to 2 years and above", body: ""),
        "Measles immunization at 9 months",
        "Supplementation of vitamin A De-worming (from 12 months)",
        "Growth monitoring and promotion"
      ]),
      Remember(children: [
        "Always remember to take your child under the age of 5 to under five clinic so that their growth and development is monitored"
      ])
    ],
  ),
);
