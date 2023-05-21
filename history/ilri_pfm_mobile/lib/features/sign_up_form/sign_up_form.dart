import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/email_field.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/name_field.dart';
import 'package:ilri_pfm/common_widgets/password_field.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/features/have_account/have_account.dart';
import 'package:ilri_pfm/features/sing_in_with_google_form/sing_in_with_google_form.dart';
import 'package:ilri_pfm/exceptions/email_exists_exception.dart';
import 'package:ilri_pfm/exceptions/weak_password_exception.dart';
import 'package:ilri_pfm/models/device_model.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/repository/messaging_repository.dart';
import 'package:ilri_pfm/screens/activation_screen.dart';

class SignUpForm extends StatefulWidget {
  SignUpForm({super.key});

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final AuthenticationRepository _repository = AuthenticationRepository();
  final MessagingRepository _messagingRepository = MessagingRepository();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  // Form Feedback
  final String errorMessage = '';
  final bool displayErrorMessage = false;

  void onSignUp(BuildContext context) async {
    if (_formKey.currentState!.validate()) {
      try {
        String? deviceToken = await _messagingRepository.getDeviceToken();
        await _repository.createUserWithEmailAndPassword(
            email: emailController.text,
            password: passwordController.text,
            devices: Device(token: deviceToken ?? ''));
        // ignore: use_build_context_synchronously
        Navigator.pushReplacementNamed(context, ActivationScreen.routeName);
      } on WeakPasswordException {
        // displayErrorMessage = true;
      } on EmailExistsException {
        // displayErrorMessage = true;
      } catch (e) {
        // displayErrorMessage = true;
      }
    }
  }

  void disposeForms() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
  }

  @override
  void dispose() {
    disposeForms();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      children: [
        _buildForm(size),
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

  Widget _buildForm(Size size) {
    return Form(
      key: _formKey,
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
                onPressed: () {
                  onSignUp(context);
                },
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
        // controller: widget.nameController,
        );
  }

  Widget _emailField() {
    return EmailField(
      controller: emailController,
    );
  }

  Widget _passwordField() {
    return PasswordField(
      controller: passwordController,
    );
  }
}
