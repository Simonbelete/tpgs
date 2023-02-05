import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/features/dropdown_searches/breed_type_dropdown_search.dart';
import 'package:ilri_pfm/features/dropdown_searches/chicken_stage_dropdown_search.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';

class ChickenForm extends StatefulWidget {
  final Chicken? chicken;

  const ChickenForm({super.key, required this.chicken});

  @override
  State<ChickenForm> createState() => _ChickenFormState();
}

class _ChickenFormState extends State<ChickenForm> {
  String _sex = 'M';
  ChickenStage? _chickenStage = null;
  BreedType? _breedType = null;
  TextEditingController _tagController = TextEditingController();
  TextEditingController _houseNoController = TextEditingController();
  TextEditingController _penNoController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return ContainerCard(
        child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        FormTextBox(
            controller: _tagController,
            hintText: 'Tag',
            initialValue: widget.chicken?.tag),
        const SizedBox(
          height: 10,
        ),
        Container(
          width: size.width,
          child: DropdownButton<String>(
              isExpanded: true,
              value: _sex,
              icon: const Icon(Icons.expand_more),
              elevation: 16,
              style: const TextStyle(color: kTextColor),
              items: const [
                DropdownMenuItem(
                  value: 'M',
                  child: Text('Male'),
                ),
                DropdownMenuItem(
                  value: 'F',
                  child: Text('Female'),
                )
              ],
              onChanged: (String? value) {
                setState(() {
                  _sex = value ?? '';
                });
              }),
        ),
        const SizedBox(
          height: 10,
        ),
        FormTextBox(
          controller: _houseNoController,
          hintText: 'House No',
        ),
        const SizedBox(
          height: 20,
        ),
        FormTextBox(
          controller: _houseNoController,
          hintText: 'Pen No',
        ),
        const SizedBox(
          height: 20,
        ),
        ChickenStageDropdownSearch(
            hintText: 'Chicken Stage',
            labelText: 'Enter Stage',
            title: 'Chicken Stage',
            onChange: (data) {
              setState(() {
                _chickenStage = data;
              });
            }),
        const SizedBox(
          height: 20,
        ),
        BreedTypeDropdownSearch(
            hintText: 'Breed type',
            labelText: 'Enter Breed type',
            title: 'Breed Type',
            onChange: (data) {
              setState(() {
                _breedType = data;
              });
            }),
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
