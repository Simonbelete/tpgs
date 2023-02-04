import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/chicken_parent.dart';

class Chicken {
  final int? id;
  final String tag;
  final BreedType? breed_type;
  final String? house_no;
  final String? pen_no;
  final bool? is_active;

  Chicken({
    this.id,
    required this.tag,
    this.breed_type,
    this.house_no,
    this.pen_no,
    this.is_active = false,
  });

  factory Chicken.fromJson(Map<String, dynamic> data) {
    return Chicken(
      id: data['id'],
      tag: data['tag'],
      breed_type: data['breed_type'] != null
          ? BreedType.fromJson(data['breed_type'])
          : null,
    );
  }

  Map<String, dynamic> toJson() => {'tag': tag, 'breed_type': breed_type?.id};
}
