import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/repository/chicken_repository.dart';

class ChickenDropdownSearch extends StatelessWidget {
  final String? title;
  final String? labelText;
  final String? hintText;
  final Function(Chicken? data) onChange;

  const ChickenDropdownSearch(
      {super.key,
      required this.onChange,
      this.title,
      this.hintText,
      this.labelText});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Text(
            title ?? '',
            style:
                GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 13.0),
          ),
        ),
        const SizedBox(
          height: 5,
        ),
        DropdownSearch<Chicken>(
          popupProps: const PopupProps.modalBottomSheet(
            showSearchBox: true,
          ),
          dropdownDecoratorProps: DropDownDecoratorProps(
            dropdownSearchDecoration: InputDecoration(
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 15, vertical: 0),
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(6.0),
                  borderSide: const BorderSide(
                      color: Color.fromARGB(255, 224, 225, 228))),
              labelText: labelText ?? "Chicken",
              hintText: hintText ?? "Select chicken",
            ),
          ),
          asyncItems: (String filter) async {
            return await ChickenRepository().get(query: {'tag': filter}) ?? [];
          },
          itemAsString: (Chicken u) => u.tag,
          onChanged: onChange,
        ),
      ],
    );
  }
}
