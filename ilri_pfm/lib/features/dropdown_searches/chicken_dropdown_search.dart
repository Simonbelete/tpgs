import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/repository/chicken_repository.dart';

class ChickenDropdownSearch extends StatelessWidget {
  final Function(Chicken? data) onChange;

  const ChickenDropdownSearch({super.key, required this.onChange});

  @override
  Widget build(BuildContext context) {
    return DropdownSearch<Chicken>(
      popupProps: const PopupProps.modalBottomSheet(
        showSearchBox: true,
      ),
      dropdownDecoratorProps: const DropDownDecoratorProps(
        dropdownSearchDecoration: InputDecoration(
          labelText: "Chicken",
          hintText: "Select chicken",
        ),
      ),
      asyncItems: (String filter) async {
        return await ChickenRepository().get(query: {'tag': filter}) ?? [];
      },
      itemAsString: (Chicken u) => u.tag,
      onChanged: onChange,
    );
  }
}
