import 'package:flutter/material.dart';
import 'package:nutrition_education/constants.dart';
import 'package:nutrition_education/widgets/favorit_button.dart';
import 'package:nutrition_education/widgets/header_6.dart';
import 'package:nutrition_education/widgets/sub_title.dart';

class FoodCard extends StatelessWidget {
  final String image, title;

  const FoodCard({super.key, required this.image, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(bottom: 20.0),
      width: 170,
      child: Card(
        elevation: 5,
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
        color: Colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20.0),
                  topRight: Radius.circular(20.0)),
              child: Image.asset(
                image,
                fit: BoxFit.fill,
                height: 130,
                width: 200,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Container(
                padding: const EdgeInsets.only(left: 10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Header6(
                      text: title,
                      color: primaryColor,
                    ),
                    // const SubTitle(
                    //   text: 'Description',
                    //   color: Color(0xffA6ABB4),
                    // )
                  ],
                )),
            const SizedBox(
              height: 15,
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // FavoritButton(),
                  Text(''),
                  Image.asset(
                    'assets/icons/right-arrow.png',
                    height: 26,
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
