import 'package:flutter/material.dart';
import 'package:ilri_pfm/exceptions/email_exists_exception.dart';
import 'package:ilri_pfm/exceptions/weak_password_exception.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

mixin $SignInFormController on StatefulWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final GlobalKey formKey = GlobalKey<FormState>();

  // Form Feedback
  final String errorMessage = '';
  bool displayErrorMessage = false;

  void onSignUp() {
    print('selected');
    try {
      _repository.createUserWithEmailAndPassword(
          email: emailController.text, password: passwordController.text);
    } on WeakPasswordException {
      displayErrorMessage = true;
    } on EmailExistsException {
      displayErrorMessage = true;
    } catch (e) {
      displayErrorMessage = true;
      print(e.toString());
    }
  }

  void disposeForms() {
    emailController.dispose();
    passwordController.dispose();
  }
}
