import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';

class SubTitleText extends StatelessWidget {
  final String text;

  const SubTitleText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 10.0),
      child: RichText(
        text: TextSpan(
          text: text,
          style: GoogleFonts.mulish(
              fontSize: ResponsiveWidget.isSmallScreen(context) ? 20.0 : 25.0,
              fontWeight: FontWeight.bold,
              color: primaryColor),
        ),
      ),
    );
  }
}
