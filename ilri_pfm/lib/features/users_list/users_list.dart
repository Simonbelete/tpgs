import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/list_item.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/repository/user_repository.dart';
import 'package:ilri_pfm/services/user_service.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class UsersList extends StatefulWidget {
  const UsersList({super.key});

  @override
  State<UsersList> createState() => _UsersListState();
}

class _UsersListState extends State<UsersList> {
  static const _pageSize = 20;

  final PagingController<int, UserModel> _pagingController =
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
      final List<UserModel>? newItems = await UserRepository()
          .get(query: {'limit': _pageSize, 'offset': _pageSize * pageKey});
      print('----------------------');
      print(_pageSize);
      print(pageKey);
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
    return PagedListView<int, UserModel>(
      pagingController: _pagingController,
      builderDelegate: PagedChildBuilderDelegate<UserModel>(
        itemBuilder: (context, item, index) => ListItem(
          title: item.email,
        ),
      ),
    );
  }

  @override
  void dispose() {
    _pagingController.dispose();
    super.dispose();
  }
}
