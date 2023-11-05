import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:nea/constants.dart';
import 'package:nea/utils/preferencess.dart';
import 'package:nea/widgets/my_button.dart';
import 'package:nea/widgets/my_textfield.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl_phone_field/intl_phone_field.dart';

class LoginBodyScreen extends StatefulWidget {
  const LoginBodyScreen({super.key});

  @override
  State<LoginBodyScreen> createState() => _LoginBodyScreenState();
}

class _LoginBodyScreenState extends State<LoginBodyScreen> {
  FirebaseAuth auth = FirebaseAuth.instance;
  FirebaseFirestore db = FirebaseFirestore.instance;

  final phoneNumberController = TextEditingController();

  String _errorMessage = "";
  bool _verifyTab = false;
  String verificationId = "";
  String otp = "";
  bool loading = false;
  String _phoneNumber = "";

  void signUserIn() async {
    validatePhoneNumber(phoneNumberController.text);
    if (phoneNumberController.text == null) return;

    setState(() {
      loading = true;
    });

    try {
      // Masuk menggunakan email dan password
      await auth.verifyPhoneNumber(
          phoneNumber: _phoneNumber,
          verificationCompleted: (PhoneAuthCredential credential) async {},
          verificationFailed: (FirebaseAuthException e) {
            if (e.code == 'invalid-phone-number') {
              setState(() {
                _errorMessage = "The provided phone number is not valid.";
              });
            } else {
              setState(() {
                _errorMessage = "Failed to verify, please try again";
                loading = false;
              });
            }
          },
          codeSent: (String verId, int? resendToken) {
            verificationId = verId;
            setState(() {
              loading = false;
            });
            otpDialogBox(context).then((value) {});
          },
          codeAutoRetrievalTimeout: (String verificationId) {});
    } on FirebaseAuthException catch (e) {
      showErrorMessage(e.code);
      setState(() {
        loading = false;
      });
    }
  }

  void showErrorMessage(String message) {
    // Tampilkan dialog dengan pesan error
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text(message),
          );
        });
  }

  void validatePhoneNumber(String val) {
    if (val.isEmpty) {
      setState(() {
        _errorMessage = "Please enter phone number";
      });
    } else {
      setState(() {
        _errorMessage = "";
      });
    }
  }

  Future<void> signIn(String otp) async {
    if (otp == null) return;

    PhoneAuthCredential credential = PhoneAuthProvider.credential(
        verificationId: verificationId, smsCode: otp);
    await auth.signInWithCredential(credential);
    final cred = await FirebaseAuth.instance.signInWithCredential(credential);
    final userCollection = await db
        .collection('users')
        .where('uid', isEqualTo: cred.user?.uid)
        .limit(1)
        .get();
    if (userCollection.docs.length == 0) {
      await db.collection('users').add({
        'name': cred.user?.phoneNumber ?? "",
        'role': 'user',
        'uid': cred.user?.uid
      });
      await Preferencess.setRole('user');
    } else {
      await Preferencess.setRole(userCollection.docs[0]['role']);
    }
  }

  otpDialogBox(BuildContext context) {
    return showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Enter OTP'),
            content: Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextFormField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(30),
                    ),
                  ),
                ),
                onChanged: (value) {
                  otp = value;
                },
              ),
            ),
            contentPadding: EdgeInsets.all(10.0),
            actions: <Widget>[
              OutlinedButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text('Cancel')),
              ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: primaryColor),
                onPressed: () {
                  Navigator.of(context).pop();
                  signIn(otp);
                },
                child: const Text(
                  'Login',
                ),
              ),
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: primaryColor,
          elevation: 0,
        ),
        resizeToAvoidBottomInset: false,
        backgroundColor: primaryColor,
        body: ListView(
          padding: const EdgeInsets.fromLTRB(0, 400, 0, 0),
          shrinkWrap: true,
          reverse: true,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Stack(
                  children: [
                    Container(
                      height: 535,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: HexColor("#ffffff"),
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(40),
                          topRight: Radius.circular(40),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(30, 20, 30, 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Log In",
                              style: GoogleFonts.poppins(
                                fontSize: 40,
                                fontWeight: FontWeight.bold,
                                color: HexColor("#4f4f4f"),
                              ),
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            Padding(
                              padding: const EdgeInsets.fromLTRB(15, 0, 0, 20),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Phone number",
                                    style: GoogleFonts.poppins(
                                      fontSize: 18,
                                      color: HexColor("#8d8d8d"),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  IntlPhoneField(
                                    decoration: const InputDecoration(
                                      labelText: 'Phone Number',
                                      border: OutlineInputBorder(
                                        borderSide: BorderSide(),
                                      ),
                                    ),
                                    initialCountryCode: 'IN',
                                    onChanged: (phone) {
                                      setState(() {
                                        _phoneNumber = phone.completeNumber;
                                      });
                                    },
                                    controller: phoneNumberController,
                                  ),
                                  // MyTextField(
                                  //   onChanged: ((String val) {
                                  //     validatePhoneNumber(val);
                                  //   }),
                                  //   controller: phoneNumberController,
                                  //   hintText: "091123456789",
                                  //   obscureText: false,
                                  //   prefixIcon: const Icon(Icons.phone),
                                  // ),
                                  Padding(
                                    padding:
                                        const EdgeInsets.fromLTRB(8, 0, 0, 0),
                                    child: Text(
                                      _errorMessage,
                                      style: GoogleFonts.poppins(
                                        fontSize: 12,
                                        color: Colors.red,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  const SizedBox(
                                    height: 20,
                                  ),
                                  MyButton(
                                    onPressed: signUserIn,
                                    buttonText:
                                        loading ? 'Sending...' : 'Login',
                                  ),
                                  const SizedBox(
                                    height: 12,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Transform.translate(
                      offset: const Offset(50, -170),
                      child: Image.asset(
                        'assets/images/ilri-cgiar.png',
                        scale: 1,
                        width: 300,
                      ),
                    ),
                  ],
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
