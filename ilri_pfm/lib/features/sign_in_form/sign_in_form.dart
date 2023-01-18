import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/sign_in_with_google_button.dart';
import './sign_in_form_controller.dart';

class SignInForm extends StatelessWidget with $SignInFormController {
  SignInForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [
        SignInWithGoogleButton(
          onPressed: signInWithGoogleSubmit,
        )
      ],
    ));
  }
}
