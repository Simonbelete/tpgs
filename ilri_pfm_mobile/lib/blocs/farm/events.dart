import 'package:ilri_pfm/models/farm_model.dart';

abstract class FarmEvent {}

class FarmInit extends FarmEvent {
  Farm? farm;

  FarmInit(this.farm);
}
