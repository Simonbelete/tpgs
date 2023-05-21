import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class PlusButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const PlusButton({super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return IconButton(
        onPressed: onPressed,
        icon: Icon(
          Icons.add,
          color: kSecondaryColor,
        ));
  }
}
