import 'package:flutter/material.dart';

class ResponsiveWidget {
  static bool isLargeScreen(BuildContext context) {
    return MediaQuery.of(context).size.width > 1200 &&
        MediaQuery.of(context).size.width < 1600;
    ;
  }

  static bool isSmallScreen(BuildContext context) {
    return MediaQuery.of(context).size.width < 580;
  }

  static bool isTabletScreen(BuildContext context) {
    return MediaQuery.of(context).size.width > 580 &&
        MediaQuery.of(context).size.width < 800;
  }

  static isMediumScreen(BuildContext context) {
    return MediaQuery.of(context).size.width > 800 &&
        MediaQuery.of(context).size.width < 1200;
  }
}
