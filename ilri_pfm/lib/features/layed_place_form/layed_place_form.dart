import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/activate_icon.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/deactivate_icon.dart';
import 'package:ilri_pfm/common_widgets/delete_icon.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/models/layed_place.dart';
import 'package:ilri_pfm/repository/layed_place_repository.dart';
import 'package:ilri_pfm/screens/layed_place_screen.dart';

class LayedPlaceForm extends StatefulWidget {
  final LayedPlace? layedPlace;

  const LayedPlaceForm({super.key, this.layedPlace});

  @override
  State<LayedPlaceForm> createState() => _LayedPlaceFormState();
}

class _LayedPlaceFormState extends State<LayedPlaceForm> {
  final LayedPlaceRepository _repository = LayedPlaceRepository();
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _nameController = TextEditingController();
  bool _isActive = false;

  @override
  void initState() {
    setState(() {
      _nameController.text = widget.layedPlace?.name ?? '';
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
                  value: widget.layedPlace != null
                      ? widget.layedPlace?.is_active
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
          ),
        )),
        const SizedBox(
          height: 20,
        ),
        Visibility(
          visible: widget.layedPlace != null ? true : false,
          child: ContainerCard(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              widget.layedPlace?.is_active == true
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
        final LayedPlace? farm = await _repository.create(
            LayedPlace(name: _nameController.text, is_active: _isActive));
        _responseMessage(farm);
      } catch (e) {
        _errorMessage();
      }
    }
  }

  void patch() async {
    if (_formKey.currentState!.validate()) {
      Map<String, dynamic> patchData = {};

      if (_nameController.text != widget.layedPlace?.name) {
        patchData['name'] = _nameController.text;
      }
      if (_isActive != widget.layedPlace?.is_active) {
        patchData['is_active'] = _isActive;
      }

      if (patchData.isEmpty != true) {
        try {
          final LayedPlace? farm = await _repository.patch(
              id: widget.layedPlace?.id ?? 0, data: patchData);
          _responseMessage(farm);
        } catch (e) {
          _errorMessage();
        }
      } else {
        Navigator.popAndPushNamed(context, LayedPlaceScreen.routeName);
      }
    }
  }

  void activate() async {
    try {
      final LayedPlace? result = await _repository.updateState(
          id: widget.layedPlace?.id ?? 0, state: true);
      _responseMessage(result);
    } catch (e) {
      _errorMessage();
    }
  }

  void deActivate() async {
    try {
      final LayedPlace? result = await _repository.updateState(
          id: widget.layedPlace?.id ?? 0, state: false);
      _responseMessage(result);
    } catch (e) {
      _errorMessage();
    }
  }

  void _responseMessage(LayedPlace? farm) {
    if (farm != null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kPrimaryColor,
        content: Text('Operation Successfully Completed'),
      ));
      Navigator.popAndPushNamed(context, LayedPlaceScreen.routeName);
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
