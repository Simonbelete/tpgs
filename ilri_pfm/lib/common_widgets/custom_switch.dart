import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';

class CustomSwitch extends StatefulWidget {
  final String text;
  final bool? value;
  final Function(bool value) onChanged;

  const CustomSwitch(
      {super.key,
      required this.text,
      required this.onChanged,
      this.value = false});

  @override
  State<CustomSwitch> createState() => _CustomSwitchState();
}

class _CustomSwitchState extends State<CustomSwitch> {
  bool switchValue = false;

  @override
  void initState() {
    setState(() {
      switchValue = widget.value ?? false;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          widget.text,
          style:
              GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 13.0),
        ),
        const SizedBox(
          width: 10,
        ),
        Switch(
            value: switchValue,
            onChanged: (bool val) {
              setState(() {
                switchValue = val;
                widget.onChanged(val);
              });
            },
            activeColor: kPrimaryColor)
      ],
    );
  }
}
