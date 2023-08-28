import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/constants.dart';
import 'package:nea/i18n/courses.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/title_text.dart';

class CourseScreen extends StatelessWidget {
  final Course course;
  final int? courseIndex;
  static const String routeName = '/course';

  CourseScreen({super.key, required this.course, this.courseIndex});

  final GlobalKey<ScaffoldState> _key = GlobalKey(); // Create a key

  @override
  Widget build(BuildContext context) {
    var local = BlocProvider.of<LocalBloc>(context).state.local;
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      key: _key,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: secondaryColor),
        automaticallyImplyLeading: false,
        title: Center(
          child: Container(
            margin: EdgeInsets.zero,
            // decoration: BoxDecoration(border: Border.all(width: 1)),
            width: (() {
              if (ResponsiveWidget.isSmallScreen(context)) {
                return size.width;
              } else if (ResponsiveWidget.isTabletScreen(context)) {
                return size.width * 0.85;
              } else if (ResponsiveWidget.isMediumScreen(context)) {
                return size.width * 0.85;
              } else if (ResponsiveWidget.isLargeScreen(context)) {
                return size.width * 0.7;
              } else {
                // Extra Large
                return size.width * 0.7;
              }
            }()),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.arrow_back, color: Colors.black)),
                IconButton(
                  icon: const Icon(Icons.menu, color: Colors.black),
                  onPressed: () => _key.currentState!.openEndDrawer(),
                  tooltip:
                      MaterialLocalizations.of(context).openAppDrawerTooltip,
                )
              ],
            ),
          ),
        ),
        actions: <Widget>[Container()],
        scrolledUnderElevation: 5,
      ),
      body: ResponsiveWidget.isSmallScreen(context)
          ? body()
          : desktopBody(context),
      endDrawer: Drawer(
          child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 20),
              itemCount: courseData.length,
              itemBuilder: ((context, index) => ListTile(
                    title:
                        Text(courseData.values.elementAt(index)[local]!.title),
                    selected: index == courseIndex,
                    selectedTileColor: secondaryColor,
                    selectedColor: Colors.white,
                    onTap: () {
                      Navigator.pushNamed(context,
                          CourseScreen.routeName + "/" + index.toString(),
                          arguments: index);
                    },
                  )))),
    );
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
