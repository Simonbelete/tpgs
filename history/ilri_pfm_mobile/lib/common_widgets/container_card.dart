import 'package:flutter/material.dart';

class ContainerCard extends StatelessWidget {
  final Widget child;

  const ContainerCard({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
      decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(
            color: Color(0xffE3E3E5),
          ),
          borderRadius: BorderRadius.circular(10.0)),
      child: child,
    );
  }
}
