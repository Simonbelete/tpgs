import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/weight_model.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/chicken_service.dart';

class ChickenRepository extends Repository {
  Future<List<Chicken>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await ChickenService().get(query: query);
      print('00');
      print(response);
      return response.data['results']
          .map<Chicken>((e) => Chicken.fromJson(e))
          .toList();
    } catch (e) {
      print(e.toString());
      return [];
    }
  }

  Future<List<Weight>>? getGrowthAll(
      {required int id, Map<String, dynamic>? query}) async {
    try {
      final Response response =
          await ChickenService().getGrowthAll(id: id, query: query);
      return response.data['results']
          .map<Weight>((e) => Weight.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }
}
