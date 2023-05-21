import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/search/bloc.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/i18n/course.dart';
import 'package:nutrition_education/i18n/food.dart';
import 'package:nutrition_education/i18n/recipe.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/screens/course_screen.dart';
import 'package:nutrition_education/screens/food_screen.dart';
import 'package:nutrition_education/screens/recipe_screen.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/header_6.dart';
import 'package:nutrition_education/widgets/search_bar.dart';

class SearchScreen extends StatefulWidget {
  static const routeName = '/search';
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  String query = '';
  List<Course> _courseResult = [];
  List<Food> _foodResult = [];
  List<Recipe> _recipeResult = [];

  @override
  void initState() {
    String searchQuery = context.read<SearchBloc>().state.query;
    setState(() {
      query = searchQuery;
    });
    _search();
    super.initState();
  }

  void _search() {
    String local = context.read<LocalBloc>().state.local;

    // TODO: Improve search query
    // Reset
    setState(() {
      _courseResult = [];
      _foodResult = [];
      _recipeResult = [];
    });
    for (var i = 0; i < courseData.length; i++) {
      if (courseData.values
          .elementAt(i)[local]!
          .title
          .toLowerCase()
          .contains(query.toLowerCase())) {
        setState(() {
          _courseResult.add(courseData.values.elementAt(i)[local]!);
        });
      }
    }
    for (var i = 0; i < foodData.length; i++) {
      if (foodData.values
          .elementAt(i)[local]!
          .title
          .toLowerCase()
          .contains(query.toLowerCase())) {
        setState(() {
          _foodResult.add(foodData.values.elementAt(i)[local]!);
        });
      }
    }
    for (var i = 0; i < recipeData.length; i++) {
      if (recipeData.values
          .elementAt(i)[local]!
          .title
          .toLowerCase()
          .contains(query.toLowerCase())) {
        setState(() {
          _recipeResult.add(recipeData.values.elementAt(i)[local]!);
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          iconTheme: IconThemeData(color: primaryColor),
          backgroundColor: Colors.white,
          elevation: 0,
          title: Image.asset(
            'assets/images/logo_color.png',
            height: 30,
          ),
          actions: [
            Container(
              padding: EdgeInsets.only(right: 10.0),
              child: Image.asset(
                'assets/images/ilri_logo.png',
                width: 60,
              ),
            )
          ],
        ),
        body: ResponsiveWidget.isSmallScreen(context) ? body() : desktopBody());
  }

  Widget body() {
    return SingleChildScrollView(
      child: Container(
          padding: EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            children: [
              const SizedBox(
                height: 20,
              ),
              SearchBar(
                initialValue: query,
                onChange: ((value) {
                  setState(() {
                    query = value;
                  });
                  if (!value.isEmpty) {
                    _search();
                  }
                }),
                onSubmit: ((query) {
                  setState(() {
                    query = query;
                  });
                  if (!query.isEmpty) {
                    _search();
                  }
                }),
              ),
              const SizedBox(
                height: 20,
              ),
              // Course
              ListView.builder(
                shrinkWrap: true,
                itemCount: _courseResult.length,
                itemBuilder: (context, index) {
                  return InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, CourseScreen.routeName,
                            arguments: _courseResult[index]);
                      },
                      child: Card(
                        child: ListTile(
                          leading: Image.asset(
                            _courseResult[index].coverImage,
                            height: 50,
                            width: 70,
                            fit: BoxFit.fill,
                          ),
                          title: Header6(
                            text: _courseResult[index].title,
                            color: primaryColor,
                          ),
                        ),
                      ));
                },
              ),
              // Food
              ListView.builder(
                shrinkWrap: true,
                itemCount: _foodResult.length,
                itemBuilder: (context, index) {
                  return InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, FoodScreen.routeName,
                            arguments: _foodResult[index]);
                      },
                      child: Card(
                        child: ListTile(
                          leading: Image.asset(
                            _foodResult[index].coverImage,
                            height: 50,
                            width: 70,
                            fit: BoxFit.fill,
                          ),
                          title: Header6(
                            text: _foodResult[index].title,
                            color: primaryColor,
                          ),
                        ),
                      ));
                },
              ),
              // Recipe
              ListView.builder(
                shrinkWrap: true,
                itemCount: _recipeResult.length,
                itemBuilder: (context, index) {
                  return InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, RecipeScreen.routeName,
                            arguments: _recipeResult[index]);
                      },
                      child: Card(
                        child: ListTile(
                          leading: Image.asset(
                            _recipeResult[index].coverImage,
                            height: 50,
                            width: 70,
                            fit: BoxFit.fill,
                          ),
                          title: Header6(
                            text: _recipeResult[index].title,
                            color: primaryColor,
                          ),
                        ),
                      ));
                },
              )
            ],
          )),
    );
  }

  Widget desktopBody() {
    return Center(
      child: AspectRatio(
        aspectRatio: 5 / 10,
        child: SingleChildScrollView(
          child: Container(
              padding: EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  SearchBar(
                    initialValue: query,
                    onChange: ((value) {
                      setState(() {
                        query = value;
                      });
                      if (!value.isEmpty) {
                        _search();
                      }
                    }),
                    onSubmit: ((query) {
                      setState(() {
                        query = query;
                      });
                      if (!query.isEmpty) {
                        _search();
                      }
                    }),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  // Course
                  ListView.builder(
                    shrinkWrap: true,
                    itemCount: _courseResult.length,
                    itemBuilder: (context, index) {
                      return InkWell(
                          onTap: () {
                            Navigator.pushNamed(context, CourseScreen.routeName,
                                arguments: _courseResult[index]);
                          },
                          child: Card(
                            child: ListTile(
                              leading: Image.asset(
                                _courseResult[index].coverImage,
                                height: 50,
                                width: 70,
                                fit: BoxFit.fill,
                              ),
                              title: Header6(
                                text: _courseResult[index].title,
                                color: primaryColor,
                              ),
                            ),
                          ));
                    },
                  ),
                  // Food
                  ListView.builder(
                    shrinkWrap: true,
                    itemCount: _foodResult.length,
                    itemBuilder: (context, index) {
                      return InkWell(
                          onTap: () {
                            Navigator.pushNamed(context, FoodScreen.routeName,
                                arguments: _foodResult[index]);
                          },
                          child: Card(
                            child: ListTile(
                              leading: Image.asset(
                                _foodResult[index].coverImage,
                                height: 50,
                                width: 70,
                                fit: BoxFit.fill,
                              ),
                              title: Header6(
                                text: _foodResult[index].title,
                                color: primaryColor,
                              ),
                            ),
                          ));
                    },
                  ),
                  // Recipe
                  ListView.builder(
                    shrinkWrap: true,
                    itemCount: _recipeResult.length,
                    itemBuilder: (context, index) {
                      return InkWell(
                          onTap: () {
                            Navigator.pushNamed(context, RecipeScreen.routeName,
                                arguments: _recipeResult[index]);
                          },
                          child: Card(
                            child: ListTile(
                              leading: Image.asset(
                                _recipeResult[index].coverImage,
                                height: 50,
                                width: 70,
                                fit: BoxFit.fill,
                              ),
                              title: Header6(
                                text: _recipeResult[index].title,
                                color: primaryColor,
                              ),
                            ),
                          ));
                    },
                  )
                ],
              )),
        ),
      ),
    );
  }
}
