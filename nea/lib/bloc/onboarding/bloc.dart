import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'events.dart';
import 'states.dart';
import 'package:nea/utils/preferencess.dart';

class OnBoardingBloc extends Bloc<OnBoardingEvent, OnBoardingState> {
  OnBoardingBloc() : super(OnBoardingState(isBoarded: false)) {
    on<OnBoardingInit>((event, emit) async {
      var bording_status = await Preferencess.getOnBoarding();
      bool value = false;
      if (bording_status != null) value = bording_status;
      emit(OnBoardingState(isBoarded: value));
    });
    on<OnBoarded>((event, emit) => emit(OnBoardingState(isBoarded: true)));
    on<OnBoarding>((event, emit) => emit(OnBoardingState(isBoarded: false)));
    on<SetOnBoardingPageIndex>((event, emit) => emit(OnBoardingState(
        isBoarded: state.isBoarded, pageIndex: event.pageIndex)));
  }
}
