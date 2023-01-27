import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/data_tile.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';

class FarmList extends StatelessWidget {
  const FarmList({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child:
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
        TitleText(text: 'Farms'),
        SizedBox(
          height: 20,
        ),
        DataTile(),
        SizedBox(
          height: 20,
        ),
        DataTile()
      ]),
    );
  }
}
