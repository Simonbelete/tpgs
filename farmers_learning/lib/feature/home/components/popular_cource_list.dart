import 'package:flutter/material.dart';
import 'package:ilri/widgets/cource_card.dart';
import 'package:ilri/widgets/subtitle_text.dart';

class PopularCourceList extends StatelessWidget {
  const PopularCourceList({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            const SubtitleText(text: 'ታዋቂ ኮርሶች'),
            const SizedBox(
              height: 30,
            ),
            Expanded(
                child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(children: [CourceCard()]),
            ))
          ]),
    );
  }
}
