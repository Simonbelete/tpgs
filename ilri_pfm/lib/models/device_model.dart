class Device {
  final String token;

  Device({required this.token});

  factory Device.fromJson(Map<String, dynamic> data) {
    return Device(token: data['token']);
  }

  Map<String, dynamic> toJson() => {
        'token': token,
      };
}
