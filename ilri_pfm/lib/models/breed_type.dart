class BreedType {
  final int? id;
  final String name;
  final bool? is_active;

  BreedType({this.id, required this.name, this.is_active});

  factory BreedType.fromJson(Map<String, dynamic> data) {
    return BreedType(
        id: data['id'], name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {"name": name, 'is_active': is_active};
}
