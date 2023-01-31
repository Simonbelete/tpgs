import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/layed_place_form/layed_place_form.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';
import 'package:ilri_pfm/models/layed_place.dart';

class LayedPlaceFormScreen extends StatelessWidget {
  static const String routeName = '/layed-place-form';
  final LayedPlace? layedPlace;

  const LayedPlaceFormScreen({super.key, this.layedPlace});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            CustomAppBar(
              title: layedPlace == null
                  ? 'Create new Lay Place'
                  : 'Lay Place - ${layedPlace?.name}',
            ),
            const SizedBox(
              height: 25,
            ),
            Container(
              width: size.width * 0.9,
              child: LayedPlaceForm(
                layedPlace: layedPlace,
              ),
            )
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }
}
