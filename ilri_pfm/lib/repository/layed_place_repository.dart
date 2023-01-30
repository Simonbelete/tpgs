import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/layed_place.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/layed_place_service.dart';

class LayedPlaceRepository extends Repository {
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
}
