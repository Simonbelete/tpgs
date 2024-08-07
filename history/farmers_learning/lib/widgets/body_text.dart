import 'package:flutter/material.dart';

class BodyText extends StatelessWidget {
  final String text;

  const BodyText({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(fontSize: 14.0),
    );
  }
}
