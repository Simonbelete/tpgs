import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ilri_pfm/exceptions/email_exists_exception.dart';
import 'package:ilri_pfm/exceptions/unknown_exception.dart';
import 'package:ilri_pfm/repository/repository.dart';
import 'package:ilri_pfm/exceptions/weak_password_exception.dart';

class AuthenticationRepository extends Repository {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> signInWithEmailAndPassword(
      {required String email, required String password}) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email, password: password);
    } on FirebaseAuthException catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<void> createUserWithEmailAndPassword(
      {required String email, required String password}) async {
    try {
      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      print(e.toString());
      if (e.code == 'weak-password') {
        throw (WeakPasswordException);
      } else if (e.code == 'email-already-in-use') {
        throw (EmailExistsException);
      }
      throw (UnknownException());
    } catch (e) {
      print(e.toString());
      throw (UnknownException(message: e.toString()));
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

  Future<UserCredential> signInWithGoogle() async {
    // Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

    // Obtain the auth details from the request
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;

    // Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    // Once signed in, return the UserCredential
    return await FirebaseAuth.instance.signInWithCredential(credential);
  }
}
