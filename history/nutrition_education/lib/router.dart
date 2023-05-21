import 'package:flutter/material.dart';
import 'package:nutrition_education/bottom_nav_bar.dart';
import 'package:nutrition_education/i18n/food.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/model/food_model.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/model/recipe_model.dart';
import 'package:nutrition_education/screens/course_screen.dart';
import 'package:nutrition_education/screens/food_screen.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/screens/image_screen.dart';
import 'package:nutrition_education/screens/list_screen.dart';
import 'package:nutrition_education/screens/recipe_screen.dart';
import 'package:nutrition_education/screens/search_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case HomeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => HomeScreen());
    case SearchScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => SearchScreen());
    case BottomNavBar.routeName:
      int index = 0;
      if (routeSettings.arguments != null)
        index = routeSettings.arguments as int;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => BottomNavBar(
                index: index,
              ));
    case FoodScreen.routeName:
      Food food = routeSettings.arguments as Food;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => FoodScreen(
                food: food,
              ));
    case RecipeScreen.routeName:
      Recipe recipe = routeSettings.arguments as Recipe;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => RecipeScreen(recipe: recipe));
    case ListScreen.routeName:
      Nutrient nutrient = routeSettings.arguments as Nutrient;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => ListScreen(nutrient: nutrient));
    case CourseScreen.routeName:
      Course course = routeSettings.arguments as Course;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => CourseScreen(
                course: course,
              ));
    case ImageScreen.routeName:
      String image = routeSettings.arguments as String;
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => ImageScreen(image: image));
    default:
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => Center(child: Text('Error: Page Not Found')));
  }
}
