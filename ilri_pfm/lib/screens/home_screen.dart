import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        body: Column(children: []),
        drawer: NavigationDrawer());
  }
}
