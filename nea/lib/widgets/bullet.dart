import 'package:flutter/material.dart';
import 'package:nea/widgets/paragraph.dart';

class Bullet extends StatelessWidget {
  final List<String> children;

  const Bullet({super.key, required this.children});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: children
              .map(
                (e) => Container(
                    padding: EdgeInsets.only(bottom: 0),
                    child: Paragraph(title: '', body: '• $e')),
              )
              .toList()),
    );
  }
}
