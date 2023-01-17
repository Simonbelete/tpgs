import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:ilri_pfm/screens/home_screen.dart';
import 'package:ilri_pfm/screens/login_screen.dart';

void main() async {
  runApp(const AppDev());
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
}

class AppDev extends StatelessWidget {
  const AppDev({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'ILRI PFM Development',
        home: MultiBlocProvider(
          providers: [],
          child: MaterialApp(
            home: StreamBuilder<User?>(
              stream: FirebaseAuth.instance.authStateChanges(),
              builder: (context, snapshot) {
                if (snapshot.hasData) return const HomeScreen();
                return const LoginScreen();
              },
            ),
          ),
        ));
  }
}
