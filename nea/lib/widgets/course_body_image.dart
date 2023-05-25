import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/screens/image_screen.dart';
import 'package:nea/widgets/paragraph.dart';

class CourseBodyImage extends StatelessWidget {
  final String image;
  final String? description;

  const CourseBodyImage(
      {super.key, required this.image, this.description = ""});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          border: Border(left: BorderSide(color: primaryColor, width: 2))),
      child: Column(
        children: [
          Hero(
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
          ),
          Container(
            padding: const EdgeInsets.only(left: 10.0, top: 20),
            child: Paragraph(title: "", body: description!),
          )
        ],
      ),
    );
  }
}
