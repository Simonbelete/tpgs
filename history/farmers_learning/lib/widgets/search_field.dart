import 'package:flutter/material.dart';
import 'package:ilri/feature/search/search_screen.dart';
import 'package:ilri/utils/color.dart';

class SearchField extends StatefulWidget {
  const SearchField({super.key});

  @override
  State<SearchField> createState() => _SearchFieldState();
}

class _SearchFieldState extends State<SearchField> {
  void navigateToSearchScreen(String query) {
    Navigator.pushNamed(context, SearchScreen.routeName, arguments: query);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 38,
      child: Material(
        borderRadius: BorderRadius.circular(7),
        elevation: 5,
        child: TextFormField(
          onFieldSubmitted: navigateToSearchScreen,
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
                child: const Padding(
                  padding: EdgeInsets.only(left: 6),
                  child: Icon(Icons.search, color: primaryColor, size: 30),
                ),
              )),
        ),
      ),
    );
  }
}
