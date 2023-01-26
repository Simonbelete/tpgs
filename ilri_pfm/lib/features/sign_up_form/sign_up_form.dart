import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/name_field.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/features/have_account/have_account.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';

import './sign_up_form_controller.dart';

class SignUpForm extends StatelessWidget with $SignUpFormController {
  SignUpForm({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      children: [
        Form(
          key: formKey,
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
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
              height: 10,
            ),
            const HaveAccount(),
            const SizedBox(
              height: 30,
            ),
            Visibility(
                visible: displayErrorMessage,
                child: Container(
                  child: Text('Error Login'),
                )),
            NameField(
              controller: nameController,
            ),
            const SizedBox(
              height: 25,
            ),
            EmailField(
              controller: emailController,
            ),
            const SizedBox(
              height: 25,
            ),
            PasswordField(
              controller: passwordController,
            ),
            const SizedBox(
              height: 25,
            ),
            Container(
              alignment: Alignment.centerRight,
              child: const SubTitleText(text: 'Forget Password?'),
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
        ),
        const SizedBox(
          height: 15,
        ),
        const SubTitleText(text: 'Or Sing up with'),
        const SizedBox(
          height: 15,
        ),
        SignInWithGoogleForm(),
        const SizedBox(
          height: 20,
        ),
        SizedBox(width: size.width, child: const HaveAccount())
      ],
    );
  }
}
