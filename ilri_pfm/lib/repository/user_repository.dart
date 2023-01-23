import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/user_service.dart';
import 'package:ilri_pfm/models/user_model.dart';

class UserRepository extends Repository {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final UserService _service = UserService();

  Future<UserModel?> getByUid() async {
    try {
      final User? user = _auth.currentUser;
      if (user == null) throw Exception('User not Loged In ');
      final Response response = await _service.getByUid(user.uid);
      return UserModel.fromJson(response.data);
    } on DioError catch (e) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx and is also not 304.
      if (e.response != null) {
        print(e.response?.data);
        print(e.response?.headers);
        print(e.response?.requestOptions);
      } else {
        // Something happened in setting up or sending the request that triggered an Error
        print(e.requestOptions);
        print(e.message);
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
