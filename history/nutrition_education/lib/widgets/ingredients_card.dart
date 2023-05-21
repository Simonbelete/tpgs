import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';

class IngredientCard extends StatelessWidget {
  final String image;
  final String title;
  final String quantity;

  const IngredientCard(
      {Key? key,
      required this.image,
      required this.title,
      required this.quantity})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(bottom: 0),
      width: 100,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(6.0),
          shape: BoxShape.rectangle,
          border: Border.all(color: Colors.grey.shade300)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Image.asset(
          image,
          height: ResponsiveWidget.isSmallScreen(context) ? 60 : 120,
          width: ResponsiveWidget.isSmallScreen(context) ? 80 : 160,
        ),
        RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
              text: title,
              style: GoogleFonts.mulish(
                  fontSize: 14.0,
                  fontWeight: FontWeight.bold,
                  color: primaryColor)),
        ),
        const SizedBox(
          height: 5,
        ),
        RichText(
          text: TextSpan(
              text: quantity,
              style: GoogleFonts.mulish(
                  fontSize: 10.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade600)),
        )
      ]),
    );
  }
}
