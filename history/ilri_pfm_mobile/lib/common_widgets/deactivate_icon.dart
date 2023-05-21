import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class DeactivateIcon extends StatelessWidget {
  final VoidCallback onPressed;
  const DeactivateIcon({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return TextButton(
        style: TextButton.styleFrom(
          foregroundColor: kSecondaryColor,
        ),
        onPressed: onPressed,
        child: Row(
          children: const [
            Icon(Icons.visibility_off),
            SizedBox(
              width: 5,
            ),
            Text('Deactivate')
          ],
        ));
  }
}
