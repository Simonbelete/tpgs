import 'package:equatable/equatable.dart';

abstract class AuthenticationState extends Equatable {}

class AuthenticationLoading extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class Authenticated extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class UnAuthenticated extends AuthenticationState {
  @override
  List<Object?> get props => [];
}

class AuthenticationError extends AuthenticationState {
  final String error;

  AuthenticationError(this.error);
  @override
  List<Object?> get props => [error];
}
