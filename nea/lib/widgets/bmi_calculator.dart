import 'package:flutter/material.dart';

class BmiCalculator extends StatefulWidget {
  const BmiCalculator({super.key});

  @override
  State<BmiCalculator> createState() => _BmiCalculatorState();
}

class _BmiCalculatorState extends State<BmiCalculator> {
  int height = 0;
  int weight = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [
        Row(
          children: [
            TextField(
              decoration: const InputDecoration(labelText: "Enter your Height"),
              keyboardType: TextInputType.number,
              onChanged: (value) {
                height = int.parse(value);
              },
            ),
          ],
        )
      ],
    ));
    // return Container(
    //   child: Column(
    //     children: [
    //       Row(
    //         children: [
    //           TextField(
    //             decoration:
    //                 const InputDecoration(labelText: "Enter your Height"),
    //             keyboardType: TextInputType.number,
    //             onChanged: (value) {
    //               height = int.parse(value);
    //             },
    //           ),
    //           TextField(
    //             decoration:
    //                 const InputDecoration(labelText: "Enter your Weight"),
    //             keyboardType: TextInputType.number,
    //             onChanged: (value) {
    //               weight = int.parse(value);
    //             },
    //           )
    //         ],
    //       ),
    //       ElevatedButton(onPressed: () {}, child: const Text('Calcuate'))
    //     ],
    //   ),
    // );
  }
}
