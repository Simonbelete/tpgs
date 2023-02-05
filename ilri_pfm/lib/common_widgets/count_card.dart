import 'package:flutter/material.dart';
import 'package:flutter_svg/parser.dart';
import 'package:flutter_svg/svg.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';

class CountCard extends StatelessWidget {
  final Icon icon;
  final String title;
  final String count;

  const CountCard(
      {super.key,
      required this.icon,
      required this.title,
      required this.count});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
      child: Container(
        width: 150,
        padding:
            const EdgeInsets.only(top: 20, bottom: 20, left: 20, right: 10),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              HeaderText(
                text: count,
                color: kSecondaryColor,
              ),
              Container(
                  padding: const EdgeInsets.all(6),
                  decoration: const BoxDecoration(
                      color: kPrimaryColor, shape: BoxShape.circle),
                  child: icon)
            ],
          ),
          const SizedBox(
            height: 20,
          ),
          TitleText(text: title)
        ]),
      ),
    );
  }
}
