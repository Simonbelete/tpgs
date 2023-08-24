import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "WOMEN EMPOWERMENT", // MALE ENGAGEMENT
  coverImage: "assets/materials/images/4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(children: [
        "To enhance men’s understanding of their role in promoting good family nutrition and To empower women to make decisions around family resource in order to achieve good nutrition"
      ]),
      CourseBodyImage(
        image: "assets/materials/images/4.png",
      ),
      KeyMessages(children: [
        "Husband and wife should jointly discuss how to use income earned to beneﬁ t family nutrition",
        "Husband should ensure that the family has enough diverse foods in the house",
        "Husband should support wife’s workload where necessary to help free wife’s time and energy so that she can have enough time to make nutritious family meals",
        "Husband and wife should jointly discuss and plan their family meals to identify gaps in food sourcing",
      ]),
      SubTitleText(text: 'Why women empowerment'),
      Bullet(children: [
        'Women are underrepresented in power and decision-making roles.',
        'Women receive unequal pay for equal work.',
        'Experience physical and/or sexual violence.',
        'Are not offered the same job opportunities, education, training, and professional development opportunities.',
        'Women are economically disadvantaged and lack equal opportunities to compete for business.',
        'Gender equality continues to be under-prioritized by decision-makers.'
      ]),
      SubTitleText(text: 'Opportunities'),
      Bullet(children: [
        'Supporting women’s health leads to higher returns and reduces absenteeism.',
        'Addressing violence against women reduces company costs.',
        'Creating diverse workplaces increases productivity.',
        'Investing in women-owned businesses yields a higher return on investment.',
        'Taking advantage of women’s consumer power is a smart business decision.',
        'Increasing women in leadership leads to organizational effectiveness and a prosperous bottom line.'
      ]),
      Paragraph(
          title:
              'Women’s empowerment is a critical driver of sustainable development. Empowering women to participate fully in economic life across all sectors and throughout all levels of economic activity is essential to:',
          body: ""),
      Bullet(children: [
        "Expand economic growth and build strong economies.",
        "Promote social development and establish more stable and just societies.",
        "Improve the quality of life for women, men, families, and communities.",
        "Propel businesses’ operations and goals and enhance business performance."
      ])
    ],
  ),
);
