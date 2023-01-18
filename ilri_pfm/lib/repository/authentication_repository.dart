import 'package:firebase_auth/firebase_auth.dart';
import 'package:ilri_pfm/repository/repository.dart';

class AuthenticationRepository extends Repository {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> signIn({required String email, required String password}) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email, password: password);
    } on FirebaseAuthException catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<void> signUp({required String email, required String password}) async {
    try {
      await _auth.createUserWithEmailAndPassword(
          email: email, password: password);
    } on FirebaseAuthException catch (e) {
      throw Exception('Error firebase');
    } catch (e) {
      throw Exception(e.toString());
    }
  }
}
