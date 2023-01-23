import 'package:ilri_pfm/models/user_model.dart';

class UserState {
  UserModel? user;

  UserState({required this.user});

  Map<String, dynamic> toJson() => user != null ? user!.toJson() : {};
}
