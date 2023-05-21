import 'package:flutter/material.dart';

class SubTitle extends StatelessWidget {
  final String text;
  final Color? color;

  const SubTitle({super.key, required this.text, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(fontSize: 12.0, color: color),
    );
  }
}
