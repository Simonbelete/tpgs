import 'package:flutter/material.dart';
import './sign_in_form_controller.dart';

class SignInForm extends StatelessWidget with $SignInFormController {
  SignInForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        child: TextFormField(
      controller: emailController,
    ));
  }
}
