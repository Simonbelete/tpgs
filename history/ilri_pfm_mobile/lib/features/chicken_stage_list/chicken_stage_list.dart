import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/data_tile.dart';
import 'package:ilri_pfm/models/chicken_stage.dart';
import 'package:ilri_pfm/repository/chicken_stage_repository.dart';
import 'package:ilri_pfm/screens/chicken_stage_form_screen.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class ChickenStageList extends StatefulWidget {
  const ChickenStageList({super.key});

  @override
  State<ChickenStageList> createState() => ChickenStageListState();
}

class ChickenStageListState extends State<ChickenStageList> {
  static const _pageSize = 20;

  final PagingController<int, ChickenStage> _pagingController =
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
      final List<ChickenStage>? newItems = await ChickenStageRepository()
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
          child: PagedListView<int, ChickenStage>(
            pagingController: _pagingController,
            builderDelegate: PagedChildBuilderDelegate<ChickenStage>(
              itemBuilder: (context, item, index) => Container(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: DataTile(
                  onTab: () {
                    Navigator.pushNamed(
                        context, ChickenStageFormScreen.routeName,
                        arguments: item);
                  },
                  title: item.name,
                ),
              ),
            ),
          )),
    );
  }
}
