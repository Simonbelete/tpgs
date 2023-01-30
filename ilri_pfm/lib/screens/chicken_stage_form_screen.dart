import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/chicken_stage_form/chicken_stage_form.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';

class ChickenStageFormScreen extends StatelessWidget {
  static const String routeName = '/chicken-stage-form';
  final ChickenStage chickenStage;

  const ChickenStageFormScreen({super.key, required this.chickenStage});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            const CustomAppBar(),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: ChickenStageForm(
                chickenStage: chickenStage,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
