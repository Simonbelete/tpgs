import 'package:flutter/material.dart';

class SignInWithGoogleButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const SignInWithGoogleButton({super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
        style: OutlinedButton.styleFrom(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(7.0)),
            padding:
                const EdgeInsets.symmetric(vertical: 15, horizontal: 20.0)),
        onPressed: onPressed,
        child: Row(
          children: [
            Image.asset(
              'assets/images/google.png',
              height: 20,
            ),
            const SizedBox(
              width: 20.0,
            ),
            const Text('Sign in with google'),
          ],
        ));
  }
}
