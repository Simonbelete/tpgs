import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:ilri_pfm/app/theme.dart';
import 'package:ilri_pfm/blocs/auth/bloc.dart';
import 'package:ilri_pfm/router.dart';
import 'package:ilri_pfm/screens/home_screen.dart';
import 'package:ilri_pfm/screens/login_screen.dart';
import 'package:ilri_pfm/screens/onboarding_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const AppDev());
}

class AppDev extends StatelessWidget {
  const AppDev({super.key});

  @override
  Widget build(BuildContext context) {
    final FirebaseAuth _auth = FirebaseAuth.instance;
    return MultiBlocProvider(
      providers: [BlocProvider(create: ((context) => AuthenticationBloc()))],
      child: MaterialApp(
          theme: defaultTheme,
          debugShowCheckedModeBanner: false,
          title: 'ILRI PFM Development',
          home: StreamBuilder<User?>(
            stream: FirebaseAuth.instance.authStateChanges(),
            builder: (context, snapshot) {
              if (snapshot.hasData) return const HomeScreen();
              return const OnBoardingScreen();
            },
          ),
          onGenerateRoute: (settings) => generateRoute(settings)),
    );
  }
}
