import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/repository/chicken_stage_repository.dart';

class ChickenStageDropdownSearch extends StatelessWidget {
  final Function(ChickenStage? data) onChange;

  const ChickenStageDropdownSearch({super.key, required this.onChange});

  @override
  Widget build(BuildContext context) {
    return DropdownSearch<ChickenStage>(
        popupProps: const PopupProps.modalBottomSheet(
          showSearchBox: true,
        ),
        dropdownDecoratorProps: const DropDownDecoratorProps(
          dropdownSearchDecoration: InputDecoration(
            labelText: "Chicken Stage",
            hintText: "Select Chicken Stage",
          ),
        ),
        asyncItems: (String filter) async {
          return await ChickenStageRepository().get(query: {'name': filter}) ??
              [];
        },
        itemAsString: (ChickenStage u) => u.name,
        onChanged: onChange);
  }
}
