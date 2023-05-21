import 'package:flutter/material.dart';
import 'package:ilri/utils/color.dart';

class CircularFavoriteIcon extends StatelessWidget {
  const CircularFavoriteIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 25,
      width: 25,
      decoration: BoxDecoration(
        color: primaryColor,
        borderRadius: BorderRadius.circular(100),
      ),
      child: Center(
          child: GestureDetector(
        child: const Icon(
          Icons.favorite,
          size: 17,
          color: Colors.white,
        ),
      )),
    );
  }
}

// ElevatedButton(
//       style: ElevatedButton.styleFrom(
//         minimumSize: Size(25, 25),
//         backgroundColor: primaryColor,
//         shape: const CircleBorder(),
//         elevation: 0,
//       ),
//       child: const Icon(
//         Icons.favorite,
//         size: 18,
//       ),
//       onPressed: () {},
//     );