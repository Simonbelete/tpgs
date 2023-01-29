import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/breed_type_service.dart';
import 'package:ilri_pfm/services/farm_service.dart';

class BreedTypeRepository extends Repository {
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
}
