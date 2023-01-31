import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/features/have_no_account/have_no_account.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/screens/home_screen.dart';
import 'package:email_validator/email_validator.dart';

class SignInForm extends StatefulWidget {
  SignInForm({super.key});

  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {
  final AuthenticationRepository _repository = AuthenticationRepository();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  void onSignIn() {
    if (_formKey.currentState!.validate()) {
      try {
        _repository.signInWithEmailAndPassword(
            email: emailController.text, password: passwordController.text);
        Navigator.popAndPushNamed(context, HomeScreen.routeName);
      } catch (e) {}
    }
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
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
      key: _formKey,
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
        EmailField(
          controller: emailController,
          validator: (String? value) {
            return EmailValidator.validate(value ?? '')
                ? null
                : 'Please enter a valid Email Address';
          },
        ),
        const SizedBox(
          height: 20,
        ),
        PasswordField(
          controller: passwordController,
        ),
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
                  onSignIn();
                },
              ),
            ),
          ),
        ),
      ]),
    );
  }
}
