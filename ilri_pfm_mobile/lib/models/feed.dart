import 'package:intl/intl.dart';
import 'package:ilri_pfm/models/chicken.dart';

class Feed {
  final int? id;
  final Chicken chicken;
  final DateTime date;
  final double weight;

  Feed(
      {this.id,
      required this.chicken,
      required this.date,
      required this.weight});

  factory Feed.fromJson(Map<String, dynamic> data) {
    return Feed(
        id: data['id'],
        chicken: Chicken.fromJson(data['chicken']),
        date: DateTime.parse(data['date']),
        weight: double.parse(data['weight']));
  }

  Map<String, dynamic> toJson() => {
        'date': DateFormat('yyyy-MM-dd').format(date),
        'chicken': chicken.toJson(),
        'weight': weight
      };
}
