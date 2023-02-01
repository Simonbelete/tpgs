import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/weight_model.dart';
import 'package:ilri_pfm/repository/weight_repository.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class WeightList extends StatefulWidget {
  final Chicken chicken;

  const WeightList({super.key, required this.chicken});

  @override
  State<WeightList> createState() => _WeightListState();
}

class _WeightListState extends State<WeightList> {
  static const _pageSize = 20;

  final PagingController<int, Weight> _pagingController =
      PagingController(firstPageKey: 0);

  @override
  void initState() {
    _pagingController.addPageRequestListener((pageKey) {
      _fetchPage(pageKey);
    });
    super.initState();
  }

  Future<void> _fetchPage(int pageKey) async {
    try {
      final List<Weight>? newItems = await WeightRepository()
          .get(query: {'limit': _pageSize, 'offset': _pageSize * pageKey});
      final isLastPage = (newItems?.length ?? 0) < _pageSize;
      if (isLastPage) {
        _pagingController.appendLastPage(newItems ?? []);
      } else {
        final nextPageKey = pageKey + (newItems?.length ?? 0);
        _pagingController.appendPage(newItems ?? [], nextPageKey);
      }
    } catch (error) {
      _pagingController.error = error;
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return RefreshIndicator(
      onRefresh: () async {
        _pagingController.refresh();
      },
      child: Container(
          width: size.width,
          height: size.height,
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  TitleText(text: 'Date'),
                  TitleText(text: 'Weight'),
                ],
              ),
              Divider(),
              Expanded(
                child: PagedListView<int, Weight>(
                  pagingController: _pagingController,
                  builderDelegate: PagedChildBuilderDelegate<Weight>(
                    itemBuilder: (context, item, index) => Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            BodyText(
                                text:
                                    DateFormat('yyyy-MM-dd').format(item.date)),
                            BodyText(text: item.weight.toString())
                          ],
                        )),
                  ),
                ),
              ),
            ],
          )),
    );
  }

  // @override
  // Widget build(BuildContext context) {
  //   return Container(
  //     height: 200,
  //     child: ListView(
  //       children: [
  //         DataTable(columns: [
  //           DataColumn(label: Text('abc'))
  //         ], rows: [
  //           DataRow(cells: [DataCell(Text('1'))])
  //         ])
  //       ],
  //     ),
  //   );
  // }
}
