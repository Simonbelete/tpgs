import 'package:flutter/material.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/screens/farm_screen.dart';
import 'package:ilri_pfm/screens/users_screen.dart';

class NavigationDrawer extends StatelessWidget {
  const NavigationDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    UserModel? user = context.read<UserBloc>().state.user;
    return Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              'Drawer Header',
              style:
                  TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
          Visibility(
            visible: user?.is_admin ?? false,
            child: ListTile(
              title: Text('Users'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, UsersScreen.routeName);
              },
            ),
          ),
          ListTile(
            title: const Text('Farms'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, FarmScreen.routeName);
            },
          ),
          ListTile(
            title: const Text('loginout'),
            onTap: () {
              AuthenticationRepository().signOut();
            },
          )
        ],
      ),
    );
  }
}
