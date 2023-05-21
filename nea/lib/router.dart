import 'package:flutter/material.dart';
import 'package:nea/screens/home_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case HomeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => HomeScreen());

    default:
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => Center(child: Text('Error: Page Not Found')));
  }
}
