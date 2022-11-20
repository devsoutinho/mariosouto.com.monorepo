import 'package:app_mariosouto_com/default_stuff.dart';
import 'package:armor/armor.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

// https://tailwindui.com/components/application-ui/forms/sign-in-forms#component-bc08eb211afa45fad7c9f89c1891f284
class LoginHomeScreen extends StatelessWidget {
  static String get path => '/login';

  const LoginHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppBaseTheme.themeBackgroundGrey001,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const AppLogo(),
            Container(
              margin: const EdgeInsets.only(top: AppBaseTheme.scale_x6),
              child: const Text(
                'Entre na sua conta agora!',
                style: TextStyle(
                  color: AppBaseTheme.themeGrey002,
                  fontSize: 30,
                  height: 1.2,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.025,
                ),
              ),
            ),

            RichText(
              text: TextSpan(
                children: [
                  const TextSpan(
                    style: TextStyle(
                      color: AppBaseTheme.themeGrey003,
                      fontSize: 14,
                    ),
                    text: "Ou ",
                  ),
                  TextSpan(
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppBaseTheme.themeBlueIndigo001,
                      fontWeight: FontWeight.w500,
                    ),
                    text: "confira o que temos na plataforma",
                    recognizer: TapGestureRecognizer()
                      ..onTap =
                          () => launchUrl(Uri.parse("https://mariosouto.com/")),
                  )
                ],
              ),
            ),

            // Container(
            //   color: Colors.white,
            //   child: Column(
            //     children: const [
            //       TextField(
            //         decoration: InputDecoration(
            //           border: OutlineInputBorder(),
            //           labelText: 'Email',
            //         ),
            //       ),
            //       TextField(
            //         decoration: InputDecoration(
            //           border: OutlineInputBorder(),
            //           labelText: 'Password',
            //         ),
            //       ),
            //     ],
            //   ),
            // ),

            // const Text('Remember me [CHECKBOX]'),
            // const Text('Forgot your password?'),
            // ElevatedButton(
            //   onPressed: () => go("/dashboard", context),
            //   child: const Text('Sign in'),
            // ),
            // const Text('--------------- Or continue with ---------------'),
            // Row(
            //   mainAxisAlignment: MainAxisAlignment.center,
            //   children: [
            //     ElevatedButton(
            //       onPressed: () => go("/dashboard", context),
            //       child: const Text('Twitter'),
            //     ),
            //     ElevatedButton(
            //       onPressed: () => go("/dashboard", context),
            //       child: const Text('Facebook'),
            //     ),
            //     ElevatedButton(
            //       onPressed: () => go("/dashboard", context),
            //       child: const Text('GitHub'),
            //     ),
            //   ],
            // ),
          ],
        ),
      ),
    );
  }
}

class AppLogo extends StatelessWidget {
  const AppLogo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 56,
      height: 56,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          image: AssetImage(
            "assets/images/logo.png",
          ),
          fit: BoxFit.fill,
        ),
      ),
    );
  }
}
