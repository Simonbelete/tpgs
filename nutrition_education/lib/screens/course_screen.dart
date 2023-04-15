import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/title_text.dart';

class CourseScreen extends StatelessWidget {
  final Course course;
  static const String routeName = '/course';

  const CourseScreen({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          iconTheme: const IconThemeData(color: Colors.black),
        ),
        body: ResponsiveWidget.isSmallScreen(context) ? body() : desktopBody());
  }

  Widget body() {
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Titile
            TitleText(text: course.title),
            const SizedBox(
              height: 30.0,
            ),
            course.body,
          ],
        ),
      ),
    );
  }

  Widget desktopBody() {
    return Center(
      child: AspectRatio(
        aspectRatio: 15 / 9,
        child: SingleChildScrollView(
          child: Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Titile
                TitleText(text: course.title),
                const SizedBox(
                  height: 30.0,
                ),
                course.body,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
