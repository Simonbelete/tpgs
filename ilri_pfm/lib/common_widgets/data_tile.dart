import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';

class DataTile extends StatelessWidget {
  const DataTile({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Container(
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
          children: [Text('Name')]),
    );
  }
}
