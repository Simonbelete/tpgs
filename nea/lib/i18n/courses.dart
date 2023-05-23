import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';

Map<String, Map<String, Course>> courseData = {
  'nutration': {
    'en': Course(
        title: "Example Title",
        coverImage: "",
        body: Column(
          children: [Text('hello')],
        ))
  }
};
