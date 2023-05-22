import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

void syncDatabase(int progress) async {
  if (progress == 100) {
    var dir = await getExternalStorageDirectory();
    var path = dir?.path;

    var databasesPath = await getDatabasesPath();
    var dbPath = join(databasesPath, "database.db");

    var downloadedFile = await File(path ?? "").readAsBytes();
    await File(dbPath).writeAsBytes(downloadedFile, flush: true);
  }
}
