import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/header_6.dart';

class FoodCardPlain extends StatelessWidget {
  final String image, title;

  const FoodCardPlain({super.key, required this.image, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(bottom: 20.0),
      width: 170,
      child: Card(
        elevation: 1,
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
        color: Colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20.0),
                  topRight: Radius.circular(20.0)),
              child: Image.asset(
                image,
                fit: BoxFit.contain,
                height: 100,
                width: 170,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Container(
                padding: const EdgeInsets.only(left: 10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Header6(
                      text: title,
                      color: primaryColor,
                    ),
                  ],
                )),
            // SizedBox(
            //   height: ResponsiveWidget.isSmallScreen(context) ? 10 : 15,
            // ),
            // Container(
            //   padding: const EdgeInsets.symmetric(horizontal: 10.0),
            //   child: Row(
            //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //     crossAxisAlignment: CrossAxisAlignment.center,
            //     children: [
            //       Text(''),
            //       Image.asset(
            //         'assets/icons/right-arrow.png',
            //         height: 26,
            //       )
            //     ],
            //   ),
            // )
          ],
        ),
      ),
    );
  }
}
