import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/widgets/sub_title_text.dart';

class HeaderLogo extends StatelessWidget {
  const HeaderLogo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 20.0, right: 20.0, top: 20.0),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Image.asset(
          'assets/images/logo_color.png',
          height: 30,
        ),
        SubTitleText(
          text: "Nutrition Education",
          color: secondaryColor,
        ),
        Image.asset(
          'assets/images/ilri_logo.png',
          width: 60,
        )
      ]),
    );
  }
}
