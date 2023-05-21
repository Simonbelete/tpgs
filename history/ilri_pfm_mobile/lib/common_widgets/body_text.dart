import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';

class BodyText extends StatelessWidget {
  final String text;
  final Color? color;

  const BodyText({super.key, required this.text, this.color = kTextColor});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.roboto(fontSize: 15.0, color: color),
    );
  }
}
