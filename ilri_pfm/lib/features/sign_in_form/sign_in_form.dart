import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/features/have_no_account/have_no_account.dart';
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
    Size size = MediaQuery.of(context).size;
    return Container(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Column(
          children: [
            _buildForm(size),
            const SizedBox(
              height: 15,
            ),
            const SubTitleText(text: 'Or Login with'),
            const SizedBox(
              height: 15,
            ),
            SignInWithGoogleForm(),
            const SizedBox(
              height: 20,
            ),
            SizedBox(width: size.width, child: const HaveNoAccount())
          ],
        ));
  }

  Widget _buildForm(Size size) {
    return Form(
      key: widget.formKey,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const HeaderText(
          text: 'Welcome',
          fontWeight: FontWeight.normal,
        ),
        const SizedBox(
          height: 10,
        ),
        const SubTitleText(text: 'Enter your Email address to sing in.'),
        const SizedBox(
          height: 10,
        ),
        const HaveNoAccount(),
        const SizedBox(
          height: 30,
        ),
        _emailField(),
        const SizedBox(
          height: 20,
        ),
        _passwordField(),
        const SizedBox(
          height: 20,
        ),
        Container(
          width: size.width,
          child: Center(
            child: SizedBox(
              width: size.width * 0.8,
              child: Button(
                backgroundColor: kPrimaryColor,
                color: Colors.white,
                child: const Text(
                  'Sign in',
                ),
                onPressed: () {
                  widget.onSignIn();
                },
              ),
            ),
          ),
        ),
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
