import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class UsersScreen extends StatelessWidget {
  static const String routeName = '/users';

  const UsersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      drawer: NavigationDrawer(),
    );
  }
}
