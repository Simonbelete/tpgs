class ChickenStage {
  final String name;
  final bool? is_active;

  ChickenStage({required this.name, this.is_active = false});

  factory ChickenStage.fromJson(Map<String, dynamic> data) {
    return ChickenStage(name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {
        'name': name,
      };
}
