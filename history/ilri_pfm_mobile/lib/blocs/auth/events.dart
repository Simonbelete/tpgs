import 'package:equatable/equatable.dart';

abstract class AuthenticationEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class SignInWithEmailAndPassword extends AuthenticationEvent {
  final String email, password;

  SignInWithEmailAndPassword(this.email, this.password);
}

class GoogleSignIn extends AuthenticationEvent {}

class SignOut extends AuthenticationEvent {}
