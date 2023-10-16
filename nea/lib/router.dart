import 'package:flutter/material.dart';
import 'package:nea/i18n/courses.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/models/food_model.dart';
import 'package:nea/screens/chat_list.screen.dart';
import 'package:nea/screens/food_screen.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/screens/course_screen.dart';
import 'package:nea/screens/image_screen.dart';
import 'package:nea/screens/not_found_screen.dart';
import 'package:nea/utils/preferencess.dart';
import 'package:nea/widgets/title_text.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Path {
  const Path(this.pattern, this.builder);

  final String pattern;
  final Widget Function(BuildContext, String) builder;
}

List<Path> paths = [
  Path(
    r'^' + HomeScreen.routeName,
    (context, match) => HomeScreen(),
  ),
  Path(
    r'^' + ChatListScreen.routeName,
    (context, match) => ChatListScreen(),
  ),
  Path(
    r'^/course/([\w-]+)$',
    (
      context,
      match,
    ) {
      var local = Preferencess.getLocalSync() ?? "en";
      if (match == null) return const HomeScreen();
      var index = match == null ? 0 : int.parse(match);
      Course course = courseData.values.elementAt(index)[local] as Course;
      return CourseScreen(
        course: course,
        courseIndex: index,
      );
    },
  ),
  Path(
    r'^/food/([\w-]+)$',
    (
      context,
      match,
    ) {
      var local = Preferencess.getLocalSync() ?? "en";
      if (match == null) return NotFound();
      var index = match == null ? 0 : int.parse(match);
      Food food = foodData.values.elementAt(index)[local] as Food;
      return FoodScreen(food: food);
    },
  ),
  Path(
    r'^\/image\?url=([^#]+)',
    (
      context,
      match,
    ) {
      if (match == null) return NotFound();
      return ImageScreen(image: match);
    },
  ),
];

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  for (Path path in paths) {
    final regExpPattern = RegExp(path.pattern);
    if (regExpPattern.hasMatch(routeSettings.name!)) {
      final firstMatch = regExpPattern.firstMatch(routeSettings.name!);
      final match = (firstMatch!.groupCount == 1) ? firstMatch.group(1) : null;
      return MaterialPageRoute<void>(
        builder: (context) => path.builder(context, match ?? ""),
        settings: routeSettings,
      );
    }
  }

  return MaterialPageRoute(
      settings: routeSettings, builder: (_) => HomeScreen());

  // const Scaffold(
  //       body: SafeArea(
  //           child: Center(
  //         child: TitleText(text: '404! Page not found'),
  //       )),
  //     ));

  // switch (routeSettings.name) {
  //   case HomeScreen.routeName:
  //     return MaterialPageRoute(
  //         settings: routeSettings, builder: (_) => HomeScreen());
  //   case CourseScreen.routeName:
  //     Course course = routeSettings.arguments as Course;
  //     return MaterialPageRoute(
  //         settings: routeSettings,
  //         builder: (_) => CourseScreen(
  //               course: course,
  //             ));
  //   case ImageScreen.routeName:
  //     String image = routeSettings.arguments as String;
  //     return MaterialPageRoute(
  //         settings: routeSettings, builder: (_) => ImageScreen(image: image));
  //   case FoodScreen.routeName:
  //     Food food = routeSettings.arguments as Food;
  //     return MaterialPageRoute(
  //         settings: routeSettings,
  //         builder: (_) => FoodScreen(
  //               food: food,
  //             ));
  //   default:
  //     return MaterialPageRoute(
  //         settings: routeSettings,
  //         builder: (_) => const Center(child: Text('Error: Page Not Found')));
  // }
}
