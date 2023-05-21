import 'package:flutter/material.dart';

class Nutrient {
  final String coverImage;
  final String name;
  final String icon;
  final Widget body;

  Nutrient(
      {required this.coverImage,
      required this.name,
      required this.icon,
      required this.body});
}
