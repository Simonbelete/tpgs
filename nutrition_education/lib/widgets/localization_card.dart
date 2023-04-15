import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/onboarding/bloc.dart';
import 'package:nutrition_education/bloc/onboarding/events.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/screens/home_screen.dart';
import 'package:nutrition_education/utils/preferencess.dart';

import 'heading_text.dart';
import 'language_radio.dart';

import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';

import '../i18n/app.dart';

class LocalizationCard extends StatelessWidget {
  const LocalizationCard({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Card(
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.0)),
        color: Colors.white,
        elevation: 8,
        child: Padding(
            padding: const EdgeInsets.all(25.0),
            child: Column(children: [
              HeadingText(
                text: appLocale['select_language']![state.local]!,
                color: primaryColor,
              ),
              const SizedBox(
                height: 10.0,
              ),
              const LanguageRadio(),
              const SizedBox(
                height: 15.0,
              ),
              ElevatedButton(
                onPressed: () {
                  Preferencess.setOnBoarding(true);
                  context.read<OnBoardingBloc>().add(OnBoarded());
                  Navigator.pushNamed(context, HomeScreen.routeName);
                },
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0)),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 38, vertical: 15),
                    backgroundColor: primaryColor),
                child: Text(appLocale['get_started']![state.local]!),
              )
            ])),
      );
    });
  }
}
