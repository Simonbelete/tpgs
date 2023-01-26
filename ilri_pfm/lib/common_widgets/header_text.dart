import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class HeaderText extends StatelessWidget {
  final Color? color;
  final String text;
  final FontWeight? fontWeight;

  const HeaderText(
      {super.key,
      required this.text,
      this.color = kTextColor,
      this.fontWeight = FontWeight.bold});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(fontSize: 30.0, color: color, fontWeight: fontWeight),
    );
  }
}
