import 'package:flutter/material.dart';
import 'package:nea/widgets/paragraph.dart';

class Remember extends StatelessWidget {
  final List<String> children;
  final String? title;
  const Remember({super.key, required this.children, this.title = 'REMEMBER'});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20.0),
      child: Container(
        decoration: BoxDecoration(
            color: const Color(0xff79211C),
            borderRadius: BorderRadius.circular(10.0)),
        padding: const EdgeInsets.only(
          bottom: 0,
          top: 10,
          left: 10,
          right: 10,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SelectableText.rich(
              TextSpan(
                text: title! + " :- ",
                style: Theme.of(context).textTheme.bodyMedium!.apply(
                      fontSizeDelta: 1,
                      fontWeightDelta: 500,
                      color: Colors.white,
                    ),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            ...buildBullet(context)
          ],
        ),
      ),
    );
  }

  buildBullet(BuildContext context) {
    return children
        .map(
          (e) => Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '•  ',
                style: TextStyle(color: Colors.white),
              ),
              Expanded(
                  // width: size.width * 0.85,
                  child: RichText(
                text: TextSpan(
                    text: e + "\n",
                    style: Theme.of(context).textTheme.bodyMedium!.apply(
                          fontSizeDelta: 1,
                          color: Colors.white,
                        )),
              ))
            ],
          ),
        )
        .toList();
  }

  // @override
  // Widget build(BuildContext context) {
  //   return Padding(
  //     padding: const EdgeInsets.only(bottom: 20.0),
  //     child: Container(
  //       width: double.infinity,
  //       decoration: BoxDecoration(
  //           // color: Color(0xff6DA82F),
  //           color: const Color(0xffF7A56D),
  //           borderRadius: BorderRadius.circular(10.0)),
  //       padding: const EdgeInsets.only(
  //         bottom: 0,
  //         top: 10,
  //         left: 10,
  //         right: 10,
  //       ),
  //       child: Column(
  //         crossAxisAlignment: CrossAxisAlignment.start,
  //         children: [
  //           SelectableText.rich(
  //             TextSpan(
  //               text: title! + " :- ",
  //               style: Theme.of(context).textTheme.bodyMedium!.apply(
  //                     fontSizeDelta: 1,
  //                     fontWeightDelta: 500,
  //                     color: Colors.white,
  //                   ),
  //             ),
  //           ),
  //           const SizedBox(
  //             height: 10,
  //           ),
  //           Padding(
  //             padding: EdgeInsets.only(left: 15),
  //             child: SelectableText.rich(TextSpan(
  //               children: children
  //                   .map(
  //                     (e) => TextSpan(
  //                         text: "• " + e + "\n",
  //                         style: Theme.of(context).textTheme.bodyMedium!.apply(
  //                               fontSizeDelta: 1,
  //                               color: Colors.white,
  //                             )),
  //                   )
  //                   .toList(),
  //             )),
  //           ),
  //         ],
  //       ),
  //     ),
  //   );
  // }
}
