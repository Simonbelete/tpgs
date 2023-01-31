import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/farm_service.dart';

class FarmRepository extends Repository {
  final FarmService _service = FarmService();

  Future<List<Farm>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await _service.get(query: query);
      return response.data['results']
          .map<Farm>((e) => Farm.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<Farm?> create(Farm farm) async {
    try {
      final response = await _service.post(farm.toJson());
      return Farm.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Farm?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return Farm.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
