import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/utils/open_url.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/course_video_player.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course AM = Course(
  coverImage: 'assets/materials/school_children.png',
  title: 'ለትምህርት ቤት እድሜ ላላቸው ልጆች ጤናማ ምግብ',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    CourseVideoPlayer(video: 'assets/videos/kids_dietary_diversity.mp4'),
    InkWell(
      onTap: () {
        openUrl(
            'https://www.youtube.com/watch?v=5u9tFIXUZ00&list=PLOS5MMmDL-YfeyCd_9XH9OroWjFENho6P&index=2&ab_channel=CertaNutritio');
      },
      child: const Text(
        'ምንጭ - Youtube Certa Nutritio',
        style: TextStyle(color: Colors.blueAccent),
      ),
    ),
  ]),
);
