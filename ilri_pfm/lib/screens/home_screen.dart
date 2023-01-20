import 'package:flutter/material.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(children: []),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(child: Text('abcd')),
            ListTile(
              title: const Text('loginout'),
              onTap: () {
                AuthenticationRepository().signOut();
              },
            )
          ],
        ),
      ),
    );
  }
}
