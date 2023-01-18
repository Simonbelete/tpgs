class EmailExistsException implements Exception {
  final String? message;

  EmailExistsException(
      {this.message = 'The account already exists for that email.'});
}
