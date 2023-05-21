import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/widgets/title_text.dart';
import 'package:google_fonts/google_fonts.dart';

class ToggleSection extends StatefulWidget {
  final Widget ingredients, instructions;

  const ToggleSection(
      {super.key, required this.ingredients, required this.instructions});

  @override
  State<ToggleSection> createState() => _ToggleSectionState();
}

class _ToggleSectionState extends State<ToggleSection> {
  List<bool> isSelected = [true, false];
  double elevation = 20;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Container(
        alignment: Alignment.center,
        width: size.width,
        child: Column(children: [
          ToggleButtons(
            borderRadius: BorderRadius.circular(20.0),
            selectedColor: Colors.white,
            fillColor: primaryColor,
            isSelected: isSelected,
            onPressed: (int index) {
              setState(() {
                for (int buttonIndex = 0;
                    buttonIndex < isSelected.length;
                    buttonIndex++) {
                  if (buttonIndex == index) {
                    isSelected[buttonIndex] = true;
                  } else {
                    isSelected[buttonIndex] = false;
                  }
                }
              });
            },
            children: <Widget>[
              Container(
                padding: EdgeInsets.symmetric(horizontal: size.width * 0.12),
                decoration: BoxDecoration(),
                child: const Text(
                  'Ingredients',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: size.width * 0.12),
                decoration: BoxDecoration(),
                child: Text('Instructions',
                    style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Visibility(visible: isSelected[0], child: widget.ingredients),
          Visibility(
              visible: isSelected[1],
              child: Container(
                padding: EdgeInsets.only(left: 8),
                child: widget.instructions,
              ))
        ]),
      );
    });
  }
}
