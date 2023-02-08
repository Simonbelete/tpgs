import 'package:flutter/material.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

mixin $SignInWithGoogleFormController on StatelessWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();
  final TextEditingController emailController = TextEditingController();

  void signInWithGoogleSubmit() {
    _repository.signInWithGoogle();
  }
}
