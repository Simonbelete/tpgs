import 'package:flutter/material.dart';

class Recipe {
  final String coverImage;
  final String title;
  final Widget body;
  final Widget facts;
  final Widget ingredients, instructions;

  Recipe(
      {required this.coverImage,
      required this.title,
      required this.body,
      required this.facts,
      required this.ingredients,
      required this.instructions});
}
