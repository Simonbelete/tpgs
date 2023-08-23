import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/title_text.dart';

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
        body: ResponsiveWidget.isSmallScreen(context)
            ? body()
            : desktopBody(context));
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

  Widget desktopBody(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Center(
      child: SizedBox(
        width: (() {
          if (ResponsiveWidget.isSmallScreen(context)) {
            return size.width;
          } else if (ResponsiveWidget.isTabletScreen(context)) {
            return size.width * 0.75;
          } else if (ResponsiveWidget.isMediumScreen(context)) {
            return size.width * 0.75;
          } else if (ResponsiveWidget.isLargeScreen(context)) {
            return size.width * 0.6;
          } else {
            return size.width * 0.6;
          }
        }()),
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

  // Widget desktopBody() {
  //   return Center(
  //     child: AspectRatio(
  //       aspectRatio: 15 / 9,
  //       child: SingleChildScrollView(
  //         child: Container(
  //           padding:
  //               const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
  //           child: Column(
  //             crossAxisAlignment: CrossAxisAlignment.start,
  //             children: [
  //               // Titile
  //               TitleText(text: course.title),
  //               const SizedBox(
  //                 height: 30.0,
  //               ),
  //               course.body,
  //             ],
  //           ),
  //         ),
  //       ),
  //     ),
  //   );
  // }
}
