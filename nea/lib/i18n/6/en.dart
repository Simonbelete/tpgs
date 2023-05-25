import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';

Course EN = Course(
  title: "WOMEN EMPOWERMENT AND MALE ENGAGEMENT",
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
      ])
    ],
  ),
);
