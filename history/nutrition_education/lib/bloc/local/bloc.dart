import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'events.dart';
import 'states.dart';
import '../../utils/preferencess.dart';

class LocalBloc extends Bloc<LocalEvent, LocalState> {
  LocalBloc() : super(LocalState(local: 'en')) {
    on<LocalInit>((event, emit) async {
      var sh_local = await Preferencess.getLocal();
      String value = 'en';
      if (sh_local != null) value = sh_local;
      emit(LocalState(local: value));
    });
    on<SetLocal>((event, emit) => emit(LocalState(local: event.local)));
  }
}
