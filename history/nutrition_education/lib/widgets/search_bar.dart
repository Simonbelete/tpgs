import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/i18n/app.dart';

class SearchBar extends StatelessWidget {
  final void Function(String query) onSubmit;
  final void Function(String value) onChange;
  final String? initialValue;
  const SearchBar(
      {super.key,
      required this.onSubmit,
      required this.onChange,
      this.initialValue});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Container(
        child: TextFormField(
          initialValue: initialValue ?? '',
          onChanged: onChange,
          onFieldSubmitted: onSubmit,
          decoration: InputDecoration(
              hintText: appLocale['find_course_or_materials']![state.local],
              filled: true,
              fillColor: const Color(0xffF5F7FB),
              border: const OutlineInputBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(18.0),
                  ),
                  borderSide: BorderSide.none),
              prefixIcon: const Icon(
                Icons.search,
                color: Color(0xffBABFD2),
              ),
              contentPadding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
              hintStyle: const TextStyle(fontSize: 13.0)),
        ),
      );
    });
  }
}
