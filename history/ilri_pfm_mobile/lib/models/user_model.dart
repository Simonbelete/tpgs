import 'package:ilri_pfm/models/device_model.dart';

class UserModel {
  final int? id;
  final String? name;
  final String email;
  final String? uid;
  final bool? is_admin;
  final bool? is_staff;
  final bool? is_farmer;
  final bool? is_approved;
  final List<Device>? devices;

  UserModel(
      {this.id,
      this.name,
      required this.email,
      this.uid,
      this.is_admin = false,
      this.is_staff = false,
      this.is_farmer = false,
      this.is_approved = false,
      this.devices});

  factory UserModel.fromJson(Map<String, dynamic> data) {
    return UserModel(
        id: data['id'],
        email: data['email'],
        uid: data['uid'],
        is_approved: data['is_approved'],
        is_admin: data['is_admin'],
        is_farmer: data['is_farmer'],
        devices:
            data['devices'].map<Device>((e) => Device.fromJson(e)).toList());
  }

  Map<String, dynamic> toJson() => {
        "name": name,
        "email": email,
        "uid": uid,
        "is_admin": is_admin,
        "is_staff": is_staff,
        "is_farmer": is_farmer,
      };
}
