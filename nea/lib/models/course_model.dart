import 'package:flutter/material.dart';

class Course {
  final String coverImage;
  final String title;
  final Widget body;

  Course({required this.title, required this.coverImage, required this.body});
}
