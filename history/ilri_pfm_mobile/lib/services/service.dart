import 'package:dio/dio.dart';

abstract class Service<T> {
  Future<Response> get();

  Future<Response?> getById(int id);

  Future<void> post(T model);

  Future<void> update(T model);

  Future<void> delete(int id);
}
