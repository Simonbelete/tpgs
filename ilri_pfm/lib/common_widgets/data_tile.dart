import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';

class DataTile extends StatelessWidget {
  final String title;
  final VoidCallback? onTab;

  const DataTile({super.key, required this.title, this.onTab});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return InkWell(
      onTap: onTab,
      child: Container(
        width: size.width * 0.8,
        padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
        decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(
              color: Color(0xffE3E3E5),
            ),
            borderRadius: BorderRadius.circular(10.0)),
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [TitleText(text: title)]),
      ),
    );
  }
}
