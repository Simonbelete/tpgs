import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/blocs/user/bloc.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/repository/authentication_repository.dart';
import 'package:ilri_pfm/screens/about_screen.dart';
import 'package:ilri_pfm/screens/breed_type_screen.dart';
import 'package:ilri_pfm/screens/chicken_screen.dart';
import 'package:ilri_pfm/screens/chicken_stage.dart';
import 'package:ilri_pfm/screens/egg_screen.dart';
import 'package:ilri_pfm/screens/farm_screen.dart';
import 'package:ilri_pfm/screens/layed_place_screen.dart';
import 'package:ilri_pfm/screens/setting_screen.dart';
import 'package:ilri_pfm/screens/users_screen.dart';
import 'package:colorize_text_avatar/colorize_text_avatar.dart';
import 'package:flutter_svg/flutter_svg.dart';

class NavigationDrawer extends StatelessWidget {
  const NavigationDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    UserModel? user = context.read<UserBloc>().state.user;
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
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
                  const BodyText(
                    text: 'Farm 1',
                    color: Colors.white,
                  )
                ]),
            currentAccountPicture: InkWell(
              child: TextAvatar(
                shape: Shape.Circular,
                size: 35,
                textColor: Colors.white,
                fontSize: 20,
                fontWeight: FontWeight.w600,
                upperCase: true,
                backgroundColor: Colors.black,
                numberLetters: 2,
                text: context.read<UserBloc>().state.user?.email ?? '',
              ),
              onTap: () {},
            ),
            arrowColor: Colors.white,
            onDetailsPressed: () {},
          ),
          ListTile(
            leading: const Icon(
              Icons.dashboard,
              color: kIconcolor,
            ),
            title: const Text('Dashboard'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, FarmScreen.routeName);
            },
          ),
          Visibility(
            visible: user?.is_admin ?? false,
            child: ListTile(
              leading: const Icon(
                Icons.person,
                color: kIconcolor,
              ),
              title: const Text('Users'),
              onTap: () {
                Navigator.pop(context);
                Navigator.popAndPushNamed(context, UsersScreen.routeName);
              },
            ),
          ),
          ListTile(
            leading:
                SvgPicture.asset('assets/icons/farm.svg', color: kIconcolor),
            title: const Text('Farms'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, FarmScreen.routeName);
            },
          ),
          ListTile(
            leading: SvgPicture.asset(
              height: 25,
              'assets/icons/chicken.svg',
              color: kIconcolor,
            ),
            title: const Text('Chickens'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, ChickenScreen.routeName);
            },
          ),
          ListTile(
            leading: SvgPicture.asset(
              height: 25,
              'assets/icons/chicken_easter.svg',
              color: kIconcolor,
            ),
            title: const Text('Eggs'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, EggScreen.routeName);
            },
          ),
          ListTile(
            leading: SvgPicture.asset(
              height: 25,
              'assets/icons/helix.svg',
              color: kIconcolor,
            ),
            title: const Text('Breed Types'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, BreedTypeScreen.routeName);
            },
          ),
          ListTile(
            leading: SvgPicture.asset(
              height: 25,
              'assets/icons/cycle.svg',
              color: kIconcolor,
            ),
            title: const Text('Chicken Stage'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, ChickenStageScreen.routeName);
            },
          ),
          ListTile(
            leading: SvgPicture.asset(
              height: 25,
              'assets/icons/map.svg',
              color: kIconcolor,
            ),
            title: const Text('Lay Place'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, LayedPlaceScreen.routeName);
            },
          ),
          Divider(),
          ListTile(
            leading: const Icon(Icons.manage_accounts),
            title: const Text('Account Setting'),
            onTap: () {
              AuthenticationRepository().signOut();
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.logout,
              color: kIconcolor,
            ),
            title: const Text('Sing out'),
            onTap: () {
              AuthenticationRepository().signOut();
            },
          ),
          const Divider(),
          ListTile(
            leading: const Icon(
              Icons.settings,
              color: kIconcolor,
            ),
            title: const Text('Setting'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, SettingScreen.routeName);
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.info,
              color: kIconcolor,
            ),
            title: const Text('About'),
            onTap: () {
              Navigator.pop(context);
              Navigator.popAndPushNamed(context, AboutScreen.routeName);
            },
          ),
        ],
      ),
    );
  }
}
