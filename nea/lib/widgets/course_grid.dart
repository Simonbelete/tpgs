import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/bloc/local/states.dart';
import 'package:nea/constants.dart';
import 'package:nea/i18n/app.dart';
import 'package:nea/i18n/courses.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/course_screen.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/course_card.dart';
import 'package:nea/widgets/header_6.dart';
import 'package:nea/widgets/sub_title.dart';

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
                  crossAxisCount: (() {
                    if (ResponsiveWidget.isSmallScreen(context)) {
                      return 2;
                    } else if (ResponsiveWidget.isTabletScreen(context)) {
                      return 2;
                    } else if (ResponsiveWidget.isMediumScreen(context)) {
                      return 3;
                    } else if (ResponsiveWidget.isLargeScreen(context)) {
                      return 3;
                    } else {
                      return 4;
                    }
                  }()),
                  mainAxisExtent:
                      ResponsiveWidget.isSmallScreen(context) ? 250 : 400,
                ),
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: EdgeInsets.only(top: 16.0),
                itemCount: courseData.length,
                itemBuilder: (context, index) => Container(
                    padding: EdgeInsets.only(
                      right: (() {
                        if (ResponsiveWidget.isSmallScreen(context)) {
                          return 15.0;
                        } else if (ResponsiveWidget.isMediumScreen(context)) {
                          return 20.0;
                        } else if (ResponsiveWidget.isLargeScreen(context)) {
                          return 40.0;
                        } else {
                          return 50.0;
                        }
                      }()),
                      // ResponsiveWidget.isSmallScreen(context) ? 15 : 50
                    ),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context,
                            CourseScreen.routeName + "/" + index.toString(),
                            arguments: index);
                        // Navigator.pushNamed(context, CourseScreen.routeName,
                        //     arguments: courseData.values
                        //         .elementAt(index)[state.local]);
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
