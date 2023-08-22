import 'package:flutter/material.dart';
import 'package:nea/utils/responsive_widget.dart';

class Header6 extends StatelessWidget {
  final String text;
  final Color? color;

  const Header6({super.key, required this.text, this.color = Colors.black});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      maxLines: ResponsiveWidget.isSmallScreen(context) ? 2 : 4,
      overflow: TextOverflow.ellipsis,
      style: TextStyle(
          fontSize: ResponsiveWidget.isSmallScreen(context) ? 15.0 : 17.0,
          fontWeight: FontWeight.bold,
          color: color),
    );
  }
}
