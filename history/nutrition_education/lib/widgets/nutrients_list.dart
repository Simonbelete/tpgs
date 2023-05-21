import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nutrition_education/bloc/local/bloc.dart';
import 'package:nutrition_education/bloc/local/states.dart';
import 'package:nutrition_education/screens/list_screen.dart';
import 'package:nutrition_education/utils/responsive_widget.dart';
import 'package:nutrition_education/widgets/category_button.dart';

import '../i18n/nutrients.dart';

class NutrientsList extends StatelessWidget {
  const NutrientsList({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocBuilder<LocalBloc, LocalState>(builder: (context, state) {
      return Material(
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: ResponsiveWidget.isSmallScreen(context) ? 3 : 6,
            mainAxisExtent: ResponsiveWidget.isSmallScreen(context) ? 100 : 100,
          ),
          physics: const NeverScrollableScrollPhysics(),
          shrinkWrap: true,
          padding: const EdgeInsets.only(top: 16.0),
          itemCount: nutrientsData.length,
          itemBuilder: (context, index) => InkWell(
            onTap: () => Navigator.pushNamed(context, ListScreen.routeName,
                arguments: nutrientsData.values.elementAt(index)[state.local]),
            child: Padding(
              padding: const EdgeInsets.only(right: 50),
              child: CategoryButton(
                  text:
                      nutrientsData.values.elementAt(index)[state.local]!.name,
                  icon:
                      nutrientsData.values.elementAt(index)[state.local]!.icon),
            ),
          ),
        ),
      );
    });
  }
}
