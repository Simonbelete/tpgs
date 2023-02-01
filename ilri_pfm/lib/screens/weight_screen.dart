import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/weight_list/weight_list.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/screens/farm_form_screen.dart';

class WeightScreen extends StatelessWidget {
  static const String routeName = '/chicken-weight';
  final Chicken chicken;

  const WeightScreen({super.key, required this.chicken});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: '${chicken.tag} - Weight Records',
            ),
            const SizedBox(
              height: 25,
            ),
            WeightList(
              chicken: chicken,
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, FarmFormScreen.routeName);
        },
        backgroundColor: kPrimaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
