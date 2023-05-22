import 'package:flutter/material.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

class UpdateButton extends StatelessWidget {
  const UpdateButton({super.key});

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: () async {
        var dir = await getExternalStorageDirectory();
        var path = dir?.path;

        FlutterDownloader.enqueue(
          url: 'http://192.168.8.128:3000/database.db',
          savedDir: path ?? "",
          showNotification: true,
          openFileFromNotification: true,
        );
      },
      child: Text('Update'),
    );
  }
}
