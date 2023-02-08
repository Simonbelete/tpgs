import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

class HaveNoAccount extends StatelessWidget {
  const HaveNoAccount({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.popAndPushNamed(context, RegisterScreen.routeName);
      },
      child: Row(
        children: const [
          SubTitleText(text: 'Dont\'t have account?'),
          SizedBox(
            width: 1,
          ),
          SubTitleText(
              text: 'Create new account.',
              color: kPrimaryColor,
              fontWeight: FontWeight.bold)
        ],
      ),
    );
  }
}
