import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/egg_production_list/egg_production_list.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/weight_list/weight_list.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/screens/weight_form_screen.dart';

class EggProductionScreen extends StatelessWidget {
  static const String routeName = '/egg-production';
  final Chicken chicken;

  const EggProductionScreen({super.key, required this.chicken});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: '${chicken.tag} - Egg Production',
            ),
            const SizedBox(
              height: 25,
            ),
            EggProductionList(
              chicken: chicken,
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, WeightFormScreen.routeName);
        },
        backgroundColor: kPrimaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
