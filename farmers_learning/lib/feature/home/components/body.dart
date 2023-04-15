import 'package:flutter/material.dart';
import 'package:ilri/widgets/category_list.dart';
import 'package:ilri/feature/home/components/popular_cource_list.dart';
import 'package:ilri/feature/home/components/search_header.dart';

class Body extends StatelessWidget {
  const Body({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: const <Widget>[
          SearchHeader(),
          SizedBox(
            height: 10,
          ),
          CategoryList(),
          PopularCourceList()
        ],
      ),
    );
  }
}
