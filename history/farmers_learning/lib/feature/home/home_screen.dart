import 'package:flutter/material.dart';
import 'package:ilri/feature/home/components/body.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home-screen';

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Body();
  }
}
