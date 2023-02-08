import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/breed_type_form/breed_type_form.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/breed_type.dart';

class BreedTypeFormScreen extends StatelessWidget {
  static const String routeName = '/breed-type-form';
  final BreedType? breedType;

  const BreedTypeFormScreen({super.key, this.breedType});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: breedType == null
                  ? 'Create new Lay Place'
                  : 'Lay Place - ${breedType?.name}',
            ),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: BreedTypeForm(
                breedType: breedType,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
