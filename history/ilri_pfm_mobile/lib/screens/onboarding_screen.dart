import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/features/onboarding_slide/onboarding_slide.dart';

class OnBoardingScreen extends StatelessWidget {
  const OnBoardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
      statusBarColor: kPrimaryColor,
    ));
    return const Scaffold(
      backgroundColor: kPrimaryColor,
      body: SafeArea(child: OnBoardingSlide()),
    );
  }
}
