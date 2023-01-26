import 'package:google_fonts/google_fonts.dart';
import 'package:flutter/material.dart';
import 'package:ilri_pfm/app/color_set.dart';
import 'package:ilri_pfm/common_widgets/body_text.dart';
import 'package:ilri_pfm/common_widgets/button.dart';
import 'package:ilri_pfm/common_widgets/header_text.dart';
import 'package:ilri_pfm/screens/login_screen.dart';
import 'package:ilri_pfm/screens/register_screen.dart';

class OnBoardingSlide extends StatelessWidget {
  const OnBoardingSlide({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: size.width,
      child: Stack(
        children: [
          Positioned(
              top: 0,
              right: 0,
              left: 0,
              child: Center(
                child: Image.asset(
                  'assets/images/chicken_onboarding_image.png',
                  height: 350,
                ),
              )),
          Positioned(
              left: 0,
              top: size.height * 0.5,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 25.0, vertical: 10.0),
                      child: Text(
                        'Let\'s Get \nStarted',
                        style: GoogleFonts.roboto(
                            fontSize: 50.0,
                            color: kTextColor,
                            fontWeight: FontWeight.w900),
                      )),
                  const SizedBox(
                    height: 20,
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 25.0),
                    child: BodyText(
                      text: 'Find all your poultry data in one place',
                    ),
                  ),
                  const SizedBox(
                    height: 50.0,
                  ),
                  Container(
                    width: size.width,
                    child: Center(
                      child: SizedBox(
                        width: size.width * 0.8,
                        child: Button(
                          backgroundColor: Colors.white,
                          color: kSecondaryColor,
                          child: const Text(
                            'Sing Up',
                          ),
                          onPressed: () {
                            Navigator.pushNamed(
                                context, RegisterScreen.routeName);
                          },
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                      width: size.width,
                      child: InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, LoginScreen.routeName);
                        },
                        child: Center(
                          child: Text(
                            'Already have an account? Login',
                            style: GoogleFonts.roboto(
                              fontSize: 12.0,
                              color: kTextColor,
                            ),
                          ),
                        ),
                      )),
                ],
              ))
        ],
      ),
    );
  }
}

// Container(
//       alignment: Alignment.bottomLeft,
//       padding: EdgeInsets.symmetric(vertical: size.height * 0.05),
//       height: size.height,
//       width: size.width,
//       child: Column(
//         // crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           HeaderText(text: 'Leg\'s Get Started'),

//           HeaderText(text: 'Leg\'s Get Started'),
//           HeaderText(text: 'Leg\'s Get Started'),
//           HeaderText(text: 'Leg\'s Get Started'),
//           // SizedBox(
//           //   width: 200,
//           //   child: Text(
//           //     'Manage all poultry data in one place',
//           //     style: Theme.of(context).textTheme.subtitle1,
//           //   ),
//           // ),
//           // const SizedBox(
//           //   height: 50,
//           // ),
//           // Positioned(
//           //   child: Row(
//           //     mainAxisAlignment: MainAxisAlignment.center,
//           //     children: [
//           //       Button(
//           //         child: const Text(
//           //           'Sing Up',
//           //         ),
//           //         onPressed: () {
//           //           Navigator.pushNamed(context, RegisterScreen.routeName);
//           //         },
//           //       ),
//           //       const SizedBox(
//           //         width: 20,
//           //       ),
//           //       Button(
//           //         outlined: true,
//           //         child: const Text(
//           //           'Sing In',
//           //         ),
//           //         onPressed: () {
//           //           Navigator.pushNamed(context, LoginScreen.routeName);
//           //         },
//           //       )
//           //     ],
//           //   ),
//           // )
//         ],
//       ),
//     );