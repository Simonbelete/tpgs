import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ilri_pfm/util/dio_client.dart';

class ChickenService {
  final String _url = '/chickens';
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

  Future<Response> post(Map<String, dynamic> data) async {
    return await _dio.post(
      '$_url/',
      data: data,
      options: Options(
        headers: {
          Headers.wwwAuthenticateHeader:
              await _auth.currentUser?.getIdToken(), // set content-length
        },
      ),
    );
  }

  Future<Response> patch(
      {required int id, required Map<String, dynamic> data}) async {
    return await _dio.patch(
      '$_url/$id/',
      data: data,
      options: Options(
        headers: {
          Headers.wwwAuthenticateHeader:
              await _auth.currentUser?.getIdToken(), // set content-length
        },
      ),
    );
  }

  // Growth
  Future<Response> getGrowthAll(
      {required int id, Map<String, dynamic>? query}) async {
    try {
      final response = await _dio.get(
        '$_url/$id/growth/all',
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
