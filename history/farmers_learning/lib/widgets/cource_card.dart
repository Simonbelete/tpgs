import 'package:flutter/material.dart';
import 'package:ilri/widgets/body_text.dart';
import 'package:ilri/widgets/subtitle_text.dart';

class CourceCard extends StatelessWidget {
  const CourceCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
      elevation: 10,
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.only(top: 2, left: 2, right: 2, bottom: 10),
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              ClipRRect(
                borderRadius: BorderRadius.circular(3),
                child: Image.network(
                  'https://picsum.photos/seed/picsum/200/300',
                  height: 100,
                  width: 140,
                  fit: BoxFit.fill,
                ),
              ),
              const SizedBox(
                height: 2,
              ),
              SubtitleText(text: 'Heading 1'),
              BodyText(text: 'Body')
            ]),
      ),
    );
  }
}
