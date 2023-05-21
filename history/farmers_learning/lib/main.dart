import 'package:flutter/material.dart';
import 'package:ilri/router.dart';
import 'package:ilri/utils/color.dart';
import 'package:ilri/bottom_nav_bar.dart';
import 'package:ilri/screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'የአርሶ አደሮች መመሪያ ፡ ሰርዓተ ምግብን ማሻሻል',
        theme: ThemeData(
          primaryColor: primaryColor,
          appBarTheme: const AppBarTheme(backgroundColor: secodaryColor),
          scaffoldBackgroundColor: secodaryColor,
        ),
        onGenerateRoute: (settings) => generateRoute(settings),
        home: HomeScreen());
  }
}
