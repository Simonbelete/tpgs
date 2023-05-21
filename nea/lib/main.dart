import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/events.dart';
import 'package:nea/bloc/onboarding/states.dart';
import 'package:nea/router.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:flutter_downloader/flutter_downloader.dart';

import 'utils/preferencess.dart';
import 'utils/bloc_observer.dart';
import 'bloc/onboarding/bloc.dart';
import 'bloc/onboarding/events.dart';
import 'bloc/local/bloc.dart';
import 'bloc/search/bloc.dart';
import 'screens/onboarding_screen.dart';
import 'theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Bloc.observer = AppBlocObserver();
  await FlutterDownloader.initialize(debug: true, ignoreSsl: true);
  await Preferencess.init();
  runApp(const NutritionEductionApp());
}

class NutritionEductionApp extends StatelessWidget {
  const NutritionEductionApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: ((context) => OnBoardingBloc())),
        BlocProvider(create: ((context) => LocalBloc())),
        BlocProvider(create: ((context) => SearchBloc())),
      ],
      child: MaterialApp(
        title: 'Nutrition Eduction - ILRI TPGS',
        debugShowCheckedModeBanner: false,
        theme: defaultTheme,
        home: Main(),
        onGenerateRoute: (settings) => generateRoute(settings),
      ),
    );
  }
}

class Main extends StatefulWidget {
  const Main({super.key});

  @override
  State<Main> createState() => _MainState();
}

class _MainState extends State<Main> {
  final onBoardingBloc = OnBoardingBloc();

  @override
  void initState() {
    super.initState();
    _loadOnBoardingState();
    _loadLocalization();
  }

  void _loadOnBoardingState() async {
    context.read<OnBoardingBloc>().add(OnBoardingInit());
  }

  void _loadLocalization() async {
    context.read<LocalBloc>().add(LocalInit());
    String local = context.read<LocalBloc>().state.local;
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<OnBoardingBloc, OnBoardingState>(
        builder: (context, state) {
      if (state.isBoarded) {
        return const HomeScreen();
      } else {
        return const OnBoardingScreen();
      }
    });
  }
}
