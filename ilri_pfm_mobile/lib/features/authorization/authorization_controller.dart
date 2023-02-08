import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/blocs/user/events.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/repository/user_repository.dart';

mixin $AuthorizationController on StatefulWidget {
  final UserRepository _repository = UserRepository();

  void initUser(BuildContext context) async {
    UserModel? user = await _repository.getByUid();
    print(user?.toJson());
    if (user != null) {
      context.read<UserBloc>().add(UserInit(user));
    }
  }
}
