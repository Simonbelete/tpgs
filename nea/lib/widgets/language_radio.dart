import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/events.dart';
import 'package:nea/constants.dart';

import 'package:nea/data/localization_data.dart';
import '../bloc/local/bloc.dart';
import '../bloc/local/states.dart';

class LanguageRadio extends StatelessWidget {
  const LanguageRadio({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Column(
        children: localizationData
            .map((e) => Padding(
                  padding: EdgeInsets.symmetric(vertical: 5),
                  child: InkWell(
                    onTap: () {
                      context.read<LocalBloc>().add(SetLocal(e.code));
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                      ),
                      height: 45,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: state.local == e.code
                            ? primaryColor
                            : const Color(0xffFAFAFA),
                      ),
                      child: Row(children: [
                        Padding(
                            padding: EdgeInsets.only(left: 5),
                            child: Text(
                              e.text,
                              style: TextStyle(
                                  color: state.local == e.code
                                      ? Colors.white
                                      : Colors.black),
                            ))
                      ]),
                    ),
                  ),
                ))
            .toList(),
      );
    });
  }
}
