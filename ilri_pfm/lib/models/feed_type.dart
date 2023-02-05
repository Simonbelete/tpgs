class FeedType {
  final int? id;
  final String name;
  final bool? is_active;

  FeedType({this.id, required this.name, this.is_active});

  factory FeedType.fromJson(Map<String, dynamic> data) {
    return FeedType(
        id: data['id'], name: data['name'], is_active: data['is_active']);
  }

  Map<String, dynamic> toJson() => {"name": name, 'is_active': is_active};
}
