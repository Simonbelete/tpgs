import 'package:flutter/material.dart';

import '../constants.dart';

class SearchBox extends StatelessWidget {
  final void Function(String query) onSubmit;
  final void Function(String value) onChange;
  const SearchBox({super.key, required this.onSubmit, required this.onChange});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      child: Material(
        borderRadius: BorderRadius.circular(7),
        elevation: 5,
        child: TextFormField(
          onChanged: onChange,
          onFieldSubmitted: onSubmit,
          decoration: InputDecoration(
              hintText: 'ፈልግ',
              hintStyle: const TextStyle(
                fontWeight: FontWeight.w500,
              ),
              filled: true,
              fillColor: Colors.white,
              contentPadding: const EdgeInsets.only(top: 10),
              border: const OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(7)),
                  borderSide: BorderSide.none),
              prefixIcon: InkWell(
                onTap: () {},
                child: Padding(
                  padding: EdgeInsets.only(left: 6),
                  child: Icon(Icons.search, color: primaryColor, size: 30),
                ),
              )),
        ),
      ),
    );
  }
}
