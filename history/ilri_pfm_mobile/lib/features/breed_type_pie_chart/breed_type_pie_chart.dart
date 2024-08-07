import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/indicator.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/repository/breed_type_report_repository.dart';
import 'package:ilri_pfm/util/color_generator.dart';
import 'package:ilri_pfm/util/extentions.dart';

class BreedTypePieChart extends StatefulWidget {
  const BreedTypePieChart({super.key});

  @override
  State<StatefulWidget> createState() => _BreedTypePieChartState();
}

class _BreedTypePieChartState extends State {
  int touchedIndex = -1;
  List<BreedType>? breedTypes = [];
  int count = 0;

  List<Color> chartColors = [];

  @override
  void initState() {
    _fetchData();
    super.initState();
  }

  void _fetchData() async {
    final result = await BreedTypeReportRepository().getPercentage();
    setState(() {
      breedTypes = result?['data'];
      count = result?['count'];
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
        // color: kPrimaryColor,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
            side: const BorderSide(color: kPrimaryColor)),
        child: Container(
            padding: const EdgeInsets.symmetric(vertical: 20.0, horizontal: 10),
            width: size.width * 0.9,
            child: Column(
              children: [
                AspectRatio(
                  aspectRatio: 2,
                  child: PieChart(
                    PieChartData(
                      pieTouchData: PieTouchData(
                        touchCallback: (FlTouchEvent event, pieTouchResponse) {
                          setState(() {
                            if (!event.isInterestedForInteractions ||
                                pieTouchResponse == null ||
                                pieTouchResponse.touchedSection == null) {
                              touchedIndex = -1;
                              return;
                            }
                            touchedIndex = pieTouchResponse
                                .touchedSection!.touchedSectionIndex;
                          });
                        },
                      ),
                      borderData: FlBorderData(
                        show: false,
                      ),
                      sectionsSpace: 0,
                      centerSpaceRadius: 40,
                      sections: showingSections(),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                Container(
                    // width: size.width * 0.5,
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    child: SingleChildScrollView(
                        physics: const BouncingScrollPhysics(),
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          children: breedTypes
                                  ?.map((e) => Padding(
                                        padding: EdgeInsets.only(right: 10),
                                        child: Indicator(
                                            color: e.color == null
                                                ? generateRandomColor(e.id)
                                                : e.color?.toColor(),
                                            text: e.name,
                                            isSquare: true),
                                      ))
                                  .toList() ??
                              [],
                        )))
              ],
            )));
  }

  List<PieChartSectionData> showingSections() {
    return List.generate(
        breedTypes?.length ?? 0,
        (index) => PieChartSectionData(
              color: breedTypes?[index].color == null
                  ? generateRandomColor(breedTypes?[index].id)
                  : breedTypes?[index].color?.toColor(),
              value:
                  _toPercentage(breedTypes?[index].chicken_count ?? 0, count),
              title:
                  '${_toPercentage(breedTypes?[index].chicken_count ?? 0, count)}%',
              radius: index == touchedIndex ? 60.0 : 50.0,
              titleStyle: TextStyle(
                fontSize: index == touchedIndex ? 25.0 : 16.0,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                shadows: [Shadow(color: Colors.black, blurRadius: 2)],
              ),
            ));
  }

  double _toPercentage(int x, int y) {
    return double.parse(((x / y) * 100).toStringAsFixed(2));
  }
}
