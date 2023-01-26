import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';

class FormTextBox extends StatelessWidget {
  final TextEditingController? controller;
  final String? hintText;
  final String Function(String?)? validator;

  const FormTextBox(
      {super.key, this.controller, this.hintText, this.validator});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Text(
            hintText ?? '',
            style:
                GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 13.0),
          ),
        ),
        const SizedBox(
          height: 5,
        ),
        TextFormField(
          controller: controller,
          validator: validator,
          style: const TextStyle(
              fontWeight: FontWeight.normal, fontSize: 14, color: kTextColor),
          decoration: InputDecoration(
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6.0),
                borderSide: const BorderSide(
                    color: Color.fromARGB(255, 224, 225, 228))),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0),
                borderSide: const BorderSide(color: Color(0xffE4E3E8))),
            hintText: hintText,
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 15, vertical: 0),
          ),
        ),
      ],
    );
  }
}
