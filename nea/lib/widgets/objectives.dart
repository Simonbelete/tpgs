import 'package:flutter/material.dart';
import 'package:nea/constants.dart';

class Objectives extends StatelessWidget {
  final List<String> children;
  final String? title;
  const Objectives(
      {super.key, required this.children, this.title = 'OBJECTIVES'});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20.0),
      child: Container(
        decoration: BoxDecoration(
            color: Color(0xff6DA82F),
            borderRadius: BorderRadius.circular(10.0)),
        padding: const EdgeInsets.only(
          bottom: 0,
          top: 10,
          left: 10,
          right: 10,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RichText(
              text: TextSpan(
                text: title! + " :- ",
                style: Theme.of(context).textTheme.bodyMedium!.apply(
                      fontSizeDelta: 1,
                      fontWeightDelta: 500,
                      color: Colors.white,
                    ),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Padding(
              padding: EdgeInsets.only(left: 15),
              child: RichText(
                  text: TextSpan(
                children: children
                    .map(
                      (e) => TextSpan(
                          text: "• " + e + "\n\n",
                          style: Theme.of(context).textTheme.bodyMedium!.apply(
                                fontSizeDelta: 1,
                                color: Colors.white,
                              )),
                    )
                    .toList(),
              )),
            ),
          ],
        ),
      ),
    );
  }
}
