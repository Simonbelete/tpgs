import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/egg_form/egg_form.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/egg.dart';

class EggFormScreen extends StatelessWidget {
  static const String routeName = '/chicken-form';
  final Egg egg;

  const EggFormScreen({super.key, required this.egg});

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
              child: EggForm(
                egg: egg,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
