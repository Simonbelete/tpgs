import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/data_tile.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/farm_repository.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class FarmList extends StatefulWidget {
  const FarmList({super.key});

  @override
  State<FarmList> createState() => _FarmListState();
}

class _FarmListState extends State<FarmList> {
  static const _pageSize = 20;

  final PagingController<int, Farm> _pagingController =
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
      final List<Farm>? newItems = await FarmRepository()
          .get(query: {'limit': _pageSize, 'offset': _pageSize * pageKey});
      final isLastPage = (newItems?.length ?? 0) < _pageSize;
      print(newItems);
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
          child: PagedListView<int, Farm>(
            pagingController: _pagingController,
            builderDelegate: PagedChildBuilderDelegate<Farm>(
              itemBuilder: (context, item, index) => Container(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: DataTile(
                  onTab: () {},
                  title: item.name,
                ),
              ),
            ),
          )),
    );
  }
}
