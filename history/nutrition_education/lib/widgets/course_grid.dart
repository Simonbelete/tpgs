import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/i18n/app.dart';
import 'package:nutrition_education/i18n/course.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/screens/course_screen.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/course_card.dart';
import 'package:nutrition_education/widgets/food_card.dart';
import 'package:nutrition_education/widgets/header_6.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

class CourseGrid extends StatelessWidget {
  CourseGrid({super.key});

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
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount:
                      ResponsiveWidget.isSmallScreen(context) ? 2 : 4,
                  mainAxisExtent:
                      ResponsiveWidget.isSmallScreen(context) ? 250 : 400,
                ),
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: EdgeInsets.only(top: 16.0),
                itemCount: courseData.length,
                itemBuilder: (context, index) => Container(
                    padding: EdgeInsets.only(
                        right:
                            ResponsiveWidget.isSmallScreen(context) ? 15 : 50),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, CourseScreen.routeName,
                            arguments: courseData.values
                                .elementAt(index)[state.local]);
                      },
                      child: CourseCard(
                        image: courseData.values
                            .elementAt(index)[state.local]!
                            .coverImage,
                        title: courseData.values
                            .elementAt(index)[state.local]!
                            .title,
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
//                 itemCount: courseData.length,
//                 itemBuilder: (context, index) => Container(
//                     padding: EdgeInsets.only(right: 15),
//                     child: InkWell(
//                       onTap: () {
//                         print('cliked');
//                         Navigator.pushNamed(context, CourseScreen.routeName,
//                             arguments: courseData.values
//                                 .elementAt(index)[state.local]);
//                       },
//                       child: CourseCard(
//                         image: courseData.values
//                             .elementAt(index)[state.local]!
//                             .coverImage,
//                         title: courseData.values
//                             .elementAt(index)[state.local]!
//                             .title,
//                       ),
//                     ))
// ),