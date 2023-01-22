import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

import './sign_in_form_controller.dart';

class SignInForm extends StatefulWidget with $SignInFormController {
  SignInForm({super.key});

  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {
  @override
  void dispose() {
    widget.disposeForms();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Column(
          children: [
            _buildForm(),
            TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, RegisterScreen.routeName);
                },
                child: const Text('Already have account Sign up ')),
            SignInWithGoogleForm()
          ],
        ));
  }

  Widget _buildForm() {
    return Form(
      key: widget.formKey,
      child: Column(children: [
        _emailField(),
        const SizedBox(
          height: 20,
        ),
        _passwordField(),
        const SizedBox(
          height: 20,
        ),
        Button(onPressed: () => widget.onSignIn(), child: Text('Sign in'))
      ]),
    );
  }

  Widget _emailField() {
    return EmailField(
      controller: widget.emailController,
    );
  }

  Widget _passwordField() {
    return PasswordField(
      controller: widget.passwordController,
    );
  }
}
