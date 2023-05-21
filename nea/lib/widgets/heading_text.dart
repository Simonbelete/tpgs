import 'package:flutter/material.dart';

class HeadingText extends StatelessWidget {
  final String text;
  final Color? color;

  const HeadingText({super.key, required this.text, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style:
          TextStyle(fontSize: 25.0, color: color, fontWeight: FontWeight.bold),
    );
  }
}
