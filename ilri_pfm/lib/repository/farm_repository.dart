import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/farm_service.dart';

class FarmRepository extends Repository {
  Future<List<Farm>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await FarmService().get(query: query);
      print(response);
      return response.data['results']
          .map<Farm>((e) => Farm.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }
}
