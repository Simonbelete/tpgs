import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/blocs/farm/bloc.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/screens/breed_type_screen.dart';
import 'package:ilri_pfm/screens/chicken_screen.dart';
import 'package:ilri_pfm/screens/chicken_stage.dart';
import 'package:ilri_pfm/screens/farm_screen.dart';
import 'package:ilri_pfm/screens/layed_place_screen.dart';
import 'package:ilri_pfm/screens/users_screen.dart';

class NavigationDrawer extends StatelessWidget {
  const NavigationDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    UserModel? user = context.read<UserBloc>().state.user;
    return Drawer(
      child: ListView(
        children: [
          UserAccountsDrawerHeader(
            decoration: BoxDecoration(color: kPrimaryColor),
            accountName: TitleText(
              text: context.read<UserBloc>().state.user?.name ?? '',
              color: Colors.white,
            ),
            accountEmail: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  BodyText(
                    text: context.read<UserBloc>().state.user?.email ?? '',
                    color: Colors.white,
                  ),
                  BodyText(
                    text: 'Farm 1',
                    color: Colors.white,
                  )
                ]),
            currentAccountPicture: InkWell(
              child: CircleAvatar(backgroundColor: kSecondaryColor),
              onTap: () {},
            ),
            arrowColor: Colors.white,
            onDetailsPressed: () {
              print('hello');
            },
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
            title: const Text('Chickens'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, ChickenScreen.routeName);
            },
          ),
          ListTile(
            title: const Text('Lay Place'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, LayedPlaceScreen.routeName);
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
