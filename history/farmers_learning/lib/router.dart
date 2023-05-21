import 'package:flutter/material.dart';
import 'package:ilri/screens/course_detail_screen.dart';
import 'package:ilri/feature/home/home_screen.dart';
import 'package:ilri/feature/search/search_screen.dart';
import 'package:ilri/models/course.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case HomeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => HomeScreen());
    case SearchScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => SearchScreen());
    case CourseDetail.routeName:
      Course course = routeSettings.arguments as Course;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => CourseDetail(course: course));
    default:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => HomeScreen());
  }
}
