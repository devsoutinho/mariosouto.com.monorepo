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
      appBar: AppBar(
        title: const Text("Login"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.network(
              "https://via.placeholder.com/56x48.jpg",
              width: 56,
              height: 48,
            ),
            const Text('Sign in to your account'),
            RichText(
              text: TextSpan(
                children: [
                  const TextSpan(
                    style: TextStyle(color: Colors.black, fontSize: 14),
                    text: "Or ",
                  ),
                  TextSpan(
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                    text: "start your 14-day free trial",
                    recognizer: TapGestureRecognizer()
                      ..onTap =
                          () => launchUrl(Uri.parse("https://mariosouto.com/")),
                  )
                ],
              ),
            ),
            Container(
              color: Colors.white,
              child: Column(
                children: const [
                  TextField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Email',
                    ),
                  ),
                  TextField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                    ),
                  ),
                ],
              ),
            ),
            const Text('Remember me [CHECKBOX]'),
            const Text('Forgot your password?'),
            ElevatedButton(
              onPressed: () => go("/dashboard", context),
              child: const Text('Sign in'),
            ),
            const Text('--------------- Or continue with ---------------'),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => go("/dashboard", context),
                  child: const Text('Twitter'),
                ),
                ElevatedButton(
                  onPressed: () => go("/dashboard", context),
                  child: const Text('Facebook'),
                ),
                ElevatedButton(
                  onPressed: () => go("/dashboard", context),
                  child: const Text('GitHub'),
                ),
              ],
            ),
            // ElevatedButton(
            //   onPressed: () => go("/dashboard", context),
            //   child: const Text('Go to Dashboard'),
            // ),
          ],
        ),
      ),
    );
  }
}
