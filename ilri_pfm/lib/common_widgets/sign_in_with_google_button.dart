import 'package:flutter/material.dart';

class SignInWithGoogleButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const SignInWithGoogleButton({super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: onPressed, child: const Text('Sign in with google'));
  }
}
