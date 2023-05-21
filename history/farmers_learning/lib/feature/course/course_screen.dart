import 'package:flutter/material.dart';
import 'package:ilri/widgets/cource_card_list.dart';
import 'package:ilri/data/course_data.dart';

class CourseScreen extends StatelessWidget {
  const CourseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ListView.builder(
          physics: BouncingScrollPhysics(),
          itemCount: courseData.length,
          itemBuilder: ((context, index) => CourceCardList(
                course: courseData[index],
              ))),
    );
  }
}
