import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/repository/breed_type_repository.dart';

class BreedTypeDropdownSearch extends StatelessWidget {
  final Function(BreedType? data) onChange;

  const BreedTypeDropdownSearch({super.key, required this.onChange});

  @override
  Widget build(BuildContext context) {
    return DropdownSearch<BreedType>(
        popupProps: const PopupProps.modalBottomSheet(
          showSearchBox: true,
        ),
        dropdownDecoratorProps: const DropDownDecoratorProps(
          dropdownSearchDecoration: InputDecoration(
            labelText: "Breed type",
            hintText: "Select Breed type",
          ),
        ),
        asyncItems: (String filter) async {
          return await BreedTypeRepository().get(query: {'name': filter}) ?? [];
        },
        itemAsString: (BreedType u) => u.name,
        onChanged: onChange);
  }
}
