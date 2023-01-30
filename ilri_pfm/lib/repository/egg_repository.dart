import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/egg.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/egg_service.dart';

class EggRepository extends Repository {
  Future<List<Egg>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await EggService().get(query: query);
      return response.data['results']
          .map<Egg>((e) => Chicken.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }
}
