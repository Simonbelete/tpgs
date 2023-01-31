import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/farm_repository.dart';
import 'package:ilri_pfm/screens/farm_screen.dart';

class FarmForm extends StatefulWidget {
  final Farm? farm;

  const FarmForm({super.key, this.farm});

  @override
  State<FarmForm> createState() => _FarmFormState();
}

class _FarmFormState extends State<FarmForm> {
  final FarmRepository _repository = FarmRepository();
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _nameController = TextEditingController();
  bool _isActive = false;

  @override
  void initState() {
    setState(() {
      _nameController.text = widget.farm?.name ?? '';
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return ContainerCard(
        child: Form(
      key: _formKey,
      child: Column(
        children: [
          FormTextBox(
            controller: _nameController,
            validator: (String? value) {
              return value?.isEmpty == true
                  ? 'Please enter a valid data'
                  : null;
            },
            hintText: 'Name',
          ),
          const SizedBox(
            height: 10,
          ),
          CustomSwitch(
              text: 'Active',
              value: widget.farm != null ? widget.farm?.is_active : true,
              onChanged: (bool value) {
                setState(() {
                  _isActive = value;
                });
              }),
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
                  child: Text(
                    widget.farm == null ? 'Create' : 'Save',
                  ),
                  onPressed: () {
                    if (widget.farm == null) {
                      create();
                    } else {
                      patch();
                    }
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
        final Farm? farm = await _repository
            .create(Farm(name: _nameController.text, is_active: _isActive));
        if (farm != null) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
            backgroundColor: kPrimaryColor,
            content: Text('Successfully created farm!'),
          ));
          Navigator.popAndPushNamed(context, FarmScreen.routeName);
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          backgroundColor: kSecondaryColor,
          content: Text('Error occurred Please try again!'),
        ));
      }
    }
  }

  void patch() async {
    if (_formKey.currentState!.validate()) {
      Map<String, dynamic> patchData = {};

      if (_nameController.text != widget.farm?.name) {
        patchData['name'] = _nameController.text;
      }
      if (_isActive != widget.farm?.is_active) {
        patchData['is_active'] = _isActive;
      }

      if (patchData.isEmpty != true) {
        try {
          final Farm? farm = await _repository.patch(
              id: widget.farm?.id ?? 0, data: patchData);
          if (farm != null) {
            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
              backgroundColor: kPrimaryColor,
              content: Text('Successfully Updated farm!'),
            ));
            Navigator.popAndPushNamed(context, FarmScreen.routeName);
          }
        } catch (e) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
            backgroundColor: kSecondaryColor,
            content: Text('Error occurred Please try again!'),
          ));
        }
      } else {
        Navigator.popAndPushNamed(context, FarmScreen.routeName);
      }
    }
  }
}
