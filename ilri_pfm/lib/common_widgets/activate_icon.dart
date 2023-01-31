import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class ActivateIcon extends StatelessWidget {
  final VoidCallback onPressed;
  const ActivateIcon({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return TextButton(
        style: TextButton.styleFrom(
          foregroundColor: kSucessColor,
        ),
        onPressed: onPressed,
        child: Row(
          children: const [
            Icon(Icons.visibility),
            SizedBox(
              width: 5,
            ),
            Text('Activate')
          ],
        ));
  }
}
