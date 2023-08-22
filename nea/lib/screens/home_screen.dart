import 'package:flutter/material.dart';
import 'package:nea/constants.dart';
import 'package:nea/utils/responsive_widget.dart';
import 'package:nea/widgets/course_grid.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nea/bloc/local/bloc.dart';
import 'package:nea/bloc/local/states.dart';
import 'package:nea/widgets/food_grid.dart';
import 'package:nea/widgets/header_6.dart';
import 'package:nea/widgets/header_logo.dart';
import 'package:nea/widgets/language_chip.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/search_bar.dart';
import 'package:nea/bloc/search/bloc.dart';
import 'package:nea/bloc/search/events.dart';
import 'package:nea/widgets/update_button.dart';

import '../i18n/app.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  const HomeScreen({super.key});

  Future<void> _loadInfoDialog(BuildContext context) async {
    String local = context.read<LocalBloc>().state.local;

    await showDialog(
      context: context,
      builder: (context) {
        return SimpleDialog(
          children: [
            SimpleDialogOption(
              child: Image.asset(
                'assets/images/ilri_logo.png',
                width: 60,
                height: 50,
              ),
            ),
            SimpleDialogOption(
              padding: const EdgeInsets.only(top: 20.0),
              child: Center(
                child: Paragraph(
                  title: appLocale['prepared_by']![local]!,
                  body: '',
                ),
              ),
            ),
            SimpleDialogOption(
              child: Paragraph(title: '', body: appLocale['authors']![local]!),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Scaffold(
        body: SafeArea(
          child: Center(
              child: Container(
                  width: (() {
                    if (ResponsiveWidget.isMediumScreen(context))
                      return size.width * 0.75;
                    else if (ResponsiveWidget.isLargeScreen(context))
                      return size.width * 0.8;
                    else
                      return size.width;
                  }()),
                  child: body(context))),
        ),
        // child: ResponsiveWidget.isSmallScreen(context)
        //     ? body(context)
        //     : Center(
        //         child: SizedBox(
        //           width: size.width * 0.3,
        //           child: body(context),
        //         ),
        //       )),
        // Center(
        //     child: AspectRatio(
        //       // aspectRatio: 12 / 9,
        //       aspectRatio: ResponsiveWidget.isLargeScreen(context)
        //           ? 12 / 9
        //           : 12 / 9,
        //       child: body(context),
        //     ),
        //   ),
        floatingActionButton: FloatingActionButton.small(
            backgroundColor: primaryColor,
            onPressed: () {
              _loadInfoDialog(context);
            },
            child: Image.asset(
              'assets/icons/info.png',
              height: 20,
            )),
      );
    });
  }

  Widget body(BuildContext context) {
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HeaderLogo(),
          // // Search Box
          Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 30.0, vertical: 20.0),
              child: Container()),
          // Language Selection
          Container(
            padding: EdgeInsets.symmetric(horizontal: 35.0),
            child: LanguageChip(),
          ),
          // Nutrients
          const SizedBox(
            height: 15,
          ),
          // Course List
          const SizedBox(
            height: 15,
          ),
          CourseGrid(),
          const SizedBox(
            height: 15,
          ),
        ],
      ),
    );
  }
}
