import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';

Course EN = Course(
    title: "WHY NUTRITION MATTERS",
    coverImage: "assets/materials/images/imag_4.png",
    body: Column(
      children: const [
        Objectives(
            title: "OBJECTIVES",
            children: ['Understand why good nutrition is important']),
        Bullet(children: [
          'Good nutrition is important at all stages of life.',
          'Our bodies need enough food to give us energy, enable us to grow, learn, work and stay healthy.',
          'Health and nutrition are closely linked – a person must be well nourished to be healthy, while poor health can aﬀ ect nutritional status'
        ]),
        KeyMessages(children: [
          'Good nutrition is important at all stages of life.',
          'Our bodies need enough food to give us energy, enable us to grow, learn, work and stay healthy.',
          'Health and nutrition are closely linked – a person must be well nourished to be healthy, while poor health can aﬀ ect nutritional status',
          'A poorly nourished woman, when she becomes pregnant, is likely to give birth to an underweight/malformed child who will have a poor start in life and likely to have an underweight child herself.',
          'The foetus and children under the age of two have high nutrient needs because their bodies are growing and changing quickly, even before birth.',
          'The three key principles of good nutrition are: \n\nAdequate diet - eating enough of the right foods.\n\nAbsence of disease - staying healthy.\n\nAppropriate caring practices – good care, rest, hygiene, and a stimulating and loving environment for young children and the whole family.',
        ]),
        Remember(children: ['The family need a balanced meal everyday']),
        CourseBodyImage(
          image: 'assets/materials/images/imag_4.png',
          description:
              "A poorly nourished pregnant woman is likely to give birth to an underweight baby who grows up as a weaker adolescent and likely to give birth to an underweight baby in future.",
        ),
      ],
    ));
