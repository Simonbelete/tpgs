import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/features/sign_out.dart/sign_out.dart';
import 'package:ilri_pfm/main_dev.dart';

/// Check if the user account is activated and retrieve user data and
/// store it in bloc

class ActivationScreen extends StatelessWidget {
  static const String routeName = '/activation';

  const ActivationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(
        children: [
          Text('Activation'),
          SignOut(),
          Button(
            child: Text('Refresh'),
            onPressed: () {
              Navigator.pushNamed(context, UserSync.routeName);
            },
          )
        ],
      )),
    );
  }
}
