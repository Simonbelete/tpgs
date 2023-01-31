import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/activate_icon.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/deactivate_icon.dart';
import 'package:ilri_pfm/common_widgets/delete_icon.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/repository/breed_type_repository.dart';
import 'package:ilri_pfm/screens/breed_type_screen.dart';

class BreedTypeForm extends StatefulWidget {
  final BreedType? breedType;

  const BreedTypeForm({super.key, this.breedType});

  @override
  State<BreedTypeForm> createState() => _BreedTypeFormState();
}

class _BreedTypeFormState extends State<BreedTypeForm> {
  final BreedTypeRepository _repository = BreedTypeRepository();
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _nameController = TextEditingController();
  bool _isActive = false;

  @override
  void initState() {
    setState(() {
      _nameController.text = widget.breedType?.name ?? '';
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Column(
      children: [
        ContainerCard(
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
                  hintText: 'Name'),
              const SizedBox(
                height: 10,
              ),
              CustomSwitch(
                  text: 'Active',
                  value: widget.breedType != null
                      ? widget.breedType?.is_active
                      : true,
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
                      child: const Text(
                        'Save',
                      ),
                      onPressed: () {
                        if (widget.breedType == null)
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
        )),
        const SizedBox(
          height: 20,
        ),
        Visibility(
          visible: widget.breedType != null ? true : false,
          child: ContainerCard(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              widget.breedType?.is_active == true
                  ? DeactivateIcon(
                      onPressed: deActivate,
                    )
                  : ActivateIcon(
                      onPressed: activate,
                    ),
              DeleteIcon(
                onPressed: () {},
              )
            ],
          )),
        )
      ],
    );
  }

  void create() async {
    if (_formKey.currentState!.validate()) {
      try {
        final BreedType? result = await _repository.create(
            BreedType(name: _nameController.text, is_active: _isActive));
        _responseMessage(result);
      } catch (e) {
        _errorMessage();
      }
    }
  }

  void patch() async {
    if (_formKey.currentState!.validate()) {
      Map<String, dynamic> patchData = {};

      if (_nameController.text != widget.breedType?.name) {
        patchData['name'] = _nameController.text;
      }
      if (_isActive != widget.breedType?.is_active) {
        patchData['is_active'] = _isActive;
      }

      if (patchData.isEmpty != true) {
        try {
          final BreedType? farm = await _repository.patch(
              id: widget.breedType?.id ?? 0, data: patchData);
          _responseMessage(farm);
        } catch (e) {
          _errorMessage();
        }
      } else {
        Navigator.popAndPushNamed(context, BreedTypeScreen.routeName);
      }
    }
  }

  void activate() async {
    try {
      final BreedType? result = await _repository.updateState(
          id: widget.breedType?.id ?? 0, state: true);
      _responseMessage(result);
    } catch (e) {
      _errorMessage();
    }
  }

  void deActivate() async {
    try {
      final BreedType? result = await _repository.updateState(
          id: widget.breedType?.id ?? 0, state: false);
      _responseMessage(result);
    } catch (e) {
      _errorMessage();
    }
  }

  void _responseMessage(BreedType? farm) {
    if (farm != null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kPrimaryColor,
        content: Text('Operation Successfully Completed'),
      ));
      Navigator.popAndPushNamed(context, BreedTypeScreen.routeName);
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
