import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/i18n/app.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';
import 'package:nutrition_education/widgets/title_text.dart';

class RecipeScreen extends StatelessWidget {
  static const routeName = '/recipe';
  final Recipe recipe;

  const RecipeScreen({super.key, required this.recipe});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<LocalBloc, LocalState>(
      builder: (context, state) {
        return Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.white,
              elevation: 0,
              iconTheme: const IconThemeData(color: Colors.black),
            ),
            body: ResponsiveWidget.isSmallScreen(context)
                ? body(size, state)
                : desktopBody(size, state));
      },
    );
  }

  Widget body(Size size, LocalState state) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset(recipe.coverImage,
              width: size.width, height: 250, fit: BoxFit.fill),
          Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TitleText(text: recipe.title),
                  const SizedBox(
                    height: 30.0,
                  ),
                  recipe.facts,
                  const SizedBox(
                    height: 15.0,
                  ),
                  SubTitleText(text: appLocale['ingredients']![state.local]!),
                  recipe.ingredients,
                  SubTitleText(text: appLocale['instructions']![state.local]!),
                  Container(
                    padding: EdgeInsets.only(left: 8),
                    child: recipe.instructions,
                  ),
                  const SizedBox(
                    height: 10.0,
                  ),
                  recipe.body
                ],
              ))
        ],
      ),
    );
  }

  Widget desktopBody(Size size, LocalState state) {
    return Center(
      child: AspectRatio(
        aspectRatio: 12 / 9,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Image.asset(recipe.coverImage,
                    width: 500, height: 550, fit: BoxFit.fill),
              ),
              Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 20.0, vertical: 10.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TitleText(text: recipe.title),
                      const SizedBox(
                        height: 30.0,
                      ),
                      recipe.facts,
                      const SizedBox(
                        height: 15.0,
                      ),
                      SubTitleText(
                          text: appLocale['ingredients']![state.local]!),
                      recipe.ingredients,
                      SubTitleText(
                          text: appLocale['instructions']![state.local]!),
                      Container(
                        padding: EdgeInsets.only(left: 8),
                        child: recipe.instructions,
                      ),
                      const SizedBox(
                        height: 10.0,
                      ),
                      recipe.body
                    ],
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
