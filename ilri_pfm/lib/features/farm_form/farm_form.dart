import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/models/farm_model.dart';

class FarmForm extends StatefulWidget {
  final Farm farm;

  const FarmForm({super.key, required this.farm});

  @override
  State<FarmForm> createState() => _FarmFormState();
}

class _FarmFormState extends State<FarmForm> {
  @override
  Widget build(BuildContext context) {
    return ContainerCard(
        child: Column(
      children: [FormTextBox(hintText: 'Name', initialValue: widget.farm.name)],
    ));
  }
}
