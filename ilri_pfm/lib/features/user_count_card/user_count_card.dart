import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/count_card.dart';
import 'package:ilri_pfm/repository/user_repository.dart';
import 'package:ilri_pfm/screens/users_screen.dart';

class UserCountCard extends StatefulWidget {
  const UserCountCard({super.key});

  @override
  State<UserCountCard> createState() => _UserCountCardState();
}

class _UserCountCardState extends State<UserCountCard> {
  int count = 0;

  @override
  void initState() {
    _fetchData();
    super.initState();
  }

  void _fetchData() async {
    final result = await UserRepository().count();
    setState(() {
      count = result;
    });
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.pushNamed(context, UsersScreen.routeName);
      },
      child: CountCard(
        title: 'Users',
        icon: const Icon(
          Icons.person,
          color: Colors.white,
        ),
        count: count.toString(),
      ),
    );
  }
}
