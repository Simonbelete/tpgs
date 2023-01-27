import 'package:dio/dio.dart';
import 'package:ilri_pfm/services/service.dart';
import 'package:ilri_pfm/util/dio_client.dart';

class FarmService {
  final String _url = '/farms';
  final Dio _dio = dioClient;

  Future<Response> get({Map<String, dynamic>? query}) async {
    try {
      final response = await _dio.get(_url, queryParameters: query ?? {});
      return response;
    } catch (e) {
      rethrow;
    }
  }
}
