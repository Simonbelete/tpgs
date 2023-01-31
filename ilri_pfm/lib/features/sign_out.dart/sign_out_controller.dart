import 'package:flutter/material.dart';
import 'package:ilri_pfm/main_dev.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

mixin $SignOut on StatelessWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();

  void singOut(BuildContext context) {
    _repository.signOut();
    Navigator.popAndPushNamed(context, App.routeName);
  }
}
