import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';

class HtmlViewer extends StatelessWidget {
  final String content;
  const HtmlViewer({super.key, required this.content});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(child: Html(data: content));
  }
}
