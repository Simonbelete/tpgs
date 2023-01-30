import 'package:flutter/material.dart';
import 'package:ilri_pfm/features/breed_type_list/breed_type_list.dart';
import 'package:ilri_pfm/main_dev.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/screens/activation_screen.dart';
import 'package:ilri_pfm/screens/breed_type_screen.dart';
import 'package:ilri_pfm/screens/chicken_form_screen.dart';
import 'package:ilri_pfm/screens/chicken_screen.dart';
import 'package:ilri_pfm/screens/chicken_stage.dart';
import 'package:ilri_pfm/screens/chicken_stage_form_screen.dart';
import 'package:ilri_pfm/screens/farm_form_screen.dart';
import 'package:ilri_pfm/screens/farm_screen.dart';
import 'package:ilri_pfm/screens/home_screen.dart';
import 'package:ilri_pfm/screens/login_screen.dart';
import 'package:ilri_pfm/screens/register_screen.dart';
import 'package:ilri_pfm/screens/users_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case App.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const App());
    case UserSync.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const UserSync());
    case HomeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const HomeScreen());
    case LoginScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const LoginScreen());
    case RegisterScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const RegisterScreen());
    case ActivationScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const ActivationScreen());
    case UsersScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const UsersScreen());
    case FarmScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const FarmScreen());
    case FarmFormScreen.routeName:
      Farm farm = routeSettings.arguments as Farm;
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => FarmFormScreen(farm: farm));
    case BreedTypeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const BreedTypeScreen());
    case ChickenStageScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const ChickenStageScreen());
    case ChickenStageFormScreen.routeName:
      ChickenStage chickenStage = routeSettings.arguments as ChickenStage;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => ChickenStageFormScreen(
                chickenStage: chickenStage,
              ));
    case ChickenScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const ChickenScreen());
    case ChickenFormScreen.routeName:
      Chicken chicken = routeSettings.arguments as Chicken;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => ChickenFormScreen(
                chicken: chicken,
              ));
    default:
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => const Center(child: Text('Error: Page Not Found')));
  }
}
