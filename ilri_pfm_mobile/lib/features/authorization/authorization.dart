import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/blocs/user/states.dart';
import 'package:ilri_pfm/features/sign_out.dart/sign_out.dart';

import './authorization_controller.dart';

class Authorization extends StatefulWidget with $AuthorizationController {
  Authorization({super.key});

  @override
  State<Authorization> createState() => _AuthorizationState();
}

class _AuthorizationState extends State<Authorization> {
  @override
  void initState() {
    widget.initUser(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(builder: (context, state) {
      return Container(
          child: Column(
        children: [
          state.user?.is_approved == true
              ? _buildLoading()
              : _buildWaitingAuthorization(),
          SignOut(),
        ],
      ));
    });
  }

  Widget _buildWaitingAuthorization() {
    return Container(
      child: Text('Your account is not authorized please contact admin'),
    );
  }

  Widget _buildLoading() {
    return Container(
      child: Text('Redirecting...'),
    );
  }
}
