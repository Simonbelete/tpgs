import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/bloc/local/states.dart';
import 'package:nea/constants.dart';
import 'package:nea/data/localization_data.dart';
import 'package:nea/utils/preferencess.dart';

import 'package:nea/bloc/local/events.dart';

class LanguageChip extends StatelessWidget {
  const LanguageChip({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Container(
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: localizationData
                .map(
                  (e) => InkWell(
                    onTap: () {
                      Preferencess.setLocal(e.code);
                      context.read<LocalBloc>().add(SetLocal(e.code));
                    },
                    child: Chip(
                      side: BorderSide(width: 1, color: Colors.grey.shade300),
                      // avatar: CircleAvatar(
                      //   backgroundImage: AssetImage(e.icon),
                      // ),
                      backgroundColor: e.code == state.local
                          ? primaryColor
                          : Color(0xffF5F7FB),
                      label: Text(
                        e.text,
                        style: TextStyle(
                            fontSize: 14.0,
                            color: e.code == state.local
                                ? Colors.white
                                : primaryColor),
                      ),
                    ),
                  ),
                )
                .toList()),
      );
    });
  }
}

//  const [
//           Chip(
//             avatar: CircleAvatar(
//               backgroundColor: Color(0xffF5F7FB),
//               child: const Text(''),
//             ),
//             label: const Text('Aaron Burr'),
//           ),
//         ]