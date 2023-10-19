import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_chat_types/flutter_chat_types.dart' as types;

import 'chat.dart';
import 'util.dart';

class UsersPage extends StatelessWidget {
  static const routeName = '/users';

  const UsersPage({super.key});

  Widget _buildAvatar(types.User user) {
    final color = getUserAvatarNameColor(user);
    final hasImage = user.imageUrl != null;
    final name = getUserName(user);

    return Container(
      margin: const EdgeInsets.only(right: 16),
      child: CircleAvatar(
        backgroundColor: hasImage ? Colors.transparent : color,
        backgroundImage: hasImage ? NetworkImage(user.imageUrl!) : null,
        radius: 20,
        child: !hasImage
            ? Text(
                name.isEmpty ? '' : name[0].toUpperCase(),
                style: const TextStyle(color: Colors.white),
              )
            : null,
      ),
    );
  }

  void _handlePressed(types.User otherUser, BuildContext context) async {
    final navigator = Navigator.of(context);

    navigator.pop();
    await navigator.push(
      MaterialPageRoute(
        builder: (context) => ChatPage(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          systemOverlayStyle: SystemUiOverlayStyle.light,
          title: const Text('Users'),
        ),
        // body: StreamBuilder<List<types.User>>(
        //   stream: FirebaseChatCore.instance.users(),
        //   initialData: const [],
        //   builder: (context, snapshot) {
        //     print('-----------------');
        //     print(snapshot.data);

        //     if (!snapshot.hasData || snapshot.data!.isEmpty) {
        //       return Container(
        //         alignment: Alignment.center,
        //         margin: const EdgeInsets.only(
        //           bottom: 200,
        //         ),
        //         child: const Text('No users'),
        //       );
        //     }

        //     return ListView.builder(
        //       itemCount: snapshot.data!.length,
        //       itemBuilder: (context, index) {
        //         final user = snapshot.data![index];

        //         return GestureDetector(
        //           onTap: () {
        //             _handlePressed(user, context);
        //           },
        //           child: Container(
        //             padding: const EdgeInsets.symmetric(
        //               horizontal: 16,
        //               vertical: 8,
        //             ),
        //             child: Row(
        //               children: [
        //                 _buildAvatar(user),
        //                 Text(getUserName(user)),
        //               ],
        //             ),
        //           ),
        //         );
        //       },
        //     );
        //   },
        // ),
      );
}
