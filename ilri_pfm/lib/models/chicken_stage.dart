class ChickenStage {
  final int? id;
  final String name;
  final bool? is_active;

  ChickenStage({this.id, required this.name, this.is_active = false});

  factory ChickenStage.fromJson(Map<String, dynamic> data) {
    return ChickenStage(
        id: data['id'], name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {'name': name, 'is_active': is_active};
}
