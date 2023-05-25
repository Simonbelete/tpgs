import 'package:flutter/material.dart';

class ColorTable extends StatelessWidget {
  final List<List<Widget>> children;
  const ColorTable({super.key, required this.children});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Center(
      child: Container(
          child: Table(
        defaultColumnWidth:
            FixedColumnWidth((size.width * 0.9) / children[0].length),
        border: TableBorder.all(
            color: Colors.black, style: BorderStyle.solid, width: 1),
        children: children.map((e) => TableRow(children: e)).toList(),
      )),
    );
  }
}
