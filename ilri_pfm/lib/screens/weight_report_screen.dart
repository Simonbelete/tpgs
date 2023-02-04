import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/weight_linechart/weight_linechart.dart';

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
            const CustomAppBar(
              title: 'Weight Report',
            ),
            const SizedBox(
              height: 25,
            ),
            WeightLinechart(
              chickenId: id,
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
