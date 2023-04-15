abstract class OnBoardingEvent {}

// INIT State
class OnBoardingInit extends OnBoardingEvent {}

// On Boarding True
class OnBoarded extends OnBoardingEvent {}

// On Boarding False
class OnBoarding extends OnBoardingEvent {}

class SetOnBoardingPageIndex extends OnBoardingEvent {
  int? pageIndex = 0;

  SetOnBoardingPageIndex(this.pageIndex);
}
