import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/utils/open_url.dart';
import 'package:nea/widgets/bmi_calculator.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/course_video_player.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "WHY NUTRITION MATTERS",
  coverImage: "assets/materials/images/imag_4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Objectives(
          title: "OBJECTIVES",
          children: ['Understand why good nutrition is important']),
      const CourseBodyImage(image: "assets/materials/images/imag_4.png"),
      const KeyMessages(children: [
        'Good nutrition is important at all stages of life.',
        'Our bodies need enough food to give us energy, enable us to grow, learn, work and stay healthy.',
        'Health and nutrition are closely linked - a person must be well nourished to be healthy, while poor health can affect  nutritional status',
        'A poorly nourished woman, when she becomes pregnant, is likely to give birth to an underweight/malformed child who will have a poor start in life and likely to have an underweight child herself.',
        'The fetus and children under the age of two have high nutrient needs because their bodies are growing and changing quickly, even before birth.',
        'The three key principles of good nutrition are: \n\nAdequate diet - eating enough of the right foods.\n\nAbsence of disease - staying healthy.\n\nAppropriate caring practices – good care, rest, hygiene, and a stimulating and loving environment for young children and the whole family.',
      ]),
      const Remember(children: ['The family need a balanced meal everyday']),
      const CourseBodyImage(
        image: 'assets/materials/images/imag_4.png',
        description:
            "A poorly nourished pregnant woman is likely to give birth to an underweight baby who grows up as a weaker adolescent and likely to give birth to an underweight baby in future.",
      ),
      CourseBodyImage(
        image: 'assets/materials/images/img_5.png',
        description:
            "A well-nourished pregnant woman will give birth to a healthy baby who grows up as a healthy adolescent and likely to give birth to a health baby in the future.",
      ),
      //
      // Causes of malnutrition
      //
      SubTitleText(
        text: 'Malnutrition',
        fontSize: 27.0,
      ),
      Paragraph(
          title: "Malnutrition ",
          body: "is a term that includes overnutrition and undernutrition."),
      Objectives(
          title: "OBJECTIVE",
          children: ['Know about malnutrition and its causes']),
      KeyMessages(children: [
        Paragraph(
            title: "",
            body:
                "Malnutrition refers to deﬁ ciencies, excesses or imbalances in a person’s intake of nutrients."),
        'The causes of malnutrition are diverse, interlinked and complex:',
        Bullet(children: [
          'Immediate causes (inadequate diet - quantity and quality, diseases)',
          'Underlying causes (food insecurity, inadequate mother and child care, and inadequate healthcare and unhealthy environment)'
        ]),
        'A person who does not eat a diverse diet may lack certain vitamins and minerals (micronutrients). This can affect health at all stages of life and prevent adequate growth and development in children. Micronutrients of public health signiﬁ cance are iron, vitamin A and iodine, lack of which affect health and growth. A varied diet or taking special supplements can ensure people get the micronutrients they need.'
      ]),
      CourseBodyImage(
        image: 'assets/materials/images/8.png',
        description: 'Inadequate food availability',
      ),
      CourseBodyImage(
        image: 'assets/materials/images/9.png',
        description: 'Adequate food availability',
      ),
      Remember(children: ['Eat a variety of foods everyday']),

      SubTitleText(text: "Types of malnutrition"),
      Paragraph(
          title: "Overnutrition ",
          body:
              "results from too much nutrient intake relative to nutrient requirements based on age, gender, physical activity, height, weight, and health status of the individual. This is still rare in East Africa, but it is becoming more common in populations with increased exposure to energy-dense foods that often live in urban areas. Effects of overnutrition include increased lifetime risk of chronic diseases, including diabetes, cardiovascular disease, obesity, and cancer. "),
      CourseBodyImage(
        image: 'assets/materials/images/c_4.png',
        description:
            "The Above child is Obese. He is at the same age as the below three children",
      ),
      Paragraph(
          title: "Undernutrition ",
          body:
              "is, in general terms, an outcome of insufficient quantity and quality of food and frequent episodes of infectious disease."),
      Paragraph(
          title: "",
          body:
              "Undernutrition describes a range of conditions, including being underweight, short, thin, and being deficient in vitamins and minerals. A child is defined as undernourished if they are very thin or much shorter than the average for their age. The most used indicators of under-nutrition are: "),
      SubTitleText(
        text: "Underweight",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Underweight ",
          body:
              "is an indicator assessing the adequacy of weight-for-age. The causes can be short-term or long-term and are difficult to define. "),
      SubTitleText(
        text: "Wasting",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Wasting ",
          body:
              "is the result of acute or short-term insufficient food intake, often combined with frequent illness. This is manifested in a very thin child (i.e., they have a very low weight for their height). "),
      CourseBodyImage(
        image: 'assets/materials/images/c_1.png',
        description: "The Above child is Wasted and Underweight",
      ),
      SubTitleText(
        text: "Stunting",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Stunting ",
          body:
              "normally an indicator of chronic or long-term insufficient energy or micronutrient intake, although it has many non-nutritional causes such as helminth infestation and frequent or chronic infection. Results in a very short child (i.e., they have a very short height for their age)."),
      Paragraph(
        title: "Consequences of malnutrition",
        body: "",
      ),
      const Bullet(children: [
        "Children experiencing stunting may never grow to their full height or develop their full cognitive potential",
        "43 percent of children under five in low and middle-income countries are at increased risk of poverty because of stunting",
        "Stunted children earn 20 percent less as adults than their non-stunted counterparts",
        "Mothers affected by undernutrition are more likely to have children who suffer from stunting or wasting, perpetuating the cycle of poverty and undernutrition"
      ]),
      const CourseBodyImage(
        image: 'assets/materials/images/c_2.png',
        description: "The Above child is Stunted and Underweight",
      ),
      const CourseBodyImage(
        image: 'assets/materials/images/c_3.png',
        description: "The Above child is Normal",
      ),

      const SubTitleText(
        text: "Deficiencies in vitamins and minerals",
        fontSize: 16.0,
      ),
     const Paragraph(
          title: "Deficiencies in vitamins and minerals ",
          body:
              "result from a poor-quality diet. Micronutrient deficiencies can also result from frequent illness, which may increase requirement, utilization, or loss of nutrients. "),
      const Paragraph(
          title: "NOTE: ",
          body: " All these children may also be micronutrient deficient"),
      const CourseVideoPlayer(video: 'assets/videos/child_malnutrition_en.mp4'),
      InkWell(
        onTap: () {
          openUrl(
              'https://www.youtube.com/watch?v=bqEIcMMmj5M&ab_channel=iheed');
        },
        child: const Text(
          'Credit - Youtube iheed',
          style: TextStyle(color: Colors.blueAccent),
        ),
      ),
      const SubTitleText(text: 'The Cycle of malnutrition'),
      const CourseVideoPlayer(
          video: 'assets/videos/the_cycle_of_malnutrition_en.mp4'),
      InkWell(
        onTap: () {
          openUrl(
              'https://www.youtube.com/watch?v=AY_7756MFBw&ab_channel=THPAustralia');
        },
        child: const Text(
          'Credit - Youtube THPAustralia',
          style: TextStyle(color: Colors.blueAccent),
        ),
      ),
      // SizedBox(
      //   child: BmiCalculator(),
      // )
    ],
  ),
);
