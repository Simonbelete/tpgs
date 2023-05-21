import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/weight_model.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/weight_service.dart';

class WeightRepository extends Repository {
  final WeightService _service = WeightService();

  Future<List<Weight>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await _service.get(query: query);
      return response.data['results']
          .map<Weight>((e) => Weight.fromJson(e))
          .toList();
    } catch (e) {
      print(e.toString());
      return [];
    }
  }

  Future<Weight?> create(Weight weight) async {
    try {
      final response = await _service.post(weight.toJson());
      return Weight.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Weight?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return Weight.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Weight?> updateState({required int id, bool state = false}) async {
    try {
      final response = await _service.patch(id: id, data: {'is_active': state});
      return Weight.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
