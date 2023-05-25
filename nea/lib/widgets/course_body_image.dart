import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/screens/image_screen.dart';
import 'package:nea/widgets/paragraph.dart';

class CourseBodyImage extends StatelessWidget {
  final String image;
  final String? description;
  final List<Widget>? children;

  const CourseBodyImage(
      {super.key, required this.image, this.description = "", this.children});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 20.0),
      decoration: BoxDecoration(
          border: Border(left: BorderSide(color: primaryColor, width: 2))),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            child: Hero(
              tag: image,
              child: Material(
                color: Colors.white,
                child: InkWell(
                  onTap: () {
                    Navigator.pushNamed(context, ImageScreen.routeName,
                        arguments: image);
                  },
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10.0),
                    child: Image.asset(
                      image,
                      fit: BoxFit.contain,
                      height: 250,
                    ),
                  ),
                ),
              ),
            ),
          ),
          description != null
              ? Container(
                  padding: const EdgeInsets.only(left: 10.0, top: 20),
                  child: Paragraph(title: "", body: description!),
                )
              : Container()
          // Container(
          //     decoration: BoxDecoration(border: Border.all(color: Colors.blue)),
          //     padding: const EdgeInsets.only(left: 10.0, top: 0),
          //     child:
          //         children == null ? Container() : Column(children: children!))
        ],
      ),
    );
  }
}
