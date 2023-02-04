import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/activate_icon.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/container_card.dart';
import 'package:ilri_pfm/common_widgets/custom_switch.dart';
import 'package:ilri_pfm/common_widgets/date_picker.dart';
import 'package:ilri_pfm/common_widgets/deactivate_icon.dart';
import 'package:ilri_pfm/common_widgets/delete_icon.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';
import 'package:ilri_pfm/features/dropdown_searches/breed_type_dropdown_search.dart';
import 'package:ilri_pfm/features/dropdown_searches/chicken_dropdown_search.dart';
import 'package:ilri_pfm/models/breed_type.dart';
import 'package:ilri_pfm/models/chicken.dart';
import 'package:ilri_pfm/models/egg.dart';
import 'package:ilri_pfm/models/layed_place.dart';
import 'package:ilri_pfm/repository/egg_repository.dart';
import 'package:ilri_pfm/screens/layed_place_screen.dart';

class EggProductionForm extends StatefulWidget {
  final Egg? egg;

  const EggProductionForm({super.key, this.egg});

  @override
  State<EggProductionForm> createState() => _EggProductionFormState();
}

class _EggProductionFormState extends State<EggProductionForm>
    with TickerProviderStateMixin {
  final EggRepository _repository = EggRepository();
  final _formKey = GlobalKey<FormState>();
  late TabController _tabController;

  final TextEditingController _dateController = TextEditingController();
  Chicken? _mother = null;
  BreedType? _breedType = null;
  bool _isActive = false;
  // Chicken
  final TextEditingController _tagController = TextEditingController();

  @override
  void initState() {
    setState(() {
      // _nameController.text = widget.egg?. ?? '';
    });
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  String? _commonTextValidator(String? value) {
    return value?.isEmpty == true ? 'Please enter a valid data' : null;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Column(
      children: [
        ContainerCard(
            child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DatePicker(
                controller: _dateController,
              ),
              const SizedBox(
                height: 20,
              ),
              ChickenDropdownSearch(
                hintText: 'Mother',
                labelText: 'Enter Egg Mother',
                title: 'Mother',
                onChange: (data) {
                  _mother = data;
                },
              ),
              const SizedBox(
                height: 30,
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    child: TabBar(
                        labelColor: kSecondaryColor,
                        controller: _tabController,
                        tabs: const [
                          Icon(
                            Icons.add_box,
                            color: kIconcolor,
                          ),
                          Icon(
                            Icons.select_all,
                            color: kIconcolor,
                          )
                        ]),
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  Container(
                      height: 150,
                      child: TabBarView(
                        controller: _tabController,
                        children: [
                          Column(
                            children: [
                              FormTextBox(
                                controller: _tagController,
                                validator: _commonTextValidator,
                                hintText: 'Tag',
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              BreedTypeDropdownSearch(
                                onChange: (data) {
                                  setState(() {
                                    _breedType = data;
                                    print(data?.id);
                                  });
                                },
                              ),
                            ],
                          ),
                          // Drop down select
                          ChickenDropdownSearch(
                            onChange: (data) {},
                          )
                        ],
                      ))
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              CustomSwitch(
                  text: 'Active',
                  value: widget.egg != null ? widget.egg?.is_active : true,
                  onChanged: (bool value) {
                    setState(() {
                      _isActive = value;
                    });
                  }),
              const SizedBox(
                height: 20,
              ),
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
                        if (widget.egg == null)
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
        )),
        const SizedBox(
          height: 20,
        ),
        Visibility(
          visible: widget.egg != null ? true : false,
          child: ContainerCard(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              widget.egg?.is_active == true
                  ? DeactivateIcon(
                      onPressed: deActivate,
                    )
                  : ActivateIcon(
                      onPressed: activate,
                    ),
              DeleteIcon(
                onPressed: () {},
              )
            ],
          )),
        )
      ],
    );
  }

  void create() async {
    if (_formKey.currentState!.validate()) {
      try {
        print('****************');
        print(_breedType?.id);
        final Egg? result = await _repository.create(Egg(
            date: DateTime.parse(_dateController.text),
            chicken: Chicken(tag: _tagController.text, breed_type: _breedType),
            is_active: _isActive));
        _responseMessage(result);
      } on DioError catch (e) {
        if (e.response != null) {
          print(e.response?.data);
          print(e.response?.headers);
          print(e.response?.requestOptions);
        } else {
          // Something happened in setting up or sending the request that triggered an Error
          print(e.requestOptions);
          print(e.message);
        }
        _errorMessage();
      } catch (e) {
        print(e.toString());
        _errorMessage();
      }
    }
  }

  void patch() async {
    if (_formKey.currentState!.validate()) {
      Map<String, dynamic> patchData = {};

      // if (_nameController.text != widget.egg?.name) {
      //   patchData['name'] = _nameController.text;
      // }
      // if (_isActive != widget.layedPlace?.is_active) {
      //   patchData['is_active'] = _isActive;
      // }

      if (patchData.isEmpty != true) {
        try {
          // final Egg? farm =
          //     await _repository.patch(id: widget.egg?.id ?? 0, data: patchData);
          // _responseMessage(farm);
        } catch (e) {
          _errorMessage();
        }
      } else {
        Navigator.popAndPushNamed(context, LayedPlaceScreen.routeName);
      }
    }
  }

  void activate() async {
    try {
      // final Egg? result =
      //     await _repository.updateState(id: widget.egg?.id ?? 0, state: true);
      // _responseMessage(result);
    } catch (e) {
      _errorMessage();
    }
  }

  void deActivate() async {
    try {
      // final Egg? result =
      //     await _repository.updateState(id: widget.egg?.id ?? 0, state: false);
      // _responseMessage(result);
    } catch (e) {
      _errorMessage();
    }
  }

  void _responseMessage(Egg? data) {
    if (data != null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: kPrimaryColor,
        content: Text('Operation Successfully Completed'),
      ));
      Navigator.popAndPushNamed(context, LayedPlaceScreen.routeName);
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
