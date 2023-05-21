import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'events.dart';
import 'states.dart';

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  SearchBloc() : super(SearchState(query: 'Hello')) {
    on<SetSearchQuery>(
      (event, emit) => emit(SearchState(query: event.query)),
    );
  }
}
