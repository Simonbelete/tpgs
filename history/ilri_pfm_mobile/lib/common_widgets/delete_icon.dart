import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class DeleteIcon extends StatelessWidget {
  final VoidCallback onPressed;

  const DeleteIcon({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return TextButton(
        style: TextButton.styleFrom(
          foregroundColor: kSecondaryColor,
        ),
        onPressed: onPressed,
        child: Row(
          children: const [
            Icon(Icons.delete_forever),
            SizedBox(
              width: 5,
            ),
            Text('Delete Permanently')
          ],
        ));
  }
}
