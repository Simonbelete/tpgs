import 'package:flutter/material.dart';
import 'package:nea/models/Course.dart';
import 'package:nea/service/sqlite_service.dart';

class CourseGrid extends StatefulWidget {
  const CourseGrid({super.key});

  @override
  State<CourseGrid> createState() => _CourseGridState();
}

class _CourseGridState extends State<CourseGrid> {
  List<Course> courses = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  void loadData() async {
    courses = await SqliteService().courses();
    print('--------------------');
    print(courses);
  }

  @override
  Widget build(BuildContext context) {
    return Text("hello");
    // return GridView.builder(
    //   gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    //       crossAxisCount: 2, mainAxisExtent: 250),
    //   itemCount: courses.length,
    //   itemBuilder: ((context, index) => Container(
    //         child: Text(courses[index].title_am),
    //       )),
    // );
  }
}
