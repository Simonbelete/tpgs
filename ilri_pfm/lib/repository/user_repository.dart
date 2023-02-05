import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/user_service.dart';
import 'package:ilri_pfm/models/user_model.dart';

class UserRepository extends Repository {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final UserService _service = UserService();

  Future<List<UserModel>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await _service.get(query: query);
      return response.data['results']
          .map<UserModel>((e) => UserModel.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<UserModel?> getByUid() async {
    try {
      final User? user = _auth.currentUser;
      if (user == null) throw Exception('User not Loged In ');
      final Response response = await _service.getByUid(user.uid);
      return UserModel.fromJson(response.data);
    } catch (e) {
      return null;
    }
  }

  Future<int> count() async {
    try {
      final Response response = await _service.getAllCount();
      return response.data['results']['count'];
    } catch (e) {
      return 0;
    }
  }
}
