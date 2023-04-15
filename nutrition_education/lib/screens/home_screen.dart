import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';

import 'package:nutrition_education/bloc/onboarding/bloc.dart';
import 'package:nutrition_education/bloc/search/bloc.dart';
import 'package:nutrition_education/bloc/search/events.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/screens/search_screen.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/course_grid.dart';
import 'package:nutrition_education/widgets/food_grid.dart';
import 'package:nutrition_education/widgets/header_6.dart';
import 'package:nutrition_education/widgets/header_logo.dart';
import 'package:nutrition_education/widgets/language_chip.dart';
import 'package:nutrition_education/widgets/nutrients_list.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/recipe_grid.dart';

import '../widgets/search_bar.dart';
import '../i18n/app.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  const HomeScreen({super.key});

  Future<void> _loadInfoDialog(BuildContext context) async {
    String local = context.read<LocalBloc>().state.local;

    await showDialog(
      context: context,
      builder: (context) {
        return SimpleDialog(
          children: [
            SimpleDialogOption(
              child: Image.asset(
                'assets/images/ilri_logo.png',
                width: 60,
                height: 50,
              ),
            ),
            SimpleDialogOption(
              padding: const EdgeInsets.only(top: 20.0),
              child: Center(
                child: Paragraph(
                  title: appLocale['prepared_by']![local]!,
                  body: '',
                ),
              ),
            ),
            SimpleDialogOption(
              child: Paragraph(title: '', body: appLocale['authors']![local]!),
            )
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final onBoardingBloc = OnBoardingBloc();
    Size size = MediaQuery.of(context).size;

    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Scaffold(
        body: SafeArea(
          child: ResponsiveWidget.isSmallScreen(context)
              ? body(context, state)
              : desktopBody(context, state),
        ),
        floatingActionButton: FloatingActionButton.small(
            backgroundColor: primaryColor,
            onPressed: () {
              _loadInfoDialog(context);
            },
            child: Image.asset(
              'assets/icons/info.png',
              height: 20,
            )),
      );
    });
  }

  Widget desktopBody(BuildContext context, LocalState state) {
    return Center(
      child: AspectRatio(
          aspectRatio: 12 / 9,
          child: SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                HeaderLogo(),
                // Search Box
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 30.0, vertical: 20.0),
                  child: SearchBar(
                    onChange: ((value) {}),
                    onSubmit: ((query) {
                      context
                          .read<SearchBloc>()
                          .add(SetSearchQuery(query: query));
                      Navigator.pushNamed(context, SearchScreen.routeName);
                    }),
                  ),
                ),
                // Language Selection
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 35.0),
                  child: LanguageChip(),
                ),
                // Nutrients
                const SizedBox(
                  height: 15,
                ),
                Padding(
                    padding: const EdgeInsets.only(left: 10.0, bottom: 15.0),
                    child: Header6(
                      text: appLocale['nutrients']![state.local]!,
                      color: primaryColor,
                    )),
                Container(
                  height: 200,
                  padding: EdgeInsets.only(left: 20.0),
                  child: NutrientsList(),
                ),
                // Course List
                const SizedBox(
                  height: 15,
                ),
                CourseGrid(),
                const SizedBox(
                  height: 15,
                ),
                RecipeGrid(),
                // Food List
                const SizedBox(
                  height: 15,
                ),
                FoodGrid(),
              ],
            ),
          )),
    );
  }

  Widget body(BuildContext context, LocalState state) {
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HeaderLogo(),
          // Search Box
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 30.0, vertical: 20.0),
            child: SearchBar(
              onChange: ((value) {}),
              onSubmit: ((query) {
                context.read<SearchBloc>().add(SetSearchQuery(query: query));
                Navigator.pushNamed(context, SearchScreen.routeName);
              }),
            ),
          ),
          // Language Selection
          Container(
            padding: EdgeInsets.symmetric(horizontal: 35.0),
            child: LanguageChip(),
          ),
          // Nutrients
          const SizedBox(
            height: 15,
          ),
          Padding(
              padding: const EdgeInsets.only(left: 10.0, bottom: 15.0),
              child: Header6(
                text: appLocale['nutrients']![state.local]!,
                color: primaryColor,
              )),
          Container(
            height: 200,
            padding: EdgeInsets.only(left: 20.0),
            child: NutrientsList(),
          ),
          // Course List
          const SizedBox(
            height: 15,
          ),
          CourseGrid(),
          const SizedBox(
            height: 15,
          ),
          RecipeGrid(),
          // Food List
          const SizedBox(
            height: 15,
          ),
          FoodGrid(),
        ],
      ),
    );
  }
}
