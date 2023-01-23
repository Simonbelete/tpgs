import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:ilri_pfm/repository/repository.dart';

class MessagingRepository extends Repository {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  Future<String?> getDeviceToken() async {
    String? fcmToken = await _messaging.getToken();
    return fcmToken;
  }
}
