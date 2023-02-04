import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/data_tile.dart';
import 'package:ilri_pfm/features/weight_form/weight_form.dart';
import 'package:ilri_pfm/models/egg.dart';
import 'package:ilri_pfm/repository/egg_repository.dart';
import 'package:ilri_pfm/screens/egg_production_form_screen.dart';
import 'package:ilri_pfm/screens/weight_form_screen.dart';
import 'package:intl/intl.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/weight_model.dart';
import 'package:ilri_pfm/repository/weight_repository.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class EggProductionList extends StatefulWidget {
  final Chicken chicken;

  const EggProductionList({super.key, required this.chicken});

  @override
  State<EggProductionList> createState() => _EggProductionListState();
}

class _EggProductionListState extends State<EggProductionList> {
  static const _pageSize = 20;

  final PagingController<int, Egg> _pagingController =
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
      final List<Egg>? newItems = await EggRepository()
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
          child: PagedListView<int, Egg>(
            pagingController: _pagingController,
            builderDelegate: PagedChildBuilderDelegate<Egg>(
              itemBuilder: (context, item, index) => Container(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: DataTile(
                  onTab: () {
                    Navigator.pushNamed(
                        context, EggProductionFormScreen.routeName,
                        arguments: item);
                  },
                  title: item.date.toString(),
                ),
              ),
            ),
          )),
    );
  }
}
