import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:nea/constants.dart';

class SubTitleText extends StatelessWidget {
  final String text;
  final double? fontSize;

  const SubTitleText({super.key, required this.text, this.fontSize = 20.0});

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
              color: primaryColor),
        ),
      ),
      // child: RichText(
      //   text: TextSpan(
      //     text: text,
      //     style: GoogleFonts.mulish(
      //         fontSize: fontSize,
      //         fontWeight: FontWeight.bold,
      //         color: primaryColor),
      //   ),
      // ),
    );
  }
}
