import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/breed_type_list/breed_type_list.dart';
import 'package:ilri_pfm/features/egg_list/egg_list.dart';
import 'package:ilri_pfm/features/layed_place_list/layed_place_list.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class EggScreen extends StatelessWidget {
  static const String routeName = '/egg';

  const EggScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: const [
            CustomAppBar(
              title: 'Breed Type',
            ),
            SizedBox(
              height: 25,
            ),
            EggList(),
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
      floatingActionButton: FloatingActionButton.small(
        onPressed: () {},
        backgroundColor: kPrimaryColor,
        child: Icon(Icons.add),
      ),
    );
  }
}
