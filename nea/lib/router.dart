import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/screens/course_screen.dart';
import 'package:nea/screens/image_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case HomeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => HomeScreen());
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
          builder: (_) => const Center(child: Text('Error: Page Not Found')));
  }
}
