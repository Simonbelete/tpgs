import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/chicken_stage_service.dart';

class ChickenStageRepository extends Repository {
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
}
