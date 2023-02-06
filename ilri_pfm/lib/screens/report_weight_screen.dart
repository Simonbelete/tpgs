import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/endpoints.dart';
import 'package:ilri_pfm/common_widgets/custom_appbar.dart';
import 'package:ilri_pfm/features/navigation_drawer/navigation_drawer.dart';

class ReportWeightScreen extends StatefulWidget {
  static const String routeName = '/report-chicken-weight';

  const ReportWeightScreen({super.key});

  @override
  State<ReportWeightScreen> createState() => _ReportWeightScreenState();
}

class _ReportWeightScreenState extends State<ReportWeightScreen> {
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
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(children: [
            const CustomAppBar(
              title: 'Chicken Weight Report',
            ),
            const SizedBox(
              height: 25,
            ),
            _loadImage(size)
          ]),
        ),
      ),
      drawer: const NavigationDrawer(),
    );
  }

  Widget _loadImage(Size size) {
    if (token != null) {
      return Container(
        height: size.height * 0.6,
        width: size.width,
        child: Image.network(
          '${Endpoints.baseUrl}/charts/weights/',
          headers: {Headers.wwwAuthenticateHeader: token ?? ''},
        ),
      );
    } else
      return Container();
  }
}
