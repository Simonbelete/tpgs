import 'package:shared_preferences/shared_preferences.dart';

class Preferencess {
  static late SharedPreferences _preferences;
  static const _ONBOARDING_KEY = 'onboarding_key';
  static const _LOCAL_KEY = 'local_key';

  static Future init() async {
    _preferences = await SharedPreferences.getInstance();
  }
}
