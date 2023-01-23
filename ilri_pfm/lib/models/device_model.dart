class Device {
  final String token;

  Device({required this.token});

  Map<String, dynamic> toJson() => {
        'token': token,
      };
}
