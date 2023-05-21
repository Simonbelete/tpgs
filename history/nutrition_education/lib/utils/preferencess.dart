import 'package:shared_preferences/shared_preferences.dart';

class Preferencess {
  static late SharedPreferences _preferences;
  static const _ONBOARDING_KEY = 'onboarding_key';
  static const _LOCAL_KEY = 'local_key';

  static Future init() async {
    _preferences = await SharedPreferences.getInstance();
  }

  static Future setOnBoarding(bool value) async {
    _preferences.setBool(_ONBOARDING_KEY, value);
  }

  static Future getOnBoarding() async {
    return _preferences.getBool(_ONBOARDING_KEY);
  }

  static Future setLocal(String value) async {
    _preferences.setString(_LOCAL_KEY, value);
  }

  static Future getLocal() async {
    return _preferences.getString(_LOCAL_KEY);
  }
}
