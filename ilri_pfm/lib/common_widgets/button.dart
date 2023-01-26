import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class Button extends StatelessWidget {
  final bool? outlined;
  final VoidCallback? onPressed;
  final Widget child;
  final Color? color;
  final Color? backgroundColor;
  const Button({
    super.key,
    this.onPressed,
    required this.child,
    this.outlined,
    this.color = Colors.white,
    this.backgroundColor = kPrimaryColor,
  });

  @override
  Widget build(BuildContext context) {
    if (outlined == true) {
      return OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
            foregroundColor: backgroundColor,
            padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 12),
            textStyle: Theme.of(context).textTheme.button?.apply(color: color),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0)),
            side: BorderSide(color: backgroundColor ?? kPrimaryColor)),
        child: child,
      );
    } else {
      return ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          foregroundColor: color,
          backgroundColor: backgroundColor,
          textStyle: Theme.of(context).textTheme.button,
          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
        ),
        child: child,
      );
    }
  }
}
