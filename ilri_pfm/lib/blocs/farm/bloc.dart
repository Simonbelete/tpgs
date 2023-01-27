import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/farm/events.dart';
import 'package:ilri_pfm/blocs/farm/states.dart';
import 'package:ilri_pfm/models/farm_model.dart';

class FarmBloc extends Bloc<FarmEvent, FarmState> {
  FarmBloc() : super(FarmState(Farm(name: ''))) {
    on<FarmInit>((event, emit) async {});
  }
}
