import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/screens/chat.dart';
import 'package:nea/widgets/header_logo.dart';
import 'package:nea/models/user.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ChatList extends StatefulWidget {
  const ChatList({super.key});

  @override
  State<ChatList> createState() => _ChatListState();
}

class _ChatListState extends State<ChatList> {
  final Stream<QuerySnapshot> _usersStream =
      FirebaseFirestore.instance.collection('users').snapshots();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const HeaderLogo(),
          const SizedBox(
            height: 15,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: SizedBox(
              height: 200,
              child: StreamBuilder<QuerySnapshot>(
                stream: _usersStream,
                builder: (BuildContext context,
                    AsyncSnapshot<QuerySnapshot> snapshot) {
                  if (snapshot.hasError) {
                    return const Text('Something went wrong');
                  }

                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator(
                          valueColor:
                              AlwaysStoppedAnimation<Color>(Colors.red)),
                    );
                  }

                  if (!snapshot.hasData) {
                    return Container(
                      alignment: Alignment.center,
                      margin: const EdgeInsets.only(
                        bottom: 200,
                      ),
                      child: const Text('No users'),
                    );
                  }

                  return ListView(
                    children: snapshot.data!.docs
                        .map((DocumentSnapshot document) {
                          Map<String, dynamic> data =
                              document.data()! as Map<String, dynamic>;
                          return ListTile(
                            onTap: () {
                              Navigator.pushNamed(context,
                                  "${ChatPage.routeName}/${data['id']}",
                                  arguments: data['id']);
                            },
                            leading: CircleAvatar(
                                backgroundColor: primaryColor,
                                radius: 20,
                                child: Text(
                                  data['local'].toUpperCase(),
                                  style: const TextStyle(color: Colors.white),
                                )),
                            title: Text(data['name']),
                            subtitle: Text('Subititle'),
                          );
                        })
                        .toList()
                        .cast(),
                  );
                },
              ),
            ),
          )
        ],
      ),
    );
  }
}
