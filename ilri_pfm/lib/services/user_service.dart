import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/device_model.dart';
import 'package:ilri_pfm/services/service.dart';
import 'package:ilri_pfm/util/dio_client.dart';

class UserService {
  final String _url = '/users/';
  final Dio _dio = dioClient;

  Future<Response> get() async {
    try {
      final response = await _dio.get(_url);
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Response> post(
      {required String email, required Device devices}) async {
    try {
      final response = await _dio.post(_url,
          data: jsonEncode({
            'email': email,
            'is_farmer': true,
            'devices': [devices.toJson()]
          }));
      return response;
    } catch (e) {
      rethrow;
    }
  }
}
