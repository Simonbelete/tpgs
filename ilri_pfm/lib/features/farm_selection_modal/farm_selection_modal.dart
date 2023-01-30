import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/models/farm_model.dart';
import 'package:ilri_pfm/repository/farm_repository.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class FarmSelectionModal extends StatefulWidget {
  const FarmSelectionModal({super.key});

  @override
  State<FarmSelectionModal> createState() => _FarmSelectionModalState();
}

class _FarmSelectionModalState extends State<FarmSelectionModal> {
  static const _pageSize = 20;
  int? _farmId;

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
    return Container(
      color: Colors.transparent,
      height: size.height * 0.8,
      child: Center(
          child: PagedListView<int, Farm>(
        pagingController: _pagingController,
        builderDelegate: PagedChildBuilderDelegate<Farm>(
          itemBuilder: (context, item, index) => Container(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: ListTile(
              title: BodyText(text: item.name),
              leading: Radio<int>(
                groupValue: _farmId,
                value: item.id ?? 0,
                onChanged: (int? value) {
                  setState(() {
                    _farmId = value;
                  });
                },
              ),
            ),
          ),
        ),
      )),
    );
  }
}
