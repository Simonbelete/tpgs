import 'package:ilri_pfm/models/chicken.dart';

class Egg {
  final int? id;
  final DateTime date;
  final Chicken chicken;
  final Chicken? mother;
  final bool? is_double_yolk;
  final double? weight;
  final bool? is_active;

  Egg(
      {this.id,
      required this.date,
      required this.chicken,
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

  Map<String, dynamic> toJson() => {'chicken': chicken, 'is_active': is_active};
}
