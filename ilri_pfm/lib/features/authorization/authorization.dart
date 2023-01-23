import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/sign_out.dart/sign_out.dart';

import './authorization_controller.dart';

class Authorization extends StatefulWidget with $AuthorizationController {
  Authorization({super.key});

  @override
  State<Authorization> createState() => _AuthorizationState();
}

class _AuthorizationState extends State<Authorization> {
  @override
  void initState() {
    widget.initUser(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [
        const Text('Authroization Screen'),
        SignOut(),
      ],
    ));
  }
}
