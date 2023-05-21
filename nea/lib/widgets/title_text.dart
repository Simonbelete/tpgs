import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:nea/constants.dart';

class TitleText extends StatelessWidget {
  final String text;

  const TitleText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: text,
        style: GoogleFonts.mulish(
            fontSize: 30.0, fontWeight: FontWeight.bold, color: primaryColor),
      ),
    );
  }
}
