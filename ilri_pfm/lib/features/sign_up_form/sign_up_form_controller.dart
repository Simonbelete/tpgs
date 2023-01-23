import 'package:flutter/material.dart';
import 'package:ilri_pfm/exceptions/email_exists_exception.dart';
import 'package:ilri_pfm/exceptions/weak_password_exception.dart';
import 'package:ilri_pfm/models/device_model.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/repository/messaging_repository.dart';
import 'package:ilri_pfm/screens/activation_screen.dart';

mixin $SignInFormController on StatefulWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();
  final MessagingRepository _messagingRepository = MessagingRepository();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final GlobalKey formKey = GlobalKey<FormState>();

  // Form Feedback
  final String errorMessage = '';
  bool displayErrorMessage = false;

  void onSignUp(BuildContext context) async {
    try {
      String? deviceToken = await _messagingRepository.getDeviceToken();
      await _repository.createUserWithEmailAndPassword(
          email: emailController.text,
          password: passwordController.text,
          devices: Device(token: deviceToken ?? ''));
      // ignore: use_build_context_synchronously
      Navigator.pushReplacementNamed(context, ActivationScreen.routeName);
    } on WeakPasswordException {
      displayErrorMessage = true;
    } on EmailExistsException {
      displayErrorMessage = true;
    } catch (e) {
      displayErrorMessage = true;
    }
  }

  void disposeForms() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
  }
}
