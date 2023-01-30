class Farm {
  final int? id;
  final String name;
  final bool? is_active;

  Farm({this.id, required this.name, this.is_active = false});

  factory Farm.fromJson(Map<String, dynamic> data) {
    return Farm(name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'name': name,
      };
}
