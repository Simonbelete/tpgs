import 'package:flutter/material.dart';

class HeaderText extends StatelessWidget {
  final Color? color;
  final String text;

  const HeaderText({super.key, required this.text, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style:
          TextStyle(fontSize: 25.0, color: color, fontWeight: FontWeight.bold),
    );
  }
}
