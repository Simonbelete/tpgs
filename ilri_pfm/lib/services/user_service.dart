import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/device_model.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/services/service.dart';
import 'package:ilri_pfm/util/dio_client.dart';

class UserService {
  final String _url = '/users/';
  final String _uidUrl = '/users/uid';
  final Dio _dio = dioClient;

  Future<Response> getByUid(String uid) async {
    try {
      return await _dio.get('$_uidUrl/$uid/');
    } catch (e) {
      rethrow;
    }
  }

  Future<Response> get({Map<String, dynamic>? query}) async {
    try {
      final response = await _dio.get(_url, queryParameters: query ?? {});
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<Response> post(
      {required UserModel user, required Device devices}) async {
    print('======================================');
    print(user.toJson());
    try {
      final response = await _dio.post(_url,
          data: jsonEncode({
            ...user.toJson(),
            'devices': [devices.toJson()]
          }));
      return response;
    } catch (e) {
      rethrow;
    }
  }
}
