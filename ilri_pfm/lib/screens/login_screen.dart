import 'package:flutter/material.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(children: [
        TextButton(
            onPressed: () {
              Navigator.pushNamed(context, RegisterScreen.routeName);
            },
            child: const Text('Sign up '))
      ]),
    );
  }
}
