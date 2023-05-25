import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "MATERNAL NUTRITION",
  coverImage: "assets/materials/images/13.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      SubTitleText(text: "Maternal nutrition during pregnancy and lactation"),
      Objectives(children: [
        'Demonstrate basic nutrition requirements for pregnant women and lactating mothers'
      ]),
      CourseBodyImage(image: "assets/materials/images/13.png"),
      KeyMessages(children: [
        "Eat one extra meal or snack each day in addition to three meals to provide energy and nutrition for you and the growing baby",
        "Eat a diversified diet to ensure variety in the food choices using locally available foods. Choose foods from at least 5 food groups at every meal.",
        "Eat foods rich in Vitamin A and iron such as beans, meat, ﬁ sh, eggs, tomatoes, pumpkin, and green leafy vegetables. Iron rich foods help in prevention of anaemia; Vitamin A rich foods boosts your immunity",
        "Take small frequent meals and plenty of fluids and treated water",
        "Poor maternal nutrition can increase the likelihood that your baby is born preterm, too small, or with cognitive and body defects.",
        "Avoid taking tea or coﬀ ee with meals as it inhibits iron absorption and it can interfere with the body’s use of the foods.",
        "Use iodized salt only. Iodine helps your baby’s brain and body grow well.",
        "Engage in light household duties.",
        "Exercise keeps your body strong and healthy.",
        "Ask husband to help you with household’s chores."
      ]),
      SubTitleText(text: "Pregnancy and Lactation"),
      Bullet(children: [
        "Pregnant and lactating woman’s diet should include a substantial increase in calories, protein, calcium, folic acid, and iron.",
        "Pregnant women at particular risk for nutritional deficiencies are adolescents, underweight women, obese women, women with chronic nutritional problems, women who smoke or ingest alcohol or drugs, low-income women, and ",
        "women with chronic illnesses such as diabetes or anemia"
      ]),
      SubTitleText(text: "Recommendations for mothers during pregnancy"),
      Bullet(children: [
        "Weight gain during pregnancy is essential.",
        "Strongly discourage clients who are obese from attempting to lose weight during pregnancy.",
        "Encourage clients to plan meals carefully so that all nutrients needed during pregnancy can be included without excessive calories. Using a food guide for pregnancy is helpful.",
        "Caffeine intake should be limited.",
        "Instruct client to take only vitamins and minerals prescribed. Excessive amounts can be harmful",
        "Advise clients that skipping meals is a poor practice, especially for pregnant women. The fetus needs a steady supply of nutrients.",
        "Encourage the pregnant mother to use high-fiber foods and plenty of fluids to avoid constipation.",
        "Give priority to helping pregnant teenagers improve their eating habits. Together with the teenagers, plan meals and snacks that are nutritious and, at the same time, acceptable to the teenagers. Teen age pregnancy is undesirable.",
        "Take advantage of the client’s high motivation during pregnancy to provide nutrition education for the family and the pregnant woman. "
      ])
    ],
  ),
);
