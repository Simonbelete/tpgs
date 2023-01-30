import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ilri_pfm/util/dio_client.dart';

class LayedPlaceService {
  final String _url = '/layed-places';
  final Dio _dio = dioClient;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<Response> get({Map<String, dynamic>? query}) async {
    try {
      final response = await _dio.get(
        _url,
        queryParameters: query ?? {},
        options: Options(
          headers: {
            Headers.wwwAuthenticateHeader:
                await _auth.currentUser?.getIdToken(), // set content-length
          },
        ),
      );
      return response;
    } catch (e) {
      rethrow;
    }
  }
}
