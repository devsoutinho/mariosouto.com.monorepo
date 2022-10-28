import 'package:armor/armor.dart';
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
            const Text(
              'You are inside the Login!',
            ),
            ElevatedButton(
              onPressed: () => go("/dashboard", context),
              child: const Text('Go to Dashboard'),
            ),
          ],
        ),
      ),
    );
  }
}
