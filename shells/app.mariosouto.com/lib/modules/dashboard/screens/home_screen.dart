import 'package:armor/armor.dart';
import 'package:flutter/material.dart';

// https://tailwindui.com/components/application-ui/forms/sign-in-forms#component-bc08eb211afa45fad7c9f89c1891f284
class DashboardHomeScreen extends StatelessWidget {
  static String get path => '/dashboard';

  const DashboardHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Dashboard"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You are inside the dashboard!',
            ),
            ElevatedButton(
              onPressed: () => NuRouter.of(context).go("/"),
              child: const Text('Go to back to login'),
            ),
            ElevatedButton(
              onPressed: () => NuRouter.of(context).go("/dashboard/settings"),
              child: const Text('Go to dashboard settings'),
            ),
          ],
        ),
      ),
    );
  }
}
