import 'package:ilri_pfm/models/chicken_parent.dart';

class Chicken {
  final String name;
  final String? tag;
  final ChickenParent? parent;
  final String? house_no;
  final String? pen_no;
  final bool? is_active;

  Chicken({
    required this.name,
    this.tag,
    this.parent,
    this.house_no,
    this.pen_no,
    this.is_active = false,
  });

  factory Chicken.fromJson(Map<String, dynamic> data) {
    return Chicken(
        name: data['name'],
        tag: data['tag'],
        parent: data['parent']
            .map<ChickenParent>((e) => ChickenParent.fromJson(e))
            .toList(),
        house_no: data['house_no'],
        pen_no: data['pen_no'],
        is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'tag': tag,
        'house_no': house_no,
        'pen_no': pen_no,
        'is_active': is_active
      };
}
