import 'package:flutter/material.dart';

import './authorization_controller.dart';

class Authorization extends StatefulWidget with $AuthorizationController {
  Authorization({super.key});

  @override
  State<Authorization> createState() => _AuthorizationState();
}

class _AuthorizationState extends State<Authorization> {
  @override
  void initState() {
    widget.initUser();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Authorization Screen'),
    );
  }
}
