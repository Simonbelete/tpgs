import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';

import '0/all.dart' as course_0;
import '1/all.dart' as course_1;
import '2/all.dart' as course_2;
import '3/all.dart' as course_3;
import '4/all.dart' as course_4;
import '5/all.dart' as course_5;
import '6/all.dart' as course_6;
import '7/all.dart' as course_7;
import 'chicken_meat/all.dart' as chicken_meat;
import 'egg_c/all.dart' as egg;

Map<String, Map<String, Course>> courseData = {
  '0': {'en': course_0.EN, 'am': course_0.AM, 'sw': course_0.SW},
  '1': {'en': course_1.EN, 'am': course_1.AM, 'sw': course_1.SW},
  '2': {'en': course_2.EN, 'am': course_2.AM, 'sw': course_2.SW},
  '3': {'en': course_3.EN, 'am': course_3.AM, 'sw': course_3.SW},
  '4': {'en': course_4.EN, 'am': course_4.AM, 'sw': course_4.SW},
  '5': {'en': chicken_meat.EN, 'am': chicken_meat.AM, 'sw': chicken_meat.SW},
  'egg': {'en': egg.EN, 'am': chicken_meat.AM, 'sw': chicken_meat.SW},
  '6': {'en': course_5.EN, 'am': course_5.AM, 'sw': course_5.SW},
  '7': {'en': course_6.EN, 'am': course_6.AM, 'sw': course_6.SW},
  '8': {'en': course_7.EN, 'am': course_7.AM, 'sw': course_7.SW},
};
