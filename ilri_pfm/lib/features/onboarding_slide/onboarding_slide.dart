import 'dart:io';

import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/screens/login_screen.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

class OnBoardingSlide extends StatelessWidget {
  const OnBoardingSlide({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      padding: EdgeInsets.symmetric(vertical: size.height * 0.05),
      alignment: Alignment.bottomCenter,
      height: size.height,
      width: size.width,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          SizedBox(
            width: 200,
            child: Text(
              'Manage all poultry data in one place',
              style: Theme.of(context).textTheme.subtitle1,
            ),
          ),
          const SizedBox(
            height: 50,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Button(
                child: const Text(
                  'Sing Up',
                ),
                onPressed: () {
                  Navigator.pushNamed(context, LoginScreen.routeName);
                },
              ),
              const SizedBox(
                width: 20,
              ),
              Button(
                child: const Text(
                  'Sing Up',
                ),
                onPressed: () {
                  Navigator.pushNamed(context, RegisterScreen.routeName);
                },
              )
            ],
          )
        ],
      ),
    );
  }
}
