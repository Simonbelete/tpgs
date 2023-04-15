import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:carousel_slider/carousel_slider.dart';

import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/bloc/onboarding/bloc.dart';
import 'package:nutrition_education/bloc/onboarding/events.dart';
import 'package:nutrition_education/bloc/onboarding/states.dart';
import 'package:nutrition_education/utils/preferencess.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/localization_card.dart';

// Slider and bloc example
class OnBoardingScreen extends StatelessWidget {
  static CarouselController carouselController = CarouselController();
  static const List<String> _carouselImage = [
    'assets/images/moose-g6cf75b599_1280.jpg',
    'assets/images/moose-g6cf75b599_1280.jpg',
    'assets/images/img_main.png',
    'assets/images/img_main.png'
  ];

  const OnBoardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
        overlays: [SystemUiOverlay.bottom]);
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
          height: size.height,
          width: size.width,
          decoration: BoxDecoration(
            color: primaryColor,
          ),
          child: Stack(
            children: [
              Positioned(
                  top: 100,
                  left: 0,
                  right: 0,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset(
                        'assets/images/amico.png',
                        width: size.width * 0.8,
                        height: 500,
                      )
                    ],
                  )),
              Positioned(
                  bottom: 10,
                  left: 0,
                  right: 0,
                  child: Center(
                    child: Container(
                        width: ResponsiveWidget.isSmallScreen(context)
                            ? size.width * 0.9
                            : 400,
                        child: LocalizationCard()),
                  ))
            ],
          )),
    );
  }
}
