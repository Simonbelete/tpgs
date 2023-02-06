import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/chicken_parent.dart';
import 'package:ilri_pfm/models/farm_model.dart';

class Chicken {
  final int? id;
  final String tag;
  final String? sex;
  final BreedType? breed_type;
  final String? house_no;
  final String? pen_no;
  final Farm? farm;
  final bool? is_active;

  Chicken({
    this.id,
    required this.tag,
    this.sex,
    this.breed_type,
    this.house_no,
    this.pen_no,
    this.farm,
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

  Map<String, dynamic> toJson() => {
        'tag': tag,
        'sex': sex,
        'house_no': house_no,
        'pen_no': pen_no,
        'breed_type': breed_type?.id,
        'farm': farm?.id
      };
}
