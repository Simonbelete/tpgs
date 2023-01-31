import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:ilri_pfm/features/sign_in_form/sign_in_form.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

class LoginScreen extends StatelessWidget {
  static const String routeName = '/login';

  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.white,
          statusBarIconBrightness: Brightness.dark,
          statusBarBrightness: Brightness.light,
        ),
      ),
      body: SafeArea(
          child:
              SingleChildScrollView(child: Column(children: [SignInForm()]))),
    );
  }
}
