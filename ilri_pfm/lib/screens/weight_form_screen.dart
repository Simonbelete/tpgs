import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/features/weight_form/weight_form.dart';
import 'package:ilri_pfm/models/weight_model.dart';

class WeightFormScreen extends StatelessWidget {
  static const String routeName = '/chicken-weight-form';
  final Weight? weight;

  const WeightFormScreen({super.key, this.weight});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: weight == null ? 'Create new Weight Record' : 'Weight',
            ),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: WeightForm(
                weight: weight,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
