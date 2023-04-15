import 'package:flutter/material.dart';

class FavoritButton extends StatelessWidget {
  final bool? state;
  const FavoritButton({super.key, this.state = false});

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      state == true ? 'assets/icons/heart.png' : 'assets/icons/love.png',
      height: 20,
    );
  }
}
