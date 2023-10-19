import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:nea/constants.dart';
import 'package:nea/widgets/login.dart';
import 'package:nea/widgets/chat_list.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/sub_title_text.dart';

class MessageScreen extends StatelessWidget {
  static const routeName = '/message';

  const MessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return SafeArea(
      child: StreamBuilder<User?>(
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
