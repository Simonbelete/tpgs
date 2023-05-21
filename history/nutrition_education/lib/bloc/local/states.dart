class LocalState {
  String local;

  LocalState({required this.local});

  String getName() {
    if (local == 'en') {
      return 'English';
    } else if (local == 'am') {
      return 'አማርኛ';
    } else if (local == 'sw') {
      return 'Swahili';
    }
    return 'English';
  }

  Map<String, dynamic> toJson() => {'local': local};
}
