class BreedType {
  final int? id;
  final String name;
  final String? color;
  final bool? is_active;

  BreedType({this.id, required this.name, this.is_active, this.color});

  factory BreedType.fromJson(Map<String, dynamic> data) {
    return BreedType(
        id: data['id'],
        name: data['name'],
        color: data['color'],
        is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() =>
      {"name": name, 'color': color, 'is_active': is_active};
}
