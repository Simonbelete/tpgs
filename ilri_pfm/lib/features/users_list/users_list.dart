import 'package:colorize_text_avatar/colorize_text_avatar.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/data_tile.dart';
import 'package:ilri_pfm/common_widgets/sub_title_text.dart';
import 'package:ilri_pfm/common_widgets/title_text.dart';
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
                  child: InkWell(
                    onTap: () {
                      Navigator.pushNamed(context, UsersFormScreen.routeName,
                          arguments: item);
                    },
                    child: Container(
                      width: size.width * 0.8,
                      padding: const EdgeInsets.symmetric(
                          vertical: 10.0, horizontal: 20.0),
                      decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(
                            color: Color(0xffE3E3E5),
                          ),
                          borderRadius: BorderRadius.circular(10.0)),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                TextAvatar(
                                  shape: Shape.Circular,
                                  size: 50,
                                  textColor: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w600,
                                  upperCase: true,
                                  backgroundColor: Colors.black,
                                  numberLetters: 2,
                                  text: item.email,
                                ),
                                const SizedBox(
                                  width: 20,
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    TitleText(text: item.name ?? ''),
                                    TitleText(text: item.email),
                                    const SizedBox(
                                      height: 5,
                                    ),
                                    Row(
                                      children: [
                                        SubTitleText(
                                            text: item.is_admin == true
                                                ? 'Admin'
                                                : ''),
                                        const SizedBox(
                                          width: 5,
                                        ),
                                        SubTitleText(
                                            text: item.is_farmer == true
                                                ? 'Farmer'
                                                : ''),
                                      ],
                                    )
                                  ],
                                )
                              ],
                            ),
                          ]),
                    ),
                  )),
            ),
          )),
    );
  }

  @override
  void dispose() {
    _pagingController.dispose();
    super.dispose();
  }
}
