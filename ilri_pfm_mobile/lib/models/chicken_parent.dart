import 'package:ilri_pfm/models/chicken.dart';

class ChickenParent {
  final Chicken? mother;
  final Chicken? father;
  final bool? is_active;

  ChickenParent({this.is_active = false, this.mother, this.father});

  factory ChickenParent.fromJson(Map<String, dynamic> data) {
    return ChickenParent(is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'is_active': is_active,
      };
}
