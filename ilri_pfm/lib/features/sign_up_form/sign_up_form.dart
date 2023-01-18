import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';

import './sign_up_form_controller.dart';

class SignUpForm extends StatefulWidget with $SignInFormController {
  SignUpForm({super.key});

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Center(
          child: Text('Sign Up Form'),
        ),
        _buildForm(),
        SignInWithGoogleForm()
      ],
    );
  }

  Widget _buildForm() {
    return Form(
      key: widget.formKey,
      child: Column(children: [
        Visibility(
            visible: widget.displayErrorMessage,
            child: Container(
              child: Text('Error Login'),
            )),
        _emailField(),
        _passwordField(),
        Button(
          child: Text('Sign up'),
          onPressed: () => widget.onSignUp(),
        )
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
