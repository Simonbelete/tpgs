import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/common_widgets/panel_card.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/screens/weight_report_screen.dart';
import 'package:ilri_pfm/screens/weight_screen.dart';

class ChickenPanel extends StatelessWidget {
  final Chicken chicken;

  const ChickenPanel({super.key, required this.chicken});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [TitleText(text: chicken.tag)],
        ),
        const SizedBox(
          height: 30,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            InkWell(
              onTap: () {},
              child: const PanelCard(
                icon: 'assets/icons/chicken.svg',
                text: 'Detail',
              ),
            ),
            InkWell(
              onTap: () {},
              child: const PanelCard(
                icon: 'assets/icons/chicken_easter.svg',
                text: 'Egg Production',
              ),
            ),
          ],
        ),
        const SizedBox(
          height: 30,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            InkWell(
              onTap: () {
                Navigator.pushNamed(context, WeightScreen.routeName,
                    arguments: chicken);
              },
              child: const PanelCard(
                icon: 'assets/icons/scale.svg',
                text: 'Weight Record',
              ),
            ),
            InkWell(
              onTap: () {},
              child: const PanelCard(
                icon: 'assets/icons/christmas_present_sack.svg',
                text: 'Feed Record',
              ),
            ),
          ],
        ),
        const SizedBox(
          height: 30,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            InkWell(
              onTap: () {
                Navigator.pushNamed(context, WeightReportScreen.routeName,
                    arguments: 1);
              },
              child: const PanelCard(
                icon: 'assets/icons/report_barchart.svg',
                text: 'Report',
              ),
            ),
          ],
        ),
      ],
    );
  }
}
