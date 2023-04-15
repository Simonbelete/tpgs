import 'package:flutter/material.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';

class ColorTable extends StatelessWidget {
  final List<List<Widget>> children;
  const ColorTable({super.key, required this.children});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Center(
      child: Container(
          child: Table(
        defaultColumnWidth: FixedColumnWidth(
            ResponsiveWidget.isSmallScreen(context)
                ? (size.width * 0.9) / children[0].length
                : 90),
        border: TableBorder.all(
            color: Colors.black, style: BorderStyle.solid, width: 2),
        children: children.map((e) => TableRow(children: e)).toList(),
      )),
    );
  }
}
