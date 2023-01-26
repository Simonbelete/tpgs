import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/name_field.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
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
    Size size = MediaQuery.of(context).size;

    return Column(
      children: [
        _buildForm(size),
        const SizedBox(
          height: 40,
        ),
        SignInWithGoogleForm()
      ],
    );
  }

  Widget _buildForm(Size size) {
    return Form(
      key: widget.formKey,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const HeaderText(
          text: 'Create Account',
          fontWeight: FontWeight.normal,
        ),
        const SizedBox(
          height: 10,
        ),
        const SubTitleText(
            text: 'Enter your Name, Email and Password \nfor sign up.'),
        const SizedBox(
          height: 40,
        ),
        Visibility(
            visible: widget.displayErrorMessage,
            child: Container(
              child: Text('Error Login'),
            )),
        _nameField(),
        const SizedBox(
          height: 25,
        ),
        _emailField(),
        const SizedBox(
          height: 25,
        ),
        _passwordField(),
        const SizedBox(
          height: 25,
        ),
        Container(
          alignment: Alignment.centerRight,
          child: SubTitleText(text: 'Forget Password?'),
        ),
        const SizedBox(
          height: 12,
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
                  'Sing Up',
                ),
                onPressed: () {},
              ),
            ),
          ),
        ),
        // Button(
        //   child: Text('Sign up'),
        //   onPressed: () => widget.onSignUp(context),
        // )
      ]),
    );
  }

  Widget _nameField() {
    return NameField(
      controller: widget.nameController,
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
