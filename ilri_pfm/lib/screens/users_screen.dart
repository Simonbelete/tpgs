import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/users_list/users_list.dart';

class UsersScreen extends StatelessWidget {
  static const String routeName = '/users';

  const UsersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: const [
            CustomAppBar(),
            SizedBox(
              height: 25,
            ),
            UsersList(),
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
    // return Scaffold(
    //     body: SafeArea(
    //       child: SingleChildScrollView(
    //         child: Column(children: const [
    //           CustomAppBar(
    //             title: 'Users',
    //           ),
    //           SizedBox(
    //             height: 25,
    //           ),
    //           UsersList()
    //         ]),
    //       ),
    //     ),
    //     drawer: const NavigationDrawer());
  }
}
