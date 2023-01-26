import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:ilri_pfm/app/theme.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/blocs/user/events.dart';
import 'package:ilri_pfm/blocs/user/states.dart';
import 'package:ilri_pfm/common_widgets/loading.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/repository/user_repository.dart';
import 'package:ilri_pfm/router.dart';
import 'package:ilri_pfm/screens/activation_screen.dart';
import 'package:ilri_pfm/screens/home_screen.dart';
import 'package:ilri_pfm/screens/onboarding_screen.dart';
import 'package:device_preview/device_preview.dart';
import 'package:ilri_pfm/util/bloc_observer.dart';

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  // await setupFlutterNotifications();
  // showFlutterNotification(message);
  // If you're going to use other Firebase services in the background, such as Firestore,
  // make sure you call `initializeApp` before using other Firebase services.
  print('Handling a background message ${message.messageId}');
}

/// Create a [AndroidNotificationChannel] for heads up notifications
// late AndroidNotificationChannel channel;

bool isFlutterLocalNotificationsInitialized = false;

// Future<void> setupFlutterNotifications() async {
//   if (isFlutterLocalNotificationsInitialized) {
//     return;
//   }
//   channel = const AndroidNotificationChannel(
//     'high_importance_channel', // id
//     'High Importance Notifications', // title
//     description:
//         'This channel is used for important notifications.', // description
//     importance: Importance.high,
//   );

//   flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

//   /// Create an Android Notification Channel.
//   ///
//   /// We use this channel in the `AndroidManifest.xml` file to override the
//   /// default FCM channel to enable heads up notifications.
//   await flutterLocalNotificationsPlugin
//       .resolvePlatformSpecificImplementation<
//           AndroidFlutterLocalNotificationsPlugin>()
//       ?.createNotificationChannel(channel);

//   /// Update the iOS foreground notification presentation options to allow
//   /// heads up notifications.
//   await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
//     alert: true,
//     badge: true,
//     sound: true,
//   );
//   isFlutterLocalNotificationsInitialized = true;
// }

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Bloc.observer = AppBlocObserver();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
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
              if (snapshot.hasData) {
                return UserSync();
              }
              return const OnBoardingScreen();
            },
          ),
          onGenerateRoute: (settings) => generateRoute(settings)),
    );
  }
}

class UserSync extends StatefulWidget {
  const UserSync({super.key});

  @override
  State<UserSync> createState() => _UserSyncState();
}

class _UserSyncState extends State<UserSync> {
  bool loading = true;

  @override
  void initState() {
    _syncUser();
    super.initState();
  }

  void _syncUser() async {
    UserModel? user = await UserRepository().getByUid();
    if (user != null) {
      context.read<UserBloc>().add(UserInit(user));
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      builder: (context, state) {
        return state.user?.is_approved == true
            ? const HomeScreen()
            : const ActivationScreen();
      },
    );
  }
}
