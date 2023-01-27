import 'package:ilri_pfm/models/farm_model.dart';

class FarmState {
  Farm? farm;

  FarmState(this.farm);

  Map<String, dynamic> toJson() => {'farm': farm != null ? farm!.toJson() : {}};
}
