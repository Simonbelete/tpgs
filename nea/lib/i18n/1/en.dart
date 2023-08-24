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
  title: "WHY NUTRITION MATTERS",
  coverImage: "assets/materials/images/imag_4.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(
          title: "OBJECTIVES",
          children: ['Understand why good nutrition is important']),
      CourseBodyImage(image: "assets/materials/images/imag_4.png"),
      KeyMessages(children: [
        'Good nutrition is important at all stages of life.',
        'Our bodies need enough food to give us energy, enable us to grow, learn, work and stay healthy.',
        'Health and nutrition are closely linked - a person must be well nourished to be healthy, while poor health can aﬀ ect nutritional status',
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
          title: "Malnutrition",
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
        'A person who does not eat a diverse diet may lack certain vitamins and minerals (micronutrients). This can aﬀ ect health at all stages of life and prevent adequate growth and development in children. Micronutrients of public health signiﬁ cance are iron, vitamin A and iodine, lack of which aﬀ ect health and growth. A varied diet or taking special supplements can ensure people get the micronutrients they need.'
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
              "results from too much nutrient intake relative to nutrient requirements based on age, gender, physical activity, height, weight, and health status of the individual. This is still rare in Ethiopia, but it is becoming more common in populations with increased exposure to energy-dense foods that often live in urban areas. Effects of overnutrition include increased lifetime risk of chronic diseases, including diabetes, cardiovascular disease, obesity, and cancer. "),
      CourseBodyImage(
        image: 'assets/materials/images/c_4.png',
        description: "The Above child is Obese",
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
              "an indicator assessing the adequacy of weight-for-age. The causes can be short-term or long-term and are difficult to define. "),
      SubTitleText(
        text: "Wasting",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Wasting ",
          body:
              "normally the result of acute or short-term insufficient food intake, often combined with frequent illness. Results in a dangerously thin child (i.e., they have a very low weight for their height). "),
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
      CourseBodyImage(
        image: 'assets/materials/images/c_2.png',
        description: "The Above child is Stunted and Underweight",
      ),
      CourseBodyImage(
        image: 'assets/materials/images/c_3.png',
        description: "The Above child is Normal",
      ),

      SubTitleText(
        text: "Deficiencies in vitamins and minerals",
        fontSize: 16.0,
      ),
      Paragraph(
          title: "Deficiencies in vitamins and minerals ",
          body:
              "result from a poor-quality diet. Micronutrient deficiencies can also result from frequent illness, which may increase requirement, utilization, or loss of nutrients. "),
      Paragraph(
          title: "NOTE: ",
          body: " All these children may also be micronutrient deficient")
    ],
  ),
);
