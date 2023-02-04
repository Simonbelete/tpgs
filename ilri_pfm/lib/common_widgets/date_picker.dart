import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/form_text_box.dart';

class DatePicker extends StatefulWidget {
  final TextEditingController? controller;

  const DatePicker({super.key, this.controller});

  @override
  State<DatePicker> createState() => _DatePickerState();
}

class _DatePickerState extends State<DatePicker> {
  @override
  Widget build(BuildContext context) {
    return FormTextBox(
      controller: widget.controller,
      icon: const Icon(Icons.calendar_today),
      iconColor: kPrimaryColor,
      onTab: () async {
        DateTime? pickedDate = await showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(1950),
            lastDate: DateTime(2100));
        if (pickedDate != null) {
          String formattedDate = DateFormat('yyyy-MM-dd').format(pickedDate);
          setState(() {
            widget.controller?.text = formattedDate;
          });
        }
      },
    );
  }
}
