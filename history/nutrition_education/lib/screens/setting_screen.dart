import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/utils/preferencess.dart';

import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/events.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/widgets/header_logo.dart';

import '../i18n/app.dart';

class SettingScreen extends StatelessWidget {
  static GlobalKey _languagePopupKey = GlobalKey();

  const SettingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Container(
        child: Material(
            child: SingleChildScrollView(
          child: Column(children: [
            HeaderLogo(),
            const SizedBox(
              height: 20,
            ),
            ListTile(
              onTap: () {
                dynamic dp_state = _languagePopupKey.currentState;
                dp_state.showButtonMenu();
              },
              leading: const Icon(
                Icons.language,
                size: 40.0,
                color: Colors.black54,
              ),
              title: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(appLocale['language']![state.local]!),
                  PopupMenuButton(
                      // icon: Icon(Icons.arrow_forward),
                      key: _languagePopupKey,
                      onSelected: (value) {
                        Preferencess.setLocal(value);
                        context.read<LocalBloc>().add(SetLocal(value));
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text('Sucessfully lanauge changed')));
                      },
                      itemBuilder: (context) => const [
                            PopupMenuItem(value: 'en', child: Text('English')),
                            PopupMenuItem(value: 'am', child: Text('አማርኛ')),
                            PopupMenuItem(value: 'sw', child: Text('Swahili')),
                          ])
                ],
              ),
              subtitle: Text(
                state.getName(),
                style: TextStyle(fontSize: 13.0),
              ),
            )
          ]),
        )),
      );
    });
  }
}
