import 'package:flutter/material.dart';
import 'package:ilri/widgets/cource_card_list.dart';
import 'package:ilri/data/course_data.dart';

class CourseList extends StatelessWidget {
  const CourseList({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
          children: courseData
              .map((e) => CourceCardList(
                    course: e,
                  ))
              .toList()),
    );
  }
}
