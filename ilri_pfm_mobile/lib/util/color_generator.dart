import 'dart:math' as math;
import 'package:flutter/material.dart';

Color generateRandomColor(int? i) {
  final rand = i == null ? math.Random().nextDouble() : i / 10000;
  return Color((rand * 0xFFFFFF).toInt()).withOpacity(1.0);
}
