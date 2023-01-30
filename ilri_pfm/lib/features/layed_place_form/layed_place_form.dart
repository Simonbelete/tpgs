import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/models/layed_place.dart';

class LayedPlaceForm extends StatefulWidget {
  final LayedPlace? layedPlace;

  const LayedPlaceForm({super.key, this.layedPlace});

  @override
  State<LayedPlaceForm> createState() => _LayedPlaceFormState();
}

class _LayedPlaceFormState extends State<LayedPlaceForm> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return ContainerCard(
        child: Column(
      children: [
        FormTextBox(hintText: 'Name', initialValue: widget.layedPlace?.name),
        const SizedBox(
          height: 10,
        ),
        CustomSwitch(text: 'Active', onChanged: (bool value) {}),
        const SizedBox(
          height: 20,
        ),
        Container(
          width: size.width,
          child: Center(
            child: SizedBox(
              width: size.width * 0.8,
              child: Button(
                backgroundColor: kPrimaryColor,
                color: Colors.white,
                child: const Text(
                  'Save',
                ),
                onPressed: () {
                  if (widget.layedPlace == null)
                    create();
                  else
                    patch();
                },
              ),
            ),
          ),
        ),
      ],
    ));
  }

  void create() {}

  void patch() {}
}
