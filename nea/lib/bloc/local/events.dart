import 'package:flutter/painting.dart';

abstract class LocalEvent {}

class LocalInit extends LocalEvent {}

class SetLocal extends LocalEvent {
  String local;

  SetLocal(this.local);
}
