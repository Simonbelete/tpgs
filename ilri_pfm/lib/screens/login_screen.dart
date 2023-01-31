import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/sign_in_form/sign_in_form.dart';

class LoginScreen extends StatelessWidget {
  static const String routeName = '/login';

  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
          child:
              SingleChildScrollView(child: Column(children: [SignInForm()]))),
    );
  }
}
