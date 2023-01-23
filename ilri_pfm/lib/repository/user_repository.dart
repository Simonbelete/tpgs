import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/user_service.dart';
import 'package:ilri_pfm/models/user_model.dart';

class UserRepository extends Repository {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final UserService _service = UserService();

  Future<UserModel> getByUid() async {
    try {
      final User? user = _auth.currentUser;
      if (user == null) throw Exception('User not Loged In ');
      final Response response = await _service.getByUid(user.uid);
      return UserModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
