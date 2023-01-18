import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/auth/events.dart';
import 'package:ilri_pfm/blocs/auth/states.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/repository/repository.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationRepository repository = AuthenticationRepository();

  AuthenticationBloc() : super(UnAuthenticated()) {
    on<SignInWithEmailAndPassword>((event, emit) async {
      emit(AuthenticationLoading());
      try {
        await repository.signIn(email: '', password: 'password');
      } catch (e) {
        emit(AuthenticationError(e.toString()));
        // emit(UnAuthenticated());
      }
    });
  }
}
