import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/models/weight_model.dart';
import 'package:ilri_pfm/repository/chicken_repository.dart';

class WeightLinechart extends StatefulWidget {
  final int chickenId;

  const WeightLinechart({super.key, required this.chickenId});

  @override
  State<WeightLinechart> createState() => _WeightLinechartState();
}

class _WeightLinechartState extends State<WeightLinechart> {
  List<Weight>? weights;

  @override
  void initState() {
    _fetchData();
    super.initState();
  }

  void _fetchData() async {
    final result = await ChickenRepository().getGrowthAll(id: widget.chickenId);
    setState(() {
      weights = result;
    });
  }

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.23,
      child: Padding(
        padding: const EdgeInsets.only(right: 16, left: 6),
        child: LineChart(
          LineChartData(
            lineTouchData: lineTouchData,
            gridData: gridData,
            borderData: borderData,
            titlesData: titlesData,
            lineBarsData: [
              LineChartBarData(
                  isCurved: false,
                  color: kPrimaryColor,
                  barWidth: 5,
                  isStrokeCapRound: false,
                  dotData: FlDotData(show: false),
                  belowBarData: BarAreaData(show: false),
                  spots: weights
                      ?.map((e) => FlSpot(e.week.toDouble(), e.weight))
                      .toList())
            ],
            minX: 0,
            minY: 0,
          ),
        ),
      ),
    );
  }

  LineTouchData lineTouchData = LineTouchData(
    handleBuiltInTouches: true,
    touchTooltipData: LineTouchTooltipData(
      tooltipBgColor: Colors.blueGrey.withOpacity(0.8),
    ),
  );

  FlGridData gridData = FlGridData(show: true);

  FlBorderData get borderData => FlBorderData(
        show: true,
        border: const Border(
          bottom: BorderSide(color: Colors.black, width: 1),
          left: BorderSide(color: Colors.black, width: 1),
          right: BorderSide(color: Colors.transparent),
          top: BorderSide(color: Colors.transparent),
        ),
      );

  FlTitlesData get titlesData => FlTitlesData(
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
          ),
        ),
        rightTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        leftTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: true, reservedSize: 40)),
      );
}
