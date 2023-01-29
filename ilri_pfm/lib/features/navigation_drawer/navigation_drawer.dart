import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/screens/breed_type_screen.dart';
import 'package:ilri_pfm/screens/chicken_stage.dart';
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
          DrawerHeader(
            decoration: const BoxDecoration(
              color: kPrimaryColor,
            ),
            child: Text(
              context.read<UserBloc>().state.user?.name ?? '',
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
          Visibility(
            visible: user?.is_admin ?? false,
            child: ListTile(
              title: const Text('Users'),
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
            title: const Text('Breed Types'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, BreedTypeScreen.routeName);
            },
          ),
          ListTile(
            title: const Text('Chicken Stage'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, ChickenStageScreen.routeName);
            },
          ),
          ListTile(
            title: const Text('Sing out'),
            onTap: () {
              AuthenticationRepository().signOut();
            },
          )
        ],
      ),
    );
  }
}
