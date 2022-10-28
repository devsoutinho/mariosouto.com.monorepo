import 'package:armor/armor.dart';
import 'package:flutter/material.dart';

// https://tailwindui.com/components/application-ui/forms/sign-in-forms#component-bc08eb211afa45fad7c9f89c1891f284
class DashboardSettingsScreen extends StatelessWidget {
  static String get path => 'settings';

  const DashboardSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Dashboard Settings"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'STOP! You are inside the dashboard settings 🔚',
            ),
            ElevatedButton(
              onPressed: () => NuRouter.of(context).go("/dashboard"),
              child: const Text('Go to back to dashboard'),
            ),
          ],
        ),
      ),
    );
  }
}
