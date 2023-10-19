import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ChatListScreen extends StatefulWidget {
  static const routeName = '/chat-list';

  const ChatListScreen({super.key});

  @override
  State<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends State<ChatListScreen> {
  FirebaseFirestore db = FirebaseFirestore.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
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
                  return GestureDetector(
                    onTap: () {
                      // Navigator.pushNamed(
                      //     context, ChatPage.routeName + "/" + index.toString(),
                      //     arguments: index);
                    },
                    child: Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: Row(
                          children: [Text(snapshot.data?.docs[index]['name'])]),
                    ),
                  );
                }));
          }
        },
      ),
    ));
  }
}
