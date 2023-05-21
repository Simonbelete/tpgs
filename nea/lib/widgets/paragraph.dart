import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

class Paragraph extends StatelessWidget {
  final String title;
  final String body;
  final String? route;
  const Paragraph(
      {super.key, required this.title, required this.body, this.route});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 20.0),
      child: RichText(
          text: TextSpan(
              text: title,
              recognizer: route != null
                  ? (TapGestureRecognizer()
                    ..onTap = (() => Navigator.pushNamed(context, route!)))
                  : null,
              style: Theme.of(context).textTheme.bodyLarge!.apply(
                  fontSizeDelta: 1,
                  color: route != null
                      ? Colors.blueAccent
                      : Theme.of(context).textTheme.bodyLarge!.color),
              children: [
            TextSpan(
                text: body,
                style: Theme.of(context)
                    .textTheme
                    .bodyMedium!
                    .apply(fontSizeDelta: 1))
          ])),
    );
  }
}
