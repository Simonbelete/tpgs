import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/screens/login_screen.dart';

class HaveAccount extends StatelessWidget {
  const HaveAccount({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.popAndPushNamed(context, LoginScreen.routeName);
      },
      child: Row(
        children: const [
          SubTitleText(text: 'Already have an account?'),
          SizedBox(
            width: 1,
          ),
          SubTitleText(
              text: 'Login', color: kPrimaryColor, fontWeight: FontWeight.bold)
        ],
      ),
    );
  }
}
