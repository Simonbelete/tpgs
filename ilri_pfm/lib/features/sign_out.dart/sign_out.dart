import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/button.dart';

import './sign_out_controller.dart';

class SignOut extends StatelessWidget with $SignOut {
  SignOut({super.key});

  @override
  Widget build(BuildContext context) {
    return Button(
      child: const Text('Sign Out'),
      onPressed: () => singOut(),
    );
  }
}
