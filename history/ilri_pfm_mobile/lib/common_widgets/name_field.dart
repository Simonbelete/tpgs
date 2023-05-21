import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';

class NameField extends StatelessWidget {
  final TextEditingController? controller;

  const NameField({super.key, this.controller});

  @override
  Widget build(BuildContext context) {
    return FormTextBox(
      controller: controller,
      hintText: 'Name',
    );
  }
}
