import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';

class WelcomeText extends StatelessWidget {
  const WelcomeText({super.key});

  @override
  Widget build(BuildContext context) {
    String? name = context.read<UserBloc>().state.user?.name;
    return Row(
      children: [TitleText(text: 'Welcome'), BodyText(text: name ?? '')],
    );
  }
}
