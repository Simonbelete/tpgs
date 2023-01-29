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
          // DrawerHeader(
          //     decoration: const BoxDecoration(
          //       color: kPrimaryColor,
          //     ),
          //     child: Stack(
          //       children: [
          //         const Align(
          //           alignment: Alignment.centerLeft,
          //           child: CircleAvatar(
          //             backgroundColor: kSecondaryColor,
          //             radius: 50.0,
          //           ),
          //         ),
          //         Align(
          //           alignment: Alignment.centerLeft,
          //           child: Text(
          //             context.read<UserBloc>().state.user?.name ?? 'User Name',
          //             style: const TextStyle(
          //                 color: Colors.white, fontWeight: FontWeight.bold),
          //           ),
          //         ),
          //         Align(
          //           alignment: Alignment.centerRight + Alignment(0, .3),
          //           child: Text(
          //             'Flutter Youtuber',
          //             style: TextStyle(
          //               color: Colors.white70,
          //             ),
          //           ),
          //         ),
          //       ],
          //     )),
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
