import 'package:flutter/material.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class UpdateButton extends StatelessWidget {
  const UpdateButton({super.key});

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: () async {
        var databasesPath = await getDatabasesPath();
        var path = join(databasesPath);
        FlutterDownloader.enqueue(
          url: 'your download link',
          savedDir: path,
          showNotification: true,
          openFileFromNotification: true,
        );
      },
      child: Text('Update'),
    );
  }
}
