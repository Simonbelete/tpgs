import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class SettingScreen extends StatelessWidget {
  static const String routeName = '/setting';
  const SettingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          child: SingleChildScrollView(
            child: Column(children: const [
              CustomAppBar(
                title: 'Settings',
              ),
              SizedBox(
                height: 25,
              ),
            ]),
          ),
        ),
        drawer: const NavigationDrawer());
  }
}
