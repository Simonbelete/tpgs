import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';

class EmailField extends StatelessWidget {
  final TextEditingController? controller;
  final String? Function(String?)? validator;

  const EmailField({super.key, this.controller, this.validator});

  @override
  Widget build(BuildContext context) {
    return FormTextBox(
      controller: controller,
      hintText: 'Email',
      validator: validator,
    );
  }
}
