import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:nea/constants.dart';

class SubTitleText extends StatelessWidget {
  final String text;
  final double? fontSize;
  final Color? color;

  const SubTitleText(
      {super.key,
      required this.text,
      this.fontSize = 20.0,
      this.color = primaryColor});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: SelectableText.rich(
        TextSpan(
          text: text,
          style: GoogleFonts.mulish(
              fontSize: fontSize,
              fontWeight: FontWeight.bold,
              color: (() {
                if (fontSize == 16.0) {
                  return secondaryColor;
                }

                if (fontSize == 14.0) {
                  return secondaryColor.withOpacity(0.8);
                }

                return color;
              }())),
        ),
      ),
    );
  }
}
