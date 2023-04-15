import 'package:flutter/material.dart';

class CoursePage {
  final String description;
  final String image;

  CoursePage({required this.description, required this.image});
}

class Course {
  final String title;
  final String description;
  final List<CoursePage>? pages;
  final String coverImage;

  Course(
      {required this.title,
      this.pages,
      required this.coverImage,
      required this.description});
}
