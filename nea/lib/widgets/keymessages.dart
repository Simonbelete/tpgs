import 'package:flutter/material.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

class KeyMessages extends StatelessWidget {
  final List<dynamic> children;
  final String? title;

  const KeyMessages(
      {super.key, required this.children, this.title = 'Key Messages'});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SubTitleText(text: title!),
          Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: children.map((e) {
                if (e is String) {
                  return Container(
                      padding: EdgeInsets.only(bottom: 0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('•  '),
                          Container(
                              width: size.width * 0.85,
                              child: Paragraph(title: '', body: '$e'))
                        ],
                      ));
                }
                return Container(
                  child: e,
                );
              }).toList()),
        ],
      ),
    );
  }
}
