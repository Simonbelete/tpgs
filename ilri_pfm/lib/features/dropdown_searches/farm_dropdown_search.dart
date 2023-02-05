import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/farm_repository.dart';

class FarmDropdownSearch extends StatelessWidget {
  final String? title;
  final String? labelText;
  final String? hintText;
  final Function(Farm? data) onChange;

  const FarmDropdownSearch(
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
        DropdownSearch<Farm>(
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
            return await FarmRepository().get(query: {'name': filter}) ?? [];
          },
          itemAsString: (Farm u) => u.name,
          onChanged: onChange,
        ),
      ],
    );
  }
}
