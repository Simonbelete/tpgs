import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';

import './sign_in_form_controller.dart';

class SignInForm extends StatelessWidget with $SignInFormController {
  SignInForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [SignInWithGoogleForm()],
    ));
  }
}
