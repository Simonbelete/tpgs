import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/export_data/export_data.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class ExportScreen extends StatelessWidget {
  static const String routeName = '/export';

  const ExportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: const [
            CustomAppBar(
              title: 'Export Data',
            ),
            SizedBox(
              height: 25,
            ),
            ExportData()
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
