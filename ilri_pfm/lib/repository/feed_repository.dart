import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/feed.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/breed_type_service.dart';

class FeedRepository extends Repository {
  final BreedTypeService _service = BreedTypeService();

  Future<List<Feed>>? get({Map<String, dynamic>? query}) async {
    try {
      final Response response = await BreedTypeService().get(query: query);
      return response.data['results']
          .map<Feed>((e) => Feed.fromJson(e))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<Feed?> create(Feed data) async {
    try {
      final response = await _service.post(data.toJson());
      return Feed.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Feed?> patch(
      {required int id, required Map<String, dynamic> data}) async {
    try {
      final response = await _service.patch(id: id, data: data);
      return Feed.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Feed?> updateState({required int id, bool state = false}) async {
    try {
      final response = await _service.patch(id: id, data: {'is_active': state});
      return Feed.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
