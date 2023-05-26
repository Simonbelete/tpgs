import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/bloc/local/states.dart';
import 'package:nea/constants.dart';
import 'package:nea/i18n/app.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/screens/course_screen.dart';
import 'package:nea/screens/food_screen.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/course_card.dart';
import 'package:nea/widgets/food_card.dart';
import 'package:nea/widgets/header_6.dart';
import 'package:nea/widgets/sub_title.dart';

class FoodGrid extends StatelessWidget {
  const FoodGrid({super.key});

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
                  text: appLocale['food']![state.local]!,
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
                      ResponsiveWidget.isSmallScreen(context) ? 2 : 6,
                  mainAxisExtent:
                      ResponsiveWidget.isSmallScreen(context) ? 250 : 250,
                ),
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: EdgeInsets.only(top: 16.0),
                itemCount: foodData.length,
                itemBuilder: (context, index) => Container(
                    padding: EdgeInsets.only(
                        right:
                            ResponsiveWidget.isSmallScreen(context) ? 15 : 50),
                    child: InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, FoodScreen.routeName,
                              arguments: foodData.values
                                  .elementAt(index)[state.local]);
                        },
                        child: FoodCard(
                          image: foodData.values
                              .elementAt(index)[state.local]!
                              .coverImage,
                          title: foodData.values
                              .elementAt(index)[state.local]!
                              .title,
                        )))),
          ),
        ],
      );
    });
  }
}
