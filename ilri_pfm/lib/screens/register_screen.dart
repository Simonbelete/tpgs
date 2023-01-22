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
          statusBarColor: Colors.white, // <-- SEE HERE
          statusBarIconBrightness:
              Brightness.dark, //<-- For Android SEE HERE (dark icons)
          statusBarBrightness:
              Brightness.light, //<-- For iOS SEE HERE (dark icons)
        ),
      ),
      body: Center(
        child: Container(
            width: size.width * 0.8, child: Column(children: [SignUpForm()])),
      ),
    );
  }
}
