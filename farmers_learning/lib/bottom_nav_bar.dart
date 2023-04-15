import 'package:flutter/material.dart';
import 'package:ilri/feature/course/course_screen.dart';
import 'package:ilri/feature/home/components/body.dart';
import 'package:ilri/feature/home/home_screen.dart';
import 'package:ilri/utils/color.dart';
import 'package:ilri/widgets/drawer_menus.dart';
import 'package:ilri/feature/search/search_screen.dart';

class BottomNavBar extends StatefulWidget {
  const BottomNavBar({super.key});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  int pageIndex = 0;
  List<Widget> pages = [HomeScreen(), CourseScreen()];
  List navItems = [
    Image.asset('assets/icons/home_icon.png'),
    Image.asset('assets/icons/course_icon.png'),
    Image.asset('assets/icons/heart_icon.png'),
    Image.asset('assets/icons/quiz_icon.png'),
  ];

  Widget buildNav(BuildContext context) {
    return Container(
      height: 45,
      decoration: BoxDecoration(color: Colors.white),
      padding: const EdgeInsets.symmetric(horizontal: 30.0),
      child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: navItems
              .asMap()
              .entries
              .map((e) => IconButton(
                    enableFeedback: false,
                    onPressed: () {
                      setState(() {
                        print(e.key);
                        pageIndex = e.key;
                      });
                    },
                    icon: navItems[e.key],
                    iconSize: 28,
                    color: pageIndex == e.key
                        ? primaryColor
                        : primaryColor.withOpacity(0.6),
                  ))
              .toList()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          iconTheme: IconThemeData(color: primaryColor),
          elevation: 0,
          title: Image.asset(
            'assets/images/logo.png',
            width: 30,
            height: 30,
          ),
          actions: [
            Padding(
                padding: const EdgeInsets.only(right: 10),
                child: IconButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => SearchScreen()));
                  },
                  icon: const Icon(
                    Icons.search,
                    color: primaryColor,
                    size: 27,
                  ),
                ))
          ],
        ),
        body: SafeArea(child: pages[pageIndex]),
        drawer: DrawerMenu(),
        bottomNavigationBar: buildNav(context));
  }
}
