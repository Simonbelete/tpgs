import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/egg_production_form/egg_production_form.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/egg.dart';

class EggProductionFormScreen extends StatelessWidget {
  static const String routeName = '/egg-production-form';
  final Egg? egg;

  const EggProductionFormScreen({super.key, this.egg});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: egg == null ? 'Create new Egg Production' : 'Egg -',
            ),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: EggProductionForm(
                egg: egg,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
