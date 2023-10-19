import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:nea/constants.dart';
import 'package:nea/widgets/login.dart';
import 'package:nea/widgets/chat_list.dart';

class MessageScreen extends StatelessWidget {
  static const routeName = '/message';

  const MessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   backgroundColor: Colors.white,
      //   elevation: 2,
      //   iconTheme: const IconThemeData(color: secondaryColor),
      //   automaticallyImplyLeading: false,
      //   title: Center(child: Container()),
      // ),
      body: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: ((context, snapshot) {
          if (snapshot.hasData && snapshot.data != null) {
            return ChatList();
          } else {
            return const LoginBodyScreen();
          }
        }),
      ),
    );
  }
}
