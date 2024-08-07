import 'package:dio/dio.dart';
import 'package:ilri_pfm/app/endpoints.dart';

Dio dioClient = Dio()
  ..options.baseUrl = Endpoints.baseUrl
  ..options.connectTimeout = Endpoints.connectionTimeout
  ..options.receiveTimeout = Endpoints.receiveTimeout
  ..options.responseType = ResponseType.json;
