import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/screens/report_weight_screen.dart';

class ReportsScreen extends StatelessWidget {
  static const String routeName = '/reports';

  const ReportsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            const CustomAppBar(
              title: 'Reports',
            ),
            const SizedBox(
              height: 25,
            ),
            ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, ReportWeightScreen.routeName);
                },
                child: Text('Weight Report'))
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
