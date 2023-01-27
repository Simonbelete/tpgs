import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
      statusBarColor: Colors.white,
    ));
    return Scaffold(
        appBar: AppBar(),
        body: Column(children: []),
        drawer: NavigationDrawer());
  }
}
