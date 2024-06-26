import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/feed_type.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/feed_type_service.dart';

class FeedTypeRepository extends Repository {
  final FeedTypeService _service = FeedTypeService();

  Future<List<FeedType>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await _service.get(query: query);
      return response.data['results']
          .map<FeedType>((e) => FeedType.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<FeedType?> create(FeedType data) async {
    try {
      final response = await _service.post(data.toJson());
      return FeedType.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<FeedType?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return FeedType.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<FeedType?> updateState({required int id, bool state = false}) async {
    try {
      final response = await _service.patch(id: id, data: {'is_active': state});
      return FeedType.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
