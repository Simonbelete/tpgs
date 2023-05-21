class SearchState {
  String query = '';

  SearchState({required this.query});

  Map<String, dynamic> toJson() => {'query': query};
}
