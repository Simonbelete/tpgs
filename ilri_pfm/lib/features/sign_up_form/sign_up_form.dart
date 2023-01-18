import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';

class SignUpForm extends StatelessWidget {
  const SignUpForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Center(
          child: Text('Sign Up Form'),
        ),
        SignInWithGoogleForm()
      ],
    );
  }
}
