import 'package:flutter/material.dart';

class ListItem extends StatelessWidget {
  final String title;

  const ListItem({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(title),
    );
  }
}
