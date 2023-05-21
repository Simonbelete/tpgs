import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/utils/open_url.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/course_video_player.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
    coverImage: 'assets/materials/nutrition_status_same_age_children.png',
    title: 'Cycle of malnutrition',
    body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const CourseBodyImage(
          image: 'assets/materials/nutrition_status_same_age_children.png'),
      const Paragraph(
          title: 'Malnutrition ',
          body: 'is a term that includes overnutrition and undernutrition.'),
      const Paragraph(
          title: 'Overnutrition ',
          body:
              'results from too much nutrient intake relative to nutrient requirements based on age, gender, physical activity, height, weight, and health status of the individual. In Ethiopia, this is still rare, but it is becoming more common in populations with increased exposure to energy-dense foods, which often live in urban areas. Effects of overnutrition include increased lifetime risk of chronic diseases, including diabetes, cardiovascular disease, obesity, and cancer. '),
      const Paragraph(
          title: 'Undernutrition ',
          body:
              'is, in general terms, an outcome of insufficient quantity and quality of food and frequent episodes of infectious disease.'),
      const Paragraph(
          title: 'Undernutrition ',
          body:
              'describes a range of conditions, including being underweight, short, thin, and deficient in vitamins and minerals. A child is defined as undernourished if they are very thin or much shorter than the average for their age. The most used indicators of under-nutrition are:'),
      const Bullet(children: [
        'Wasting: normally the result of acute or short-term insufficient food intake, often combined with frequent illness. Results in a child who is dangerously thin (i.e., they have a very low weight for their height).',
        'Stunting: normally an indicator of chronic or long-term insufficient energy or micronutrient intake, although it has many non-nutritional causes such as helminth infestation and frequent or chronic infection. Results in a very short child (i.e., they have a very short height for their age).',
        'Underweight: an indicator assessing the adequacy of weight-for-age. The causes of which can be short-term or long-term and are difficult to define.'
      ]),
      const Paragraph(
          title: '',
          body:
              'All of the children pictured below are the same age. Which of them suffer from malnu'),
      const CourseBodyImage(
          image: 'assets/materials/malnutration_children_picture.png'),
      const Paragraph(
          title: '',
          body:
              'Only the third boy, left to right, is under good nutritional status'),
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
    ]));
