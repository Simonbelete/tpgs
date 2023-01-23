class UserModel {
  String? uid;
  bool? isVerified;
  final String? email;
  String? password;
  final String? displayName;
  final int? age;

  UserModel(
      {this.uid,
      this.email,
      this.password,
      this.displayName,
      this.age,
      this.isVerified});
}

class UserDto {}
