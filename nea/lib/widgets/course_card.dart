import 'package:flutter/material.dart';
import 'package:nea/widgets/header_6.dart';
import 'package:nea/constants.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/header_6.dart';
import 'package:nea/widgets/sub_title.dart';

class CourseCard extends StatelessWidget {
  final String image, title;
  final String? description;

  const CourseCard(
      {super.key, required this.image, required this.title, this.description});

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
            Center(
              child: ClipRRect(
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(20.0),
                    topRight: Radius.circular(20.0)),
                child: Image.asset(
                  image,
                  fit: BoxFit.fill,
                  height: 130,
                  width: 200,
                ),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Container(
                padding: const EdgeInsets.only(left: 10.0, right: 2),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Header6(
                      text: title,
                      color: primaryColor,
                    ),
                    Visibility(
                      visible: description != null ? true : false,
                      child: SubTitle(
                        text: description ?? '',
                        color: const Color(0xffA6ABB4),
                      ),
                    )
                  ],
                )),
            SizedBox(
              height: ResponsiveWidget.isSmallScreen(context) ? 10 : 15,
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
