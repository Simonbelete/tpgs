import 'package:flutter/material.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

class CategoryButton extends StatelessWidget {
  final String text, icon;
  final Widget? body;
  final bool? horizontal;
  const CategoryButton(
      {super.key,
      required this.text,
      required this.icon,
      this.horizontal = false,
      this.body});

  @override
  Widget build(BuildContext context) {
    if (horizontal == true) {
      return Row(children: [
        Container(
          height: 50,
          padding: const EdgeInsets.all(10.0),
          decoration: BoxDecoration(
              color: const Color(0xffF5F7FB),
              borderRadius: BorderRadius.circular(10.0)),
          child: Image.asset(icon),
        ),
        const SizedBox(
          width: 10,
        ),
        Container(
          width: ResponsiveWidget.isSmallScreen(context) ? 100 : 300,
          child: SubTitle(
            text: text,
            color: const Color(0xff565663),
          ),
        )
      ]);
    } else {
      return Column(children: [
        Container(
          height: 50,
          padding: const EdgeInsets.all(10.0),
          decoration: BoxDecoration(
              color: const Color(0xffF5F7FB),
              borderRadius: BorderRadius.circular(10.0)),
          child: Image.asset(icon),
        ),
        const SizedBox(
          height: 10,
        ),
        SubTitle(
          text: text,
          color: const Color(0xff565663),
        )
      ]);
    }
  }
}

// Column(children: [
//           Container(
//             height: 50,
//             padding: const EdgeInsets.all(10.0),
//             decoration: BoxDecoration(
//                 color: const Color(0xffF5F7FB),
//                 borderRadius: BorderRadius.circular(10.0)),
//             child: Image.asset(
//               'assets/icons/supplement.png',
//             ),
//           ),
//           const SizedBox(
//             height: 10,
//           ),
//           const SubTitle(text: 'Vitamins')
//         ]),


// Column(children: [
//       Container(
//         height: 50,
//         padding: const EdgeInsets.all(10.0),
//         decoration: BoxDecoration(
//             color: primaryColor, borderRadius: BorderRadius.circular(10.0)),
//         child: Image.asset(icon),
//       ),
//       const SizedBox(
//         height: 10,
//       ),
//       SubTitle(text: text)
//     ]);