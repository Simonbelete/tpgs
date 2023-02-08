class WeakPasswordException implements Exception {
  final String? message;

  WeakPasswordException({this.message = 'The password provided is too weak.'});
}
