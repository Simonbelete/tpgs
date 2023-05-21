import 'dart:io';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/util/dio_client.dart';
import 'package:path_provider/path_provider.dart';
import 'package:open_file/open_file.dart';

class ExportData extends StatefulWidget {
  const ExportData({super.key});

  @override
  State<ExportData> createState() => _ExportDataState();
}

class _ExportDataState extends State<ExportData> {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
            onPressed: () {
              openFile('/export/weights/csv/', 'weight.csv');
            },
            child: const Text('Export Chicken Weight Csv')),
        ElevatedButton(
            onPressed: () {}, child: const Text('Export Chicken Weight Excel')),
      ],
    );
  }

  Future openFile(String url, String name) async {
    final file = await downloadFile(url, name);

    if (file == null) return null;
    var filePath = file.path;

    final _result = await OpenFile.open(filePath);
    print(_result.message);
  }

  Future<File?> downloadFile(String url, String name) async {
    final storage = await getApplicationDocumentsDirectory();
    final file = File('${storage.path}/$name');

    final response = await dioClient.get(
      url,
      options: Options(
        responseType: ResponseType.bytes,
        followRedirects: false,
        receiveTimeout: 0,
        headers: {
          Headers.wwwAuthenticateHeader:
              await _auth.currentUser?.getIdToken(), // set content-length
        },
      ),
    );

    file.writeAsBytesSync(response.data);

    return file;
  }
}
