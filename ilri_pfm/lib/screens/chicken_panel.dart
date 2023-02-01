import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/chicken_form/chicken_form.dart';
import 'package:ilri_pfm/features/chicken_panel/chicken_panel.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/chicken.dart';

class ChickenPanelScreen extends StatelessWidget {
  static const String routeName = '/chicken-panel';
  final Chicken chicken;

  const ChickenPanelScreen({super.key, required this.chicken});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: chicken.tag,
            ),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: ChickenPanel(
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
