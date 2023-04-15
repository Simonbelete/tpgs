import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'constants.dart';

ThemeData defaultTheme = ThemeData(
  appBarTheme: AppBarTheme(
      backgroundColor: Colors.blue,
      systemOverlayStyle: SystemUiOverlayStyle.light),
  textTheme: TextTheme(
      bodyMedium: GoogleFonts.mulish(fontSize: 15.0, color: textColor),
      bodyLarge: GoogleFonts.mulish(
          fontSize: 15.0, color: textColor, fontWeight: FontWeight.bold)),
);
