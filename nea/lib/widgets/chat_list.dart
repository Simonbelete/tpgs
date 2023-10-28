import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/screens/chat.dart';
import 'package:nea/utils/preferencess.dart';
import 'package:nea/widgets/header_logo.dart';
import 'package:nea/models/user.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/sub_title_text.dart';

class ChatList extends StatefulWidget {
  const ChatList({super.key});

  @override
  State<ChatList> createState() => _ChatListState();
}

class _ChatListState extends State<ChatList> {
  FirebaseFirestore db = FirebaseFirestore.instance;
  String role = "";

  @override
  void initState() {
    super.initState();
    Preferencess.getRole().then((value) => {setState(() => role = value)});
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 3,
        iconTheme: const IconThemeData(color: secondaryColor),
        automaticallyImplyLeading: false,
        title: Center(
          child: Container(
            margin: EdgeInsets.zero,
            // decoration: BoxDecoration(border: Border.all(width: 1)),
            width: (() {
              if (ResponsiveWidget.isSmallScreen(context)) {
                return size.width;
              } else if (ResponsiveWidget.isTabletScreen(context)) {
                return size.width * 0.85;
              } else if (ResponsiveWidget.isMediumScreen(context)) {
                return size.width * 0.85;
              } else if (ResponsiveWidget.isLargeScreen(context)) {
                return size.width * 0.7;
              } else {
                // Extra Large
                return size.width * 0.7;
              }
            }()),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.arrow_back, color: Colors.black)),
                const SubTitleText(
                  text: "Nutrition Literacy Chat",
                  color: secondaryColor,
                ),
                IconButton(
                  icon: const Icon(Icons.logout, color: Colors.black54),
                  onPressed: () => {FirebaseAuth.instance.signOut()},
                )
              ],
            ),
          ),
        ),
        actions: <Widget>[Container()],
        scrolledUnderElevation: 5,
      ),
      body: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(
              height: 15,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: SizedBox(
                height: 200,
                child: StreamBuilder<QuerySnapshot>(
                  stream: FirebaseFirestore.instance
                      .collection('users')
                      .where('role',
                          isEqualTo: role == 'admin' ? 'user' : 'admin')
                      .snapshots(),
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
                                Navigator.pushNamed(context, ChatPage.routeName,
                                    arguments: document.id);
                              },
                              leading: CircleAvatar(
                                  backgroundColor: primaryColor,
                                  radius: 20,
                                  child: Text(
                                    (data['name'] ?? "unknown")
                                        .toString()
                                        .substring(0, 2)
                                        .toUpperCase(),
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
      ),
    );
  }
}
