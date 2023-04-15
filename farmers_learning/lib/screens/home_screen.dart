import 'package:flutter/material.dart';
import 'package:ilri/utils/color.dart';
import 'package:ilri/screens/search_screen.dart';
import 'package:ilri/widgets/category_list.dart';
import 'package:ilri/widgets/course_list.dart';
import 'package:ilri/widgets/header_search.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
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
                  Navigator.pushNamed(
                    context,
                    SearchScreen.routeName,
                  );
                },
                icon: const Icon(
                  Icons.search,
                  color: primaryColor,
                  size: 27,
                ),
              ))
        ],
      ),
      body: ListView(
        physics: BouncingScrollPhysics(),
        children: const [
          // HeaderSearch(),
          // SizedBox(
          //   height: 20,
          // ),
          // CategoryList(),
          SizedBox(
            height: 20,
          ),
          CourseList()
        ],
      ),
      // drawer: Drawer(),
    );
  }
}
