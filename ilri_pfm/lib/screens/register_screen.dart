import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:ilri_pfm/features/sign_up_form/sign_up_form.dart';

class RegisterScreen extends StatelessWidget {
  static const String routeName = '/register';

  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
      body: SingleChildScrollView(
        child: Center(
          child: Container(width: size.width * 0.8, child: SignUpForm()),
        ),
      ),
    );
  }
}
