import 'package:dio/dio.dart';
import 'package:ilri_pfm/services/service.dart';
import 'package:ilri_pfm/util/dio_client.dart';

class FarmService {
  final String _url = '/farms';
  final Dio _dio = dioClient;

  Future<Response> get() async {
    try {
      final response = await _dio.get(_url);
      return response;
    } catch (e) {
      rethrow;
    }
  }
}
