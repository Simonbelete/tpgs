import 'package:flutter/material.dart';
import 'package:flutter_svg/parser.dart';
import 'package:flutter_svg/svg.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';

class PanelCard extends StatelessWidget {
  final String icon;
  final String text;
  const PanelCard({super.key, required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
          side: BorderSide(color: kPrimaryColor)),
      child: Container(
          height: 150,
          width: 150,
          child: Center(
              child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SvgPicture.asset(
                icon,
                color: kPrimaryColor,
                height: 80,
              ),
              const SizedBox(
                height: 10,
              ),
              TitleText(
                text: text,
                color: kPrimaryColor,
              )
            ],
          ))),
    );
  }
}
