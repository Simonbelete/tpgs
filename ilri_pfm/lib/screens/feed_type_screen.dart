import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/farm_list/farm_list.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/screens/farm_form_screen.dart';

class FeedTypeScreen extends StatelessWidget {
  static const String routeName = '/feed-type';

  const FeedTypeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: const [
            CustomAppBar(
              title: 'Farms',
            ),
            SizedBox(
              height: 25,
            ),
            FarmList(),
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.popAndPushNamed(context, FarmFormScreen.routeName);
        },
        backgroundColor: kPrimaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
