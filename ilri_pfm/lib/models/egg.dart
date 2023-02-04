import 'package:intl/intl.dart';
import 'package:ilri_pfm/models/chicken.dart';

class Egg {
  final int? id;
  final DateTime date;
  final int? chicken_id;
  final Chicken? chicken;
  final Chicken? mother;
  final bool? is_double_yolk;
  final double? weight;
  final bool? is_active;

  Egg(
      {this.id,
      required this.date,
      this.chicken_id,
      this.chicken,
      this.mother,
      this.is_double_yolk,
      this.weight,
      this.is_active = false});

  factory Egg.fromJson(Map<String, dynamic> data) {
    return Egg(
        id: data['id'],
        date: data['date'],
        chicken: data['chicken'],
        is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'date': DateFormat('yyyy-MM-dd').format(date),
        'chicken_id': chicken_id,
        'chicken': chicken?.toJson(),
        'is_active': is_active
      };
}
