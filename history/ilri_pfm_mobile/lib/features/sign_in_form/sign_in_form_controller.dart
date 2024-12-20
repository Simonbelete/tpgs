import 'package:flutter/material.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

mixin $SignInFormController on StatefulWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final GlobalKey formKey = GlobalKey<FormState>();

  void onSignIn() {
    _repository.signInWithEmailAndPassword(
        email: emailController.text, password: passwordController.text);
  }

  void disposeForms() {
    emailController.dispose();
    passwordController.dispose();
  }
}
