import 'package:flutter/material.dart';
import 'package:ilri/feature/search/search_screen.dart';
import 'package:ilri/models/course.dart';
import 'package:ilri/utils/color.dart';

class CourseDetail extends StatelessWidget {
  static const String routeName = '/course-detail';
  final Course course;

  const CourseDetail({super.key, required this.course});

  Widget _buildListWidget(Color color, String text) {
    return Container(
        color: color,
        child: Center(
          child: Text(
            text,
            style: TextStyle(color: Colors.white, fontSize: 40),
          ),
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            iconTheme: IconThemeData(color: primaryColor),
            title: Text(
              course.title,
              style: TextStyle(color: primaryColor),
            )),
        body: SafeArea(
            child: SingleChildScrollView(
          child: Column(
              children: course.pages!
                  .map((e) => Column(
                        children: [
                          e.image.length != 0
                              ? Image.asset(e.image)
                              : Container(),
                          Padding(
                              padding: const EdgeInsets.only(
                                  top: 12, bottom: 25, left: 5, right: 5),
                              child: Text(e.description,
                                  style: const TextStyle(fontSize: 16.0)))
                        ],
                      ))
                  .toList()),
        )));
  }
}

class CourseBody extends StatelessWidget {
  final CoursePage coursePage;

  const CourseBody({super.key, required this.coursePage});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return SingleChildScrollView(
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          height: 300,
          width: size.width,
          decoration: BoxDecoration(color: Colors.white),
          child: Image.asset(
            coursePage.image,
            fit: BoxFit.cover,
          ),
        ),
        const SizedBox(
          height: 20,
        ),
      ]),
    );
  }
}
