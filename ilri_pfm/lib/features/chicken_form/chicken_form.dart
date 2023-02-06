import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/features/dropdown_searches/breed_type_dropdown_search.dart';
import 'package:ilri_pfm/features/dropdown_searches/chicken_stage_dropdown_search.dart';
import 'package:ilri_pfm/features/dropdown_searches/farm_dropdown_search.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/chicken_repository.dart';
import 'package:ilri_pfm/screens/chicken_screen.dart';

class ChickenForm extends StatefulWidget {
  final Chicken? chicken;

  const ChickenForm({super.key, required this.chicken});

  @override
  State<ChickenForm> createState() => _ChickenFormState();
}

class _ChickenFormState extends State<ChickenForm> {
  final ChickenRepository _repository = ChickenRepository();
  final _formKey = GlobalKey<FormState>();
  String _sex = 'M';
  ChickenStage? _chickenStage = null;
  BreedType? _breedType = null;
  Farm? _farm = null;
  TextEditingController _tagController = TextEditingController();
  TextEditingController _houseNoController = TextEditingController();
  TextEditingController _penNoController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return ContainerCard(
        child: Form(
      key: _formKey,
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
            controller: _penNoController,
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
          FarmDropdownSearch(
              hintText: 'Farm Location',
              labelText: 'Enter Farm Location',
              title: 'Farm Location',
              onChange: (data) {
                setState(() {
                  _farm = data;
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
                  onPressed: () {
                    if (widget.chicken == null)
                      create();
                    else
                      patch();
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    ));
  }

  void create() async {
    if (_formKey.currentState!.validate()) {
      try {
        final Chicken? result = await _repository.create(Chicken(
            tag: _tagController.text,
            sex: _sex,
            house_no: _houseNoController.text,
            pen_no: _penNoController.text,
            breed_type: _breedType,
            farm: _farm));
        _responseMessage(result);
      } catch (e) {
        _errorMessage();
      }
    }
  }

  void patch() async {}

  // void patch() async {
  //   if (_formKey.currentState!.validate()) {
  //     Map<String, dynamic> patchData = {};

  //     if (_nameController.text != widget.breedType?.name) {
  //       patchData['name'] = _nameController.text;
  //     }
  //     if (_isActive != widget.breedType?.is_active) {
  //       patchData['is_active'] = _isActive;
  //     }

  //     if (patchData.isEmpty != true) {
  //       try {
  //         final BreedType? farm = await _repository.patch(
  //             id: widget.breedType?.id ?? 0, data: patchData);
  //         _responseMessage(farm);
  //       } catch (e) {
  //         _errorMessage();
  //       }
  //     } else {
  //       Navigator.popAndPushNamed(context, ChickenScreen.routeName);
  //     }
  //   }
  // }

  void _responseMessage(Chicken? farm) {
    if (farm != null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kPrimaryColor,
        content: Text('Operation Successfully Completed'),
      ));
      Navigator.popAndPushNamed(context, ChickenScreen.routeName);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kSecondaryColor,
        content: Text('Unknown Error occurred Please try again!'),
      ));
    }
  }

  void _errorMessage() {
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
      backgroundColor: kSecondaryColor,
      content: Text('Error occurred Please try again!'),
    ));
  }
}
