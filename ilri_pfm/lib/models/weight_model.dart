class Weight {
  final int? id;
  final DateTime date;
  final double weight;
  final bool? is_active;

  Weight({this.id, required this.date, required this.weight, this.is_active});

  factory Weight.fromJson(Map<String, dynamic> data) {
    return Weight(
        id: data['id'],
        date: DateTime.parse(data['date']),
        weight: double.parse(data['weight']));
  }

  Map<String, dynamic> toJson() => {'date': date, 'weight': weight};
}
