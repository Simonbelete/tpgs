import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/widgets/header_6.dart';

class FoodListTile extends StatelessWidget {
  final String image;
  final String title;
  final String subtitle;
  const FoodListTile(
      {super.key,
      required this.image,
      required this.title,
      required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Image.asset(image, height: 100, width: 60, fit: BoxFit.fill),
        title: Header6(
          text: title,
          color: primaryColor,
        ),
        subtitle: Text(
          subtitle,
          style: TextStyle(fontSize: 10.0, color: Colors.grey.shade400),
        ),
      ),
    );
  }
}
