import 'package:nea/service/sqlite_service.dart';

class Course {
  final int id;
  final String? coverImage;
  final String? coverImage_en;
  final String? coverImage_am;
  final String? coverImage_sw;

  final String? title_en;
  final String? title_am;
  final String? title_sw;

  final String? content_en;
  final String? content_am;
  final String? content_sw;

  // Localized Data
  String? image;
  String? title;
  String? content;

  Course(
      {required this.id,
      this.title_en,
      this.title_am,
      this.title_sw,
      this.coverImage,
      this.coverImage_en,
      this.coverImage_am,
      this.coverImage_sw,
      this.content_en,
      this.content_am,
      this.content_sw,
      this.image,
      this.title,
      this.content});

  Course withLocal(local) {
    if (local == 'en') {
      image = coverImage_en;
      title = title_en;
      content = content_en;
    } else if (local == 'am') {
      image = coverImage_am;
      title = title_am;
      content = content_am;
    } else if (local == 'sw') {
      image = coverImage_sw;
      title = title_sw;
      content = content_sw;
    }
    image = coverImage_am;
    return this;
  }

  Course.fromMap(Map<String, dynamic> item)
      : id = item["id"],
        title_en = item["title_en"],
        title_am = item["title_am"],
        title_sw = item["title_sw"],
        coverImage = item['coverImage'],
        coverImage_en = item['coverImage_en'],
        coverImage_am = item['coverImage_am'],
        coverImage_sw = item['coverImage_sw'],
        content_en = item['coverImage_en'],
        content_am = item['coverImage_am'],
        content_sw = item['coverImage_sw'];

  Map<String, Object> toMap() {
    return {
      'id': id,
      'title_en': title_en ?? "",
      'title_am': title_am ?? "",
      'title_sw': title_sw ?? "",
      'coverImage': coverImage ?? "",
      'coverImage_en': coverImage_en ?? "",
      'coverImage_am': coverImage_am ?? "",
      'coverImage_sw': coverImage_sw ?? ""
    };
  }
}
