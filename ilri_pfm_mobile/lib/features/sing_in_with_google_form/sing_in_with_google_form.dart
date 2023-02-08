import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/sign_in_with_google_button.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form_controller.dart';

class SignInWithGoogleForm extends StatelessWidget
    with $SignInWithGoogleFormController {
  SignInWithGoogleForm({super.key});

  @override
  Widget build(BuildContext context) {
    return SignInWithGoogleButton(onPressed: signInWithGoogleSubmit);
  }
}
