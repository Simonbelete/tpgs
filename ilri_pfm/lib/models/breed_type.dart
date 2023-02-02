class BreedType {
  final int? id;
  final String name;
  final String? color;
  final bool? is_active;

  // Report fields
  final int? chicken_count;

  BreedType(
      {this.id,
      required this.name,
      this.is_active,
      this.color,
      this.chicken_count});

  factory BreedType.fromJson(Map<String, dynamic> data) {
    return BreedType(
        id: data['id'],
        name: data['name'],
        color: data['color'],
        is_active: data['is_active'],
        chicken_count: data['chicken_count']);
  }

  Map<String, dynamic> toJson() =>
      {"name": name, 'color': color, 'is_active': is_active};
}
