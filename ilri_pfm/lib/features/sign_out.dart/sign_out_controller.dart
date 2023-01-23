import 'package:flutter/material.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

mixin $SignOut on StatelessWidget {
  final AuthenticationRepository _repository = AuthenticationRepository();

  void singOut() {
    _repository.signOut();
  }
}
