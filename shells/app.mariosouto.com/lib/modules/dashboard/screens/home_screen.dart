import 'package:app_mariosouto_com/modules/dashboard/screens/pattterns/dashboard_overview.dart';
import 'package:app_mariosouto_com/default_stuff.dart';
import 'package:armor/armor.dart';
import 'package:flutter/material.dart';

// https://tailwindui.com/components/application-ui/forms/sign-in-forms#component-bc08eb211afa45fad7c9f89c1891f284
class DashboardHomeScreen extends StatelessWidget {
  static String get path => '/dashboard';
  final String username = 'Mario Souto';

  const DashboardHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppBaseTheme.themeBackgroundColor,
      body: GridItem(
        as: Column,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // const Header(),
          // Text("Good morning, $username"),
          Container(
            margin: const EdgeInsets.symmetric(vertical: AppBaseTheme.scale_x8),
            width: context.responsive.value({Breakpoints.xs: 1000}),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: const [
                DashboardOverview(),
              ],
            ),
          ),
          // const Text("Latest Releases"),
          // const Text("Duke Street Studio"),
        ],
      ),
    );
  }
}

class Header extends StatelessWidget {
  const Header({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        Text("Logo"),
        Text("Global Search"),
      ],
    );
  }
}
