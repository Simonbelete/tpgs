import 'package:flutter/material.dart';
import 'package:ilri_pfm/main_dev.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/models/egg.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/models/layed_place.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/models/weight_model.dart';
import 'package:ilri_pfm/screens/about_screen.dart';
import 'package:ilri_pfm/screens/activation_screen.dart';
import 'package:ilri_pfm/screens/breed_type_form_screen.dart';
import 'package:ilri_pfm/screens/breed_type_screen.dart';
import 'package:ilri_pfm/screens/chicken_form_screen.dart';
import 'package:ilri_pfm/screens/chicken_panel.dart';
import 'package:ilri_pfm/screens/chicken_screen.dart';
import 'package:ilri_pfm/screens/chicken_stage.dart';
import 'package:ilri_pfm/screens/chicken_stage_form_screen.dart';
import 'package:ilri_pfm/screens/egg_production_form_screen.dart';
import 'package:ilri_pfm/screens/egg_production_screen.dart';
import 'package:ilri_pfm/screens/farm_form_screen.dart';
import 'package:ilri_pfm/screens/farm_screen.dart';
import 'package:ilri_pfm/screens/home_screen.dart';
import 'package:ilri_pfm/screens/layed_place_form_screen.dart';
import 'package:ilri_pfm/screens/layed_place_screen.dart';
import 'package:ilri_pfm/screens/login_screen.dart';
import 'package:ilri_pfm/screens/register_screen.dart';
import 'package:ilri_pfm/screens/setting_screen.dart';
import 'package:ilri_pfm/screens/users_form_screen.dart';
import 'package:ilri_pfm/screens/users_screen.dart';
import 'package:ilri_pfm/screens/weight_form_screen.dart';
import 'package:ilri_pfm/screens/weight_report_screen.dart';
import 'package:ilri_pfm/screens/weight_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case App.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const App());
    case SettingScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const SettingScreen());
    case AboutScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const AboutScreen());
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
    case UsersFormScreen.routeName:
      UserModel user = routeSettings.arguments as UserModel;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => UsersFormScreen(
                user: user,
              ));
    case FarmScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const FarmScreen());
    case FarmFormScreen.routeName:
      Farm? farm = routeSettings.arguments as Farm?;
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => FarmFormScreen(farm: farm));
    case BreedTypeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const BreedTypeScreen());
    case BreedTypeFormScreen.routeName:
      BreedType? breedType = routeSettings.arguments as BreedType?;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => BreedTypeFormScreen(
                breedType: breedType,
              ));
    case ChickenStageScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const ChickenStageScreen());
    case ChickenStageFormScreen.routeName:
      ChickenStage? chickenStage = routeSettings.arguments as ChickenStage?;
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
    case WeightScreen.routeName:
      Chicken chicken = routeSettings.arguments as Chicken;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => WeightScreen(
                chicken: chicken,
              ));
    case WeightFormScreen.routeName:
      Weight? weight = routeSettings.arguments as Weight?;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => WeightFormScreen(
                weight: weight,
              ));
    case WeightReportScreen.routeName:
      int id = int.parse(routeSettings.arguments.toString());
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => WeightReportScreen(
                id: id,
              ));
    case ChickenPanelScreen.routeName:
      Chicken chicken = routeSettings.arguments as Chicken;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => ChickenPanelScreen(
                chicken: chicken,
              ));
    case LayedPlaceScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const LayedPlaceScreen());
    case LayedPlaceFormScreen.routeName:
      LayedPlace? layedPlace = routeSettings.arguments as LayedPlace?;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => LayedPlaceFormScreen(
                layedPlace: layedPlace,
              ));
    case EggProductionScreen.routeName:
      Chicken chicken = routeSettings.arguments as Chicken;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => EggProductionScreen(
                chicken: chicken,
              ));
    case EggProductionFormScreen.routeName:
      Egg egg = routeSettings.arguments as Egg;
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => EggProductionFormScreen(
                egg: egg,
              ));
    default:
      return MaterialPageRoute(
          settings: routeSettings,
          builder: (_) => const Center(child: Text('Error: Page Not Found')));
  }
}
