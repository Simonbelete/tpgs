import 'package:flutter/material.dart';
import 'package:ilri_pfm/repository/user_repository.dart';

mixin $AuthorizationController on StatefulWidget {
  final UserRepository _repository = UserRepository();

  void initUser() async {
    await _repository.getByUid();
  }
}
