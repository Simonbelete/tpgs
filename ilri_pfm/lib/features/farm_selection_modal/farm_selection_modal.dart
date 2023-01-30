import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilri_pfm/blocs/farm/bloc.dart';
import 'package:ilri_pfm/blocs/farm/states.dart';
import 'package:ilri_pfm/models/farm_model.dart';

class FarmSelectionModal extends StatelessWidget {
  const FarmSelectionModal({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red,
      height: 200,
      child: Center(
          child: Column(
        children: [Text('Hellow Modal')],
      )),
    );
  }
}

class FarmSelectionInit extends StatefulWidget {
  const FarmSelectionInit({super.key});

  @override
  State<FarmSelectionInit> createState() => _FarmSelectionInitState();
}

class _FarmSelectionInitState extends State<FarmSelectionInit> {
  @override
  Widget build(BuildContext context) {
    return BlocListener<FarmBloc, FarmState>(
      listener: (context, state) {
        _dialogBuilder(context);
      },
      child: Container(),
    );
  }

  Future<void> _dialogBuilder(BuildContext context) {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Basic dialog title'),
          content: const Text('A dialog is a type of modal window that\n'
              'appears in front of app content to\n'
              'provide critical information, or prompt\n'
              'for a decision to be made.'),
          actions: <Widget>[
            TextButton(
              style: TextButton.styleFrom(
                textStyle: Theme.of(context).textTheme.labelLarge,
              ),
              child: const Text('Disable'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              style: TextButton.styleFrom(
                textStyle: Theme.of(context).textTheme.labelLarge,
              ),
              child: const Text('Enable'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
