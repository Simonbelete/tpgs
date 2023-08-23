import 'package:flutter/material.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/paragraph.dart';

class Bullet extends StatelessWidget {
  final List<String> children;

  const Bullet({super.key, required this.children});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return SizedBox(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: children
            .map(
              (e) => Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('•  '),
                  Expanded(
                      // width: size.width * 0.85,
                      child: Paragraph(title: '', body: '$e'))
                ],
              ),
            )
            .toList(),
      ),
    );
  }
}
