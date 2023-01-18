import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/sign_up_form/sign_up_form.dart';

class RegisterScreen extends StatelessWidget {
  static const String routeName = '/register';

  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Up Form'),
      ),
      body: Column(children: [SignUpForm()]),
    );
  }
}
