import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/user_form/user_form.dart';
import 'package:ilri_pfm/models/user_model.dart';

class UsersFormScreen extends StatelessWidget {
  static const String routeName = '/users-form';
  final UserModel user;

  const UsersFormScreen({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            const CustomAppBar(),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: UserForm(user: user),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
