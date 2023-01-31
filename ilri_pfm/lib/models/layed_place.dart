class LayedPlace {
  final int? id;
  final String name;
  final bool? is_active;

  LayedPlace({this.id, required this.name, this.is_active});

  factory LayedPlace.fromJson(Map<String, dynamic> data) {
    return LayedPlace(name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'name': name,
      };
}
