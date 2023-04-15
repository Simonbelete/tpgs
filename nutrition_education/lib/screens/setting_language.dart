import 'package:flutter/material.dart';
import 'package:nutrition_education/constants.dart';

class SettingLanguage extends StatelessWidget {
  static String routeName = '/setting-language';

  const SettingLanguage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text('Change Language'),
        centerTitle: true,
      ),
    );
  }
}
