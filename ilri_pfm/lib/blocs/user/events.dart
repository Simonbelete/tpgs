import 'package:ilri_pfm/models/user_model.dart';

abstract class UserEvent {}

class UserInit extends UserEvent {
  UserModel? user;

  UserInit(this.user);
}
