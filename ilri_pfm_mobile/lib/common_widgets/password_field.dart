import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';

class PasswordField extends StatefulWidget {
  final TextEditingController? controller;

  const PasswordField({super.key, this.controller});

  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  bool passwordVisible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Text(
            'Password',
            style:
                GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 13.0),
          ),
        ),
        const SizedBox(
          height: 5,
        ),
        TextFormField(
          obscureText: passwordVisible,
          enableSuggestions: false,
          autocorrect: false,
          controller: widget.controller,
          validator: (String? value) {
            if (value != null) {
              if (value.length < 3) {
                return 'Password must be at least 6 characters long';
              } else {
                return null;
              }
            } else {
              return 'Password cannot be empty';
            }
          },
          keyboardType: TextInputType.visiblePassword,
          textInputAction: TextInputAction.done,
          style: const TextStyle(
              fontWeight: FontWeight.normal, fontSize: 14, color: kTextColor),
          decoration: InputDecoration(
            focusedErrorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6.0),
                borderSide: const BorderSide(color: kSecondaryColor)),
            errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6.0),
                borderSide: const BorderSide(color: kSecondaryColor)),
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6.0),
                borderSide: const BorderSide(
                    color: Color.fromARGB(255, 224, 225, 228))),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0),
                borderSide: const BorderSide(color: Color(0xffE4E3E8))),
            hintText: 'Enter your password',
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 15, vertical: 0),
            suffixIcon: IconButton(
              icon: Icon(
                  passwordVisible ? Icons.visibility_off : Icons.visibility),
              onPressed: () {
                setState(
                  () {
                    passwordVisible = !passwordVisible;
                  },
                );
              },
            ),
            alignLabelWithHint: false,
          ),
        ),
      ],
    );
  }
}
