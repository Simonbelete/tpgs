import 'package:flutter/material.dart';
import 'package:ilri/widgets/headline_text.dart';
import 'package:ilri/widgets/search_field.dart';

class SearchHeader extends StatelessWidget {
  const SearchHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            HeadlineText(text: 'የሚወዱትን ኮርስ ይፈልጉ'),
            const SizedBox(
              height: 20,
            ),
            Padding(
                padding: EdgeInsets.symmetric(horizontal: 45),
                child: SearchField())
          ]),
    );
  }
}
