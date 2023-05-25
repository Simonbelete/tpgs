import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/bloc/local/states.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/screens/food_screen.dart';
import 'package:nea/widgets/food_card.dart';

class FoodGridList extends StatelessWidget {
  final Map<String, Map<String, Food>> foods;

  const FoodGridList({super.key, required this.foods});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Column(
        children: [
          Container(
            padding: EdgeInsets.only(left: 0.0),
            child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisExtent: 250,
                ),
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: EdgeInsets.only(top: 16.0),
                itemCount: foods.length,
                itemBuilder: (context, index) => Container(
                    padding: EdgeInsets.only(right: 15),
                    child: InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, FoodScreen.routeName,
                              arguments:
                                  foods.values.elementAt(index)[state.local]);
                        },
                        child: FoodCard(
                          image: foods.values
                              .elementAt(index)[state.local]!
                              .coverImage,
                          title:
                              foods.values.elementAt(index)[state.local]!.title,
                        )))),
          ),
        ],
      );
    });
  }
}
