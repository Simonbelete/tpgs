import 'package:flutter/material.dart';
import 'package:ilri/models/course.dart';
import 'package:ilri/widgets/body_text.dart';
import 'package:ilri/widgets/custom_button.dart';
import 'package:ilri/widgets/subtitle_text.dart';
import 'package:ilri/widgets/circular_favorite_icon.dart';
import 'package:ilri/screens/course_detail_screen.dart';

class CourceCardList extends StatelessWidget {
  final Course course;

  const CourceCardList({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return Card(
        margin: EdgeInsets.only(bottom: 40),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        elevation: 10,
        color: Colors.white,
        child: Container(
            padding: const EdgeInsets.all(5),
            height: 130,
            child: Row(
              children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: Image.asset(
                    course.coverImage,
                    height: 120,
                    width: 120,
                    fit: BoxFit.fill,
                  ),
                ),
                Expanded(
                    child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                  padding: const EdgeInsets.only(top: 8),
                                  child: SubtitleText(text: course.title)),
                              // const CircularFavoriteIcon()
                            ],
                          ),
                          // Row(
                          //   children: [
                          //     SizedBox(
                          //       width: 200,
                          //       child: Text(
                          //         course.description,
                          //         maxLines: 3,
                          //         style: const TextStyle(
                          //             fontSize: 12.0,
                          //             overflow: TextOverflow.ellipsis),
                          //       ),
                          //     )
                          //   ],
                          // ),
                        ],
                      ),
                      Row(
                        children: [
                          Expanded(child: CustomButton(onPressed: () {
                            Navigator.pushNamed(context, CourseDetail.routeName,
                                arguments: course);
                          }))
                        ],
                      )
                    ],
                  ),
                ))
              ],
            )));
  }
}
