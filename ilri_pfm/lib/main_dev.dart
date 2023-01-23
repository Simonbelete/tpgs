import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:ilri_pfm/app/theme.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/router.dart';
import 'package:ilri_pfm/screens/activation_screen.dart';
import 'package:ilri_pfm/screens/onboarding_screen.dart';
import 'package:device_preview/device_preview.dart';
import 'package:ilri_pfm/util/bloc_observer.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Bloc.observer = AppBlocObserver();
  await Firebase.initializeApp();
  runApp(DevicePreview(
    enabled: false,
    builder: (context) => const AppDev(), // Wrap your app
  ));
  // runApp(const AppDev());
}

class AppDev extends StatelessWidget {
  const AppDev({super.key});
  @override
  Widget build(BuildContext context) {
    final FirebaseAuth _auth = FirebaseAuth.instance;
    return MultiBlocProvider(
      providers: [BlocProvider(create: ((context) => UserBloc()))],
      child: MaterialApp(
          useInheritedMediaQuery: true,
          locale: DevicePreview.locale(context),
          builder: DevicePreview.appBuilder,
          theme: defaultTheme,
          debugShowCheckedModeBanner: false,
          title: 'ILRI PFM Development',
          home: StreamBuilder<User?>(
            stream: FirebaseAuth.instance.authStateChanges(),
            builder: (context, snapshot) {
              if (snapshot.hasData) return const ActivationScreen();
              return const OnBoardingScreen();
            },
          ),
          onGenerateRoute: (settings) => generateRoute(settings)),
    );
  }
}
