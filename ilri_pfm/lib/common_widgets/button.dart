import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class Button extends StatelessWidget {
  final VoidCallback? onPressed;
  final Widget child;
  const Button({super.key, this.onPressed, required this.child});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
          backgroundColor: ColorSet.iPrimaryColor,
          textStyle: Theme.of(context).textTheme.button,
          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 12),
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0))),
      child: child,
    );
  }
}
