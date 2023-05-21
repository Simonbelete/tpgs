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
        var path = join(databasesPath, "abc.db");
        FlutterDownloader.enqueue(
          url: 'your download link',
          savedDir: path,
          showNotification:
              true, // show download progress in status bar (for Android)
          openFileFromNotification:
              true, // click on notification to open downloaded file (for Android)
        );
      },
      child: Text('Update'),
    );
  }
}
