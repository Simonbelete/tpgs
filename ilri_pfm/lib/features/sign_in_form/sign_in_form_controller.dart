import 'package:flutter/material.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

mixin $SignInFormController on StatefulWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();

  final TextEditingController emailController = TextEditingController();
  final GlobalKey formKey = GlobalKey<FormState>();

  void onSignIn() {
    print(emailController.text);
  }

  void disposeForms() {
    emailController.dispose();
  }
}
