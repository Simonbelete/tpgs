import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/egg.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/egg_service.dart';

class EggRepository extends Repository {
  final EggService _service = EggService();

  Future<List<Egg>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await _service.get(query: query);
      return response.data['results']
          .map<Egg>((e) => Chicken.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<Egg?> create(Egg egg) async {
    try {
      final response = await _service.post(egg.toJson());
      return Egg.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
