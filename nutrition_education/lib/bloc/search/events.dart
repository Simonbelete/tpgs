abstract class SearchEvent {}

class SetSearchQuery extends SearchEvent {
  String query;

  SetSearchQuery({this.query = ''});
}
