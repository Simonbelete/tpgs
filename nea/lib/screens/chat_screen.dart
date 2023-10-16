import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ChatScreen extends StatefulWidget {
  static const routeName = '/chat';

  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  FirebaseFirestore db = FirebaseFirestore.instance;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: StreamBuilder(
        stream: db.collection('users').snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(
              child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.red)),
            );
          } else {
            return ListView.builder(
                padding: EdgeInsets.all(0.0),
                itemCount: snapshot.data?.docs.length,
                itemBuilder: ((context, index) {
                  return Text(snapshot.data?.docs[index].id ?? "");
                }));
          }
        },
      ),
    );
  }
}
