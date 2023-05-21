import 'package:nea/models/course_model.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

import 'dart:typed_data';
import 'dart:io';
import 'package:flutter/services.dart';

class SqliteService {
  Future<Database> initializeDB() async {
    var databasesPath = await getDatabasesPath();
    var path = join(databasesPath, "database.db");

    // Check if the database exists
    var exists = await databaseExists(path);

    if (true) {
      // Should happen only the first time you launch your application
      print("Creating new copy from asset");

      // Make sure the parent directory exists
      try {
        await Directory(dirname(path)).create(recursive: true);
      } catch (_) {}

      // Copy from asset
      ByteData data = await rootBundle.load(join("assets", "database.db"));
      List<int> bytes =
          data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);

      // Write and flush the bytes written
      await File(path).writeAsBytes(bytes, flush: true);
    } else {
      print("Opening existing database");
    }

    // open the database
    var db = await openDatabase(path, readOnly: true);
    return db;
  }

  // A method that retrieves all the dogs from the dogs table.
  Future<List<Course>> courses() async {
    // Get a reference to the database.
    final db = await initializeDB();

    // Query the table for all The Dogs.
    final List<Map<String, dynamic>> maps = await db.query('courses');

    // Convert the List<Map<String, dynamic> into a List<Dog>.
    return List.generate(maps.length, (i) {
      return Course(
        id: maps[i]['id'],
        title_en: maps[i]['title_en'],
        title_am: maps[i]['title_am'],
        title_sw: maps[i]['title_sw'],
        coverImage: maps[i]['coverImage'],
        coverImage_en: maps[i]['coverImage_en'],
        coverImage_am: maps[i]['coverImage_am'],
        coverImage_sw: maps[i]['coverImage_sw'],
        content_en: maps[i]['content_en'],
        content_am: maps[i]['content_am'],
        content_sw: maps[i]['content_sw'],
      );
    });
  }
}
