import 'package:dio/dio.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/services/breed_type_report_service.dart';

class BreedTypeReportRepository extends Repository {
  final BreedTypeReportService _service = BreedTypeReportService();

  Future<Map<String, dynamic>>? getPercentage(
      {Map<String, dynamic>? query}) async {
    try {
      final Response response = await _service.get(query: query);
      final result = response.data['results']
          .map<BreedType>((e) => BreedType.fromJson(e))
          .toList();
      return {'data': result, 'count': response.data['chicken_count']};
    } catch (e) {
      print(e.toString());
      return {'data': [], 'count': 0};
    }
  }
}
