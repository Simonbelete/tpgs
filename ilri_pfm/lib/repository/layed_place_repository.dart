import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/layed_place.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/layed_place_service.dart';

class LayedPlaceRepository extends Repository {
  final LayedPlaceService _service = LayedPlaceService();

  Future<List<LayedPlace>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await LayedPlaceService().get(query: query);
      return response.data['results']
          .map<LayedPlace>((e) => LayedPlace.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<LayedPlace?> create(LayedPlace layedPlace) async {
    try {
      final response = await _service.post(layedPlace.toJson());
      return LayedPlace.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<LayedPlace?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return LayedPlace.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<LayedPlace?> updateState({required int id, bool state = false}) async {
    try {
      final response = await _service.patch(id: id, data: {'is_active': state});
      return LayedPlace.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
