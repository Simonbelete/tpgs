import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';

class CustomAppBar extends StatelessWidget {
  final String? title;

  const CustomAppBar({super.key, this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: const BoxDecoration(color: kPrimaryColor, boxShadow: [
        // BoxShadow(
        //   color: Colors.grey,
        //   offset: Offset(0.0, 1.0),
        //   blurRadius: 0.0,
        // ),
      ]),
      padding: const EdgeInsets.only(left: 10.0, right: 10),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        IconButton(
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
            icon: Image.asset(
              'assets/icons/menu_white.png',
              height: 27,
            )),
        Text(
          title ?? '',
          style: GoogleFonts.roboto(
              fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        IconButton(
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
            icon: Image.asset(
              'assets/icons/notification_bing_white.png',
              height: 23,
            ))
      ]),
    );
  }
}
