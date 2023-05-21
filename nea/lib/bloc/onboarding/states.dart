class OnBoardingState {
  bool isBoarded;
  int? pageIndex = 0;

  OnBoardingState({required this.isBoarded, this.pageIndex});

  Map<String, dynamic> toJson() =>
      {'isBoarded': isBoarded, 'pageIndex': pageIndex};
}
