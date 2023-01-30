import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/chicken_list/chicken_list.dart';
import 'package:ilri_pfm/features/chicken_stage_list/chicken_stage_list.dart';
import 'package:ilri_pfm/features/farm_list/farm_list.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class ChickenScreen extends StatelessWidget {
  static const String routeName = '/chicken';

  const ChickenScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: const [
            CustomAppBar(
              title: 'Chicken Stage',
            ),
            SizedBox(
              height: 25,
            ),
            ChickenList()
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: kPrimaryColor,
        child: Icon(Icons.add),
      ),
    );
  }
}
