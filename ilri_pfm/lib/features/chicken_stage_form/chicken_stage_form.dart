import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/models/farm_model.dart';

class ChickenStageForm extends StatefulWidget {
  final ChickenStage chickenStage;

  const ChickenStageForm({super.key, required this.chickenStage});

  @override
  State<ChickenStageForm> createState() => _ChickenStageFormState();
}

class _ChickenStageFormState extends State<ChickenStageForm> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return ContainerCard(
        child: Column(
      children: [
        FormTextBox(hintText: 'Name', initialValue: widget.chickenStage.name),
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
                onPressed: () {},
              ),
            ),
          ),
        ),
      ],
    ));
  }
}
