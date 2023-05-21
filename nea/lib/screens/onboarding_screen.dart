import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:nea/constants.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/localization_card.dart';

// Slider and bloc example
class OnBoardingScreen extends StatelessWidget {
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
