import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "CHILD NUTRITION",
  coverImage: "assets/materials/images/14.png",
  body: Column(
    children: const [
      CourseBodyImage(image: "assets/materials/images/14.png"),
      Objectives(children: [
        'Create awareness on the benefits of exclusive breastfeeding newborn and infants'
      ]),
      SubTitle(text: "Child feeding from birth to age 6 months"),
      KeyMessages(children: [
        "Put your baby to the breast within the ﬁ rst 30 minutes of birth. Initiating breastfeeding facilitates milk production and helps your uterus to go back to shape faster and controls bleeding after delivery.",
        "Feed your baby breast milk only, not even water, during the ﬁ rst six months after birth. Each feed-ing session should take between 20 and 45 minutes.",
        "Exclusive breastfeeding promotes the child’s adequate growth and development. It is always clean; contains antibodies that protect against diseases. Breast milk is always ready and at the right temperature and is easy to digest. It contains enough water for the baby’s needs.",
        "Breastfeed as often as your child wants especially at night. Your child might be hungry if he/she is fussing, sucking fingers, or moving lips.",
        "Look into your babies eyes, gently stroke their face and body and sing songs as they breastfeed. Wash your hands with soap before breastfeeding and keep your nails trimmed.",
        "If you are HIV positive, consult the doctor immediately for guidance (see National Guideline) on how to feed your baby.",
        "When the child is 5 months old, begin to think and prepare for timely introduction of optimal complementary feeds."
      ]),
      Remember(children: [
        "Feed your baby breast milk only during the fi rst six months after birth, do not give any fl uid, not even water"
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
        "Look for cues that show your child is hungry before s/he starts to cry (e.g. puts fingers in the mouth, spits, looks what others are eating)",
        "Do not use bottles to feed your baby. They are very difficult to keep clean and can make your baby sick with diarrhea.",
        "Breastmilk continues to be very important for your baby. Breastfeed your baby first before giving other foods.",
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
        "Breastmilk is very important for your baby. Continue to breastfeed until your baby is two years older.",
        "From 7 months onwards, feed your baby 3 times a day. Give 1 to 2 snacks in between meals.",
        "Gradually increase the amount of food to ½ of a 250 ml cup. Babies have small stomachs and can only eat small amounts at each meal.",
        "Mash and soften the foods so the baby can easily chew and swallow; use breastmilk or other animal milk to prepare soft food.",
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
      KeyMessages(children: []),
      Remember(children: [
        "Safe preparation and storage of complementary foods: Store food in a covered, clean container and give it to your baby within 2 hours after cooking (if you don’t have a refrigerator)"
      ])
    ],
  ),
);
