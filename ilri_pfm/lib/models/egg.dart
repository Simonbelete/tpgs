import 'package:ilri_pfm/models/chicken.dart';

class Egg {
  final Chicken chicken;
  final Chicken? mother;
  final int week;
  final bool? is_double_yolk;
  final DateTime date_of_hatch;
  final double? weight;
  final bool? is_active;

  Egg(
      {required this.chicken,
      this.mother,
      required this.week,
      this.is_double_yolk,
      required this.date_of_hatch,
      this.weight,
      this.is_active = false});

  factory Egg.fromJson(Map<String, dynamic> data) {
    return Egg(
        chicken: data['chicken'],
        week: data['week'],
        date_of_hatch: data['date_of_hatch'],
        is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'chicken': chicken,
        'week': week,
        'date_of_hatch': date_of_hatch,
        'is_active': is_active
      };
}
