class BreedType {
  final String name;

  BreedType({required this.name});

  factory BreedType.fromJson(Map<String, dynamic> data) {
    return BreedType(name: data['name']);
  }

  Map<String, dynamic> toJson() => {
        "name": name,
      };
}
