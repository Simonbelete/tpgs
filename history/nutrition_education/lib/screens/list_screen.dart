import 'dart:html';

import 'package:flutter/material.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/model/nutrient_model.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/title_text.dart';

class ListScreen extends StatelessWidget {
  static const routeName = '/list-screen';
  final Nutrient nutrient;
  const ListScreen({super.key, required this.nutrient});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        body: ResponsiveWidget.isSmallScreen(context)
            ? body(context)
            : desktopBody(context));
  }

  Widget body(BuildContext context) {
    return CustomScrollView(slivers: [
      SliverAppBar(
        pinned: false,
        snap: false,
        floating: true,
        leading: Container(
          margin: EdgeInsets.all(10.0),
          decoration: BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                spreadRadius: 2,
                blurRadius: 7,
                offset: Offset(0, 3), // changes position of shadow
              ),
            ],
          ),
          child: InkWell(
            child: Icon(Icons.arrow_back, color: primaryColor),
            onTap: () => Navigator.of(context).pop(),
          ),
        ),
        expandedHeight: 250,
        flexibleSpace: FlexibleSpaceBar(
            background: Image.asset(
          'assets/materials/vitamind_opengraph.jpg',
          fit: BoxFit.fill,
        )),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(0),
          child: Container(
            padding: EdgeInsets.only(top: 30.0),
            width: double.maxFinite,
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(50.0),
                  topRight: Radius.circular(50.0)),
            ),
            child: Column(children: []),
          ),
        ),
      ),
      SliverToBoxAdapter(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0.0),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            TitleText(text: nutrient.name),
            const SizedBox(
              height: 30.0,
            ),
            nutrient.body,
            const SizedBox(
              height: 30.0,
            ),
          ]),
        ),
      )
    ]);
  }

  Widget desktopBody(BuildContext context) {
    return Center(
      child: AspectRatio(
        aspectRatio: 12 / 9,
        child: CustomScrollView(slivers: [
          SliverAppBar(
            pinned: false,
            snap: false,
            floating: true,
            leading: Container(
              margin: EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 7,
                    offset: Offset(0, 3), // changes position of shadow
                  ),
                ],
              ),
              child: InkWell(
                child: Icon(Icons.arrow_back, color: primaryColor),
                onTap: () => Navigator.of(context).pop(),
              ),
            ),
            expandedHeight: 450,
            flexibleSpace: FlexibleSpaceBar(
                background: Image.asset(
              'assets/materials/vitamind_opengraph.jpg',
              fit: BoxFit.fill,
              width: 200,
            )),
            bottom: PreferredSize(
              preferredSize: Size.fromHeight(0),
              child: Container(
                padding: EdgeInsets.only(top: 30.0),
                width: double.maxFinite,
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(50.0),
                      topRight: Radius.circular(50.0)),
                ),
                child: Column(children: []),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0.0),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TitleText(text: nutrient.name),
                    const SizedBox(
                      height: 30.0,
                    ),
                    nutrient.body,
                    const SizedBox(
                      height: 30.0,
                    ),
                  ]),
            ),
          )
        ]),
      ),
    );
  }
}
