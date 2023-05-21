import 'package:flutter/material.dart';

class Header6 extends StatelessWidget {
  final String text;
  final Color? color;

  const Header6({super.key, required this.text, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
      style:
          TextStyle(fontSize: 15.0, fontWeight: FontWeight.bold, color: color),
    );
  }
}