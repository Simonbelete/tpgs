import 'package:flutter/material.dart';

class Food {
  final String coverImage;
  final String title;
  final Widget description;
  final Widget body;
  final Widget facts;

  Food(
      {required this.coverImage,
      required this.title,
      required this.body,
      required this.description,
      required this.facts});
}
