import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/breed_type_pie_chart/breed_type_pie_chart.dart';
import 'package:ilri_pfm/features/farm_selection_modal/farm_selection_modal.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/welcome_text/welcome_text.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          child: SingleChildScrollView(
            child: Column(children: [
              const CustomAppBar(
                title: 'Dashboard',
              ),
              const SizedBox(
                height: 25,
              ),
              const WelcomeText(),
              const SizedBox(
                height: 10,
              ),
              BreedTypePieChart(),
            ]),
          ),
        ),
        drawer: const NavigationDrawer());
  }
}
