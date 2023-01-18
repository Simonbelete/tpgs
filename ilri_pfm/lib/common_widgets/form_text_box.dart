import 'package:flutter/material.dart';

class FormTextBox extends StatelessWidget {
  final TextEditingController? controller;

  const FormTextBox({super.key, this.controller});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: const InputDecoration(),
    );
  }
}
