import 'package:flutter/material.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/title_text.dart';

class FoodScreen extends StatelessWidget {
  static const routeName = '/food';
  final Food food;

  const FoodScreen({super.key, required this.food});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          iconTheme: const IconThemeData(color: Colors.black),
        ),
        body: ResponsiveWidget.isSmallScreen(context)
            ? body(size)
            : desktopBody(size));
  }

  Widget body(Size size) {
    return SingleChildScrollView(
        child: Column(
      children: [
        Image.asset(food.coverImage,
            width: size.width, height: 250, fit: BoxFit.fill),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            TitleText(text: food.title),
            const SizedBox(
              height: 30.0,
            ),
            food.description!,
            const SizedBox(
              height: 10.0,
            ),
            Container(width: size.width * 1, child: food.facts),
            const SizedBox(
              height: 10.0,
            ),
            food.body!
          ]),
        )
      ],
    ));
  }

  Widget desktopBody(Size size) {
    return Center(
        child: AspectRatio(
      aspectRatio: 12 / 9,
      child: SingleChildScrollView(
          child: Column(
        children: [
          Image.asset(
            food.coverImage,
            width: 300,
            height: 250,
            fit: BoxFit.fill,
          ),
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              TitleText(text: food.title),
              const SizedBox(
                height: 30.0,
              ),
              // food.description,
              const SizedBox(
                height: 10.0,
              ),
              Container(width: size.width * 1, child: food.facts),
              const SizedBox(
                height: 10.0,
              ),
              food.body!,
            ]),
          )
        ],
      )),
    ));
  }
}
