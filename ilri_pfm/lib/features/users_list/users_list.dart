import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/data_tile.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/repository/user_repository.dart';
import 'package:ilri_pfm/screens/users_form_screen.dart';
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
          child: PagedListView<int, UserModel>(
            pagingController: _pagingController,
            builderDelegate: PagedChildBuilderDelegate<UserModel>(
              itemBuilder: (context, item, index) => Container(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: DataTile(
                  onTab: () {
                    Navigator.pushNamed(context, UsersFormScreen.routeName,
                        arguments: item);
                  },
                  title: item.email,
                ),
              ),
            ),
          )),
    );
  }

  // @override
  // Widget build(BuildContext context) {
  //   return PagedListView<int, UserModel>(
  //     pagingController: _pagingController,
  //     builderDelegate: PagedChildBuilderDelegate<UserModel>(
  //       itemBuilder: (context, item, index) => ListItem(
  //         title: item.email,
  //       ),
  //     ),
  //   );
  // }

  @override
  void dispose() {
    _pagingController.dispose();
    super.dispose();
  }
}
