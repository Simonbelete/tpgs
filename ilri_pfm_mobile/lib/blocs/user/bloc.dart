import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/user/events.dart';
import 'package:ilri_pfm/blocs/user/states.dart';
import 'package:ilri_pfm/models/user_model.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(UserState(user: UserModel(email: ""))) {
    on<UserInit>(
      (event, emit) {
        emit(UserState(user: event.user));
      },
    );
  }
}
