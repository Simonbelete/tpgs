import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/models/layed_place.dart';
import 'package:ilri_pfm/models/user_model.dart';
import 'package:ilri_pfm/repository/user_repository.dart';
import 'package:ilri_pfm/screens/users_screen.dart';

class UserForm extends StatefulWidget {
  final UserModel? user;

  const UserForm({super.key, this.user});

  @override
  State<UserForm> createState() => _UserFormState();
}

class _UserFormState extends State<UserForm> {
  final UserRepository _repository = UserRepository();

  final _formKey = GlobalKey<FormState>();

  bool _isActive = false;
  bool _isAdmin = false;
  bool _isApproved = false;
  bool _isFarmer = false;

  @override
  void initState() {
    setState(() {
      _isAdmin = widget.user?.is_admin ?? false;
      _isApproved = widget.user?.is_approved ?? false;
      _isFarmer = widget.user?.is_farmer ?? false;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return ContainerCard(
        child: Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HeaderText(text: widget.user?.name ?? ''),
          HeaderText(text: widget.user?.email ?? ''),
          const SizedBox(
            height: 20,
          ),

          CustomSwitch(
              value: _isAdmin,
              text: 'Admin',
              onChanged: (bool value) {
                _isAdmin = value;
              }),
          const SizedBox(
            height: 20,
          ),
          CustomSwitch(
              value: _isApproved,
              text: 'Approved',
              onChanged: (bool value) {
                _isApproved = value;
              }),
          const SizedBox(
            height: 20,
          ),
          CustomSwitch(
              value: _isFarmer,
              text: 'Farmer',
              onChanged: (bool value) {
                _isFarmer = value;
              }),
          const SizedBox(
            height: 20,
          ),
          CustomSwitch(
              value: _isActive,
              text: 'Active',
              onChanged: (bool value) {
                _isActive = value;
              }),
          const SizedBox(
            height: 20,
          ),
          // FormTextBox(hintText: 'Name', initialValue: widget.user?.name),
          // const SizedBox(
          //   height: 10,
          // ),
          // CustomSwitch(text: 'Active', onChanged: (bool value) {}),
          // const SizedBox(
          //   height: 20,
          // ),
          Container(
            width: size.width,
            child: Center(
              child: SizedBox(
                width: size.width * 0.8,
                child: Button(
                  backgroundColor: kPrimaryColor,
                  color: Colors.white,
                  child: const Text(
                    'Save',
                  ),
                  onPressed: () {
                    if (widget.user == null)
                      create();
                    else
                      patch();
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    ));
  }

  void create() {}

  void patch() async {
    if (_formKey.currentState!.validate()) {
      try {
        final UserModel? user = await _repository.patch(
            id: widget.user?.id ?? 0,
            data: {
              'is_admin': _isAdmin,
              'is_approved': _isApproved,
              'is_farmer': _isFarmer
            });
        _responseMessage(user);
      } catch (e) {
        _errorMessage();
      }
    }
  }

  void _responseMessage(UserModel? data) {
    if (data != null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kPrimaryColor,
        content: Text('Operation Successfully Completed'),
      ));
      Navigator.popAndPushNamed(context, UsersScreen.routeName);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kSecondaryColor,
        content: Text('Unknown Error occurred Please try again!'),
      ));
    }
  }

  void _errorMessage() {
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
      backgroundColor: kSecondaryColor,
      content: Text('Error occurred Please try again!'),
    ));
  }
}
