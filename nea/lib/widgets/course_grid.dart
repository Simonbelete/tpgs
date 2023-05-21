import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/constants.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/course_screen.dart';
import 'package:nea/service/sqlite_service.dart';
import 'package:nea/widgets/course_card.dart';
import 'package:nea/widgets/header_6.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/bloc/local/states.dart';

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
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Column(
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 10.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Header6(
                  text: state.local,
                  color: primaryColor,
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Container(
            padding: const EdgeInsets.only(left: 10.0),
            child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisExtent: 250,
                ),
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: const EdgeInsets.only(top: 16.0),
                itemCount: courses.length,
                itemBuilder: (context, index) => Container(
                    padding: const EdgeInsets.only(right: 15),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, CourseScreen.routeName,
                            arguments: courses[index].withLocal(state.local));
                      },
                      child: CourseCard(
                        image:
                            courses[index].withLocal(state.local).image ?? "",
                        title:
                            courses[index].withLocal(state.local).title ?? "",
                      ),
                    ))),
          ),
        ],
      );
    });
  }
}
