import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class FormTextBox extends StatelessWidget {
  final TextEditingController? controller;
  final String? hintText;
  final String Function(String?)? validator;

  const FormTextBox(
      {super.key, this.controller, this.hintText, this.validator});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      validator: validator,
      decoration: InputDecoration(
        border: const OutlineInputBorder(
            borderSide: BorderSide(color: ColorSet.iPrimaryColor)),
        hintText: hintText,
        contentPadding: const EdgeInsets.all(8),
      ),
    );
  }
}
