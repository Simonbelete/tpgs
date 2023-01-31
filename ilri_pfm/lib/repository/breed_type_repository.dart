import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/breed_type_service.dart';

class BreedTypeRepository extends Repository {
  final BreedTypeService _service = BreedTypeService();

  Future<List<BreedType>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await BreedTypeService().get(query: query);
      return response.data['results']
          .map<BreedType>((e) => BreedType.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<BreedType?> create(BreedType layedPlace) async {
    try {
      final response = await _service.post(layedPlace.toJson());
      return BreedType.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<BreedType?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return BreedType.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<BreedType?> updateState({required int id, bool state = false}) async {
    try {
      final response = await _service.patch(id: id, data: {'is_active': state});
      return BreedType.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
