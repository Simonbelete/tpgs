import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/chicken_service.dart';
import 'package:ilri_pfm/services/chicken_stage_service.dart';

class ChickenStageRepository extends Repository {
  final ChickenService _service = ChickenService();

  Future<List<ChickenStage>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await ChickenStageService().get(query: query);
      return response.data['results']
          .map<ChickenStage>((e) => ChickenStage.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<ChickenStage?> create(ChickenStage chickenStage) async {
    try {
      final response = await _service.post(chickenStage.toJson());
      return ChickenStage.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<ChickenStage?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return ChickenStage.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<ChickenStage?> updateState(
      {required int id, bool state = false}) async {
    try {
      final response = await _service.patch(id: id, data: {'is_active': state});
      return ChickenStage.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
