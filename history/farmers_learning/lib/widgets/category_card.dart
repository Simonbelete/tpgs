import 'package:flutter/material.dart';
import 'package:ilri/models/category.dart';
import 'package:ilri/widgets/subtitle_text.dart';

class CategoryCard extends StatelessWidget {
  final Category category;

  const CategoryCard({super.key, required this.category});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 35, bottom: 10),
      width: 95,
      height: 100,
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
                offset: Offset(0, 7),
                blurRadius: 10,
                color: Colors.black.withOpacity(0.1))
          ]),
      child: Center(child: SubtitleText(text: category.name)),
    );
  }
}
