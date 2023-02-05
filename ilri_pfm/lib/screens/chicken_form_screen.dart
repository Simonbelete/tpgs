import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/chicken_form/chicken_form.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/chicken.dart';

class ChickenFormScreen extends StatelessWidget {
  static const String routeName = '/chicken-form';
  final Chicken? chicken;

  const ChickenFormScreen({super.key, required this.chicken});

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
              child: ChickenForm(
                chicken: chicken,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
