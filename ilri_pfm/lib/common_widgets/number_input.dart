import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';

class NumberInput extends StatelessWidget {
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final String? hintText;

  const NumberInput(
      {super.key, this.controller, this.validator, this.hintText});

  @override
  Widget build(BuildContext context) {
    return FormTextBox(
      textInputType: TextInputType.number,
      controller: controller,
      hintText: hintText,
      validator: validator,
    );
  }
}
