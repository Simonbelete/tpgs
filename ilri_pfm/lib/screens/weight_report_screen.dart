import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/weight_barchart/weight_barchart.dart';
import 'package:ilri_pfm/features/weight_list/weight_list.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/screens/weight_form_screen.dart';

class WeightReportScreen extends StatelessWidget {
  static const String routeName = '/weight-report';
  final int id;

  const WeightReportScreen({super.key, required this.id});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: 'Weight Report',
            ),
            const SizedBox(
              height: 25,
            ),
            WeightBarchart()
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
