import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';

class SubTitleText extends StatelessWidget {
  final String text;
  final Color? color;
  final FontWeight? fontWeight;

  const SubTitleText(
      {super.key,
      required this.text,
      this.color = kSubtitleColor,
      this.fontWeight = FontWeight.normal});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.roboto(
          fontSize: 12.0, color: color, fontWeight: fontWeight),
    );
  }
}
