import 'package:flutter/material.dart';
import 'package:nutrition_education/screens/image_screen.dart';

class CourseBodyImage extends StatelessWidget {
  final String image;

  const CourseBodyImage({super.key, required this.image});

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: image,
      child: Material(
        child: InkWell(
          onTap: () {
            Navigator.pushNamed(context, ImageScreen.routeName,
                arguments: image);
          },
          child: ClipRRect(
            borderRadius: BorderRadius.circular(10.0),
            child: Image.asset(
              image,
              fit: BoxFit.fill,
              height: 250,
            ),
          ),
        ),
      ),
    );
  }
}
