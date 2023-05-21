import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/i18n/app.dart';
import 'package:nutrition_education/i18n/course.dart';
import 'package:nutrition_education/i18n/food.dart';
import 'package:nutrition_education/screens/course_screen.dart';
import 'package:nutrition_education/screens/food_screen.dart';
import 'package:nutrition_education/widgets/course_card.dart';
import 'package:nutrition_education/widgets/food_card.dart';
import 'package:nutrition_education/widgets/header_6.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

class FoodSlide extends StatelessWidget {
  const FoodSlide({super.key});

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
            height: 250,
            child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: foodData.length,
                itemBuilder: (context, index) => Container(
                    padding: EdgeInsets.only(right: 15),
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
