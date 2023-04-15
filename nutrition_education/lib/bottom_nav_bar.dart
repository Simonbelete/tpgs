import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/screens/favorite_screen.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/screens/search_screen.dart';
import 'package:nutrition_education/screens/setting_screen.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';

import 'bloc/local/bloc.dart';
import '../i18n/app.dart';

class NavItem extends StatelessWidget {
  final IconData icon;
  final String text;
  final Color color;
  const NavItem(
      {super.key, required this.icon, required this.text, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      child: Column(children: [
        Icon(
          icon,
          color: color,
        ),
        Text(
          text,
          style: TextStyle(
              fontSize: 10.0, color: color, fontWeight: FontWeight.bold),
        ),
      ]),
    );
  }
}

class BottomNavBar extends StatefulWidget {
  static const routeName = '/bottom_nav_bar';
  final int? index;
  const BottomNavBar({super.key, this.index = 0});

  @override
  State<BottomNavBar> createState() => BottomNavBarState();
}

class BottomNavBarState extends State<BottomNavBar> {
  int pageIndex = 0;
  int _page = 0;
  GlobalKey<CurvedNavigationBarState> _bottomNavigationKey = GlobalKey();

  @override
  void initState() {
    setState(() {
      _page = widget.index ?? 0;
    });
    super.initState();
  }

  List<Widget> pages = [
    HomeScreen(),
    SearchScreen(),
    FavoriteScreen(),
    SettingScreen()
  ];

  List<String> _navList = [
    'assets/icons/home_smoth.png',
    'assets/icons/search-interface-symbol.png',
    'assets/icons/love.png',
    'assets/icons/settings.png'
  ];

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
        overlays: [SystemUiOverlay.bottom, SystemUiOverlay.top]);
    String local = context.read<LocalBloc>().state.local;
    return Scaffold(
      backgroundColor: Colors.white,
      // appBar: _page == 3
      //     ? AppBar(
      //         centerTitle: true,
      //         elevation: 0,
      //         backgroundColor: primaryColor,
      //         title: Text(appLocale['settings']![local]!),
      //       )
      //     : null,
      bottomNavigationBar: CurvedNavigationBar(
        key: _bottomNavigationKey,
        height: 45,
        backgroundColor: primaryColor,
        buttonBackgroundColor: const Color(0xffF5F7FB),
        items: _navList
            .map((e) => Image.asset(
                  e,
                  height: 30,
                ))
            .toList(),
        onTap: (index) {
          setState(() {
            _page = index;
          });
        },
      ),
      body: SafeArea(child: pages[_page]),
    );
  }

  Widget buildNavBar() {
    return Container(
        height: 50,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(10),
              topRight: Radius.circular(10),
              bottomLeft: Radius.circular(10),
              bottomRight: Radius.circular(10)),
          // boxShadow: [
          //   BoxShadow(
          //     color: Colors.grey.withOpacity(0.5),
          //     spreadRadius: 5,
          //     blurRadius: 7,
          //     offset: Offset(0, 3), // changes position of shadow
          //   ),
          // ],
        ),
        padding: const EdgeInsets.only(left: 30.0, right: 30.0, top: 6.0),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              InkWell(
                onTap: () {
                  setState(() {
                    pageIndex = 0;
                  });
                },
                child: NavItem(
                    icon: Icons.home,
                    text: 'Home',
                    color: pageIndex == 0
                        ? primaryColor
                        : primaryColor.withOpacity(0.6)),
              ),
              InkWell(
                onTap: () {
                  setState(() {
                    pageIndex = 1;
                  });
                },
                child: NavItem(
                  icon: Icons.search,
                  text: 'Home',
                  color: pageIndex == 1
                      ? primaryColor
                      : primaryColor.withOpacity(0.6),
                ),
              ),
              InkWell(
                onTap: () {
                  setState(() {
                    pageIndex = 2;
                  });
                },
                child: NavItem(
                    icon: Icons.favorite,
                    text: 'Home',
                    color: pageIndex == 2
                        ? primaryColor
                        : primaryColor.withOpacity(0.6)),
              ),
              InkWell(
                onTap: () {
                  setState(() {
                    pageIndex = 3;
                  });
                },
                child: NavItem(
                  icon: Icons.settings,
                  text: 'Home',
                  color: pageIndex == 3
                      ? primaryColor
                      : primaryColor.withOpacity(0.6),
                ),
              )
            ]));
  }
}

// Row(
//             // mainAxisAlignment: MainAxisAlignment.spaceBetween,
//             children: navItems
//                 .asMap()
//                 .entries
//                 .map((e) => IconButton(
//                       enableFeedback: false,
//                       onPressed: () {
//                         setState(() {
//                           print(e.key);
//                           pageIndex = e.key;
//                         });
//                       },
//                       icon: navItems[e.key],
//                       iconSize: 28,
//                       color: pageIndex == e.key
//                           ? primaryColor
//                           : primaryColor.withOpacity(0.6),
//                     ))
//                 .toList()))
