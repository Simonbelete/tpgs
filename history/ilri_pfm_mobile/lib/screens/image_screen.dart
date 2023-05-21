import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/endpoints.dart';

class ImageScreen extends StatefulWidget {
  static const String routeName = '/image';
  final String url;

  const ImageScreen({super.key, required this.url});

  @override
  State<ImageScreen> createState() => _ImageScreenState();
}

class _ImageScreenState extends State<ImageScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  String? token = null;

  @override
  void initState() {
    _loadToken();
    super.initState();
  }

  void _loadToken() async {
    final t = await _auth.currentUser?.getIdToken();
    print(t);
    setState(() {
      token = t;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Hero(
        tag: widget.url,
        child: InteractiveViewer(
            panEnabled: true, // Set it to false
            boundaryMargin: EdgeInsets.all(100),
            minScale: 0.5,
            maxScale: 5,
            child: _loadImage()),
      ),
    );
  }

  Widget _loadImage() {
    if (token != null) {
      return Image.network(
        '${Endpoints.baseUrl}/charts/weights/',
        fit: BoxFit.contain,
        height: double.infinity,
        width: double.infinity,
        alignment: Alignment.center,
        headers: {Headers.wwwAuthenticateHeader: token ?? ''},
      );
    } else
      return Container();
  }
}
