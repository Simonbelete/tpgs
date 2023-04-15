import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/i18n/app.dart';
import 'package:nutrition_education/i18n/course.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/course_screen.dart';
import 'package:nutrition_education/widgets/course_card.dart';
import 'package:nutrition_education/widgets/food_card.dart';
import 'package:nutrition_education/widgets/header_6.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

class CourseGridList extends StatelessWidget {
  final Map<String, Map<String, Course>> course;
  CourseGridList({super.key, required this.course});

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
                  text: appLocale['courses']![state.local]!,
                  color: primaryColor,
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Container(
            padding: EdgeInsets.only(left: 10.0),
            child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisExtent: 250,
                ),
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: EdgeInsets.only(top: 16.0),
                itemCount: course.length,
                itemBuilder: (context, index) => Container(
                    padding: EdgeInsets.only(right: 15),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, CourseScreen.routeName,
                            arguments:
                                course.values.elementAt(index)[state.local]);
                      },
                      child: CourseCard(
                        image: course.values
                            .elementAt(index)[state.local]!
                            .coverImage,
                        title:
                            course.values.elementAt(index)[state.local]!.title,
                      ),
                    ))),
          ),
        ],
      );
    });
  }
}


// ListView.builder(
//                 scrollDirection: Axis.horizontal,
//                 itemCount: course.length,
//                 itemBuilder: (context, index) => Container(
//                     padding: EdgeInsets.only(right: 15),
//                     child: InkWell(
//                       onTap: () {
//                         print('cliked');
//                         Navigator.pushNamed(context, CourseScreen.routeName,
//                             arguments: course.values
//                                 .elementAt(index)[state.local]);
//                       },
//                       child: CourseCard(
//                         image: course.values
//                             .elementAt(index)[state.local]!
//                             .coverImage,
//                         title: course.values
//                             .elementAt(index)[state.local]!
//                             .title,
//                       ),
//                     ))
// ),