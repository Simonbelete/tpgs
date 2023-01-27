class Farm {
  final String name;
  final bool? is_active;

  Farm({required this.name, this.is_active = false});

  factory Farm.fromJson(Map<String, dynamic> data) {
    return Farm(name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'name': name,
      };
}
