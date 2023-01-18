import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/sign_in_form/sign_in_form.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

class LoginScreen extends StatelessWidget {
  static const String routeName = '/login';

  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign In'),
      ),
      body: Column(children: [SignInForm()]),
    );
  }
}
