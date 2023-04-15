import 'package:flutter/material.dart';
import 'package:ilri/widgets/subtitle_text.dart';
import 'package:ilri/data/category_data.dart';
import 'package:ilri/widgets/category_card.dart';

class CategoryList extends StatelessWidget {
  const CategoryList({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 140,
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            const SubtitleText(text: 'ምድብ'),
            const SizedBox(
              height: 20,
            ),
            Expanded(
                child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                        children: categoryData
                            .map((category) => CategoryCard(category: category))
                            .toList())))
          ]),
    );
  }
}
