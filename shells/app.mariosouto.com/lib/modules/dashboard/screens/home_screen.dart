import 'package:app_mariosouto_com/modules/dashboard/screens/pattterns/dashboard_header.dart';
import 'package:app_mariosouto_com/modules/dashboard/screens/pattterns/dashboard_discovery_boxes.dart';
import 'package:app_mariosouto_com/default_stuff.dart';
import 'package:app_mariosouto_com/modules/dashboard/screens/pattterns/dashboard_latest_releases.dart';
import 'package:app_mariosouto_com/modules/dashboard/screens/pattterns/dashboard_welcome.dart';
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
      appBar: AppBar(
        backgroundColor: AppBaseTheme.themeBlueOrangeVivid001,
        title: const Text('Dashboard'),
      ),
      backgroundColor: AppBaseTheme.themeBackgroundColor,
      body: SingleChildScrollView(
        child: GridItem(
          as: Column,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              width: context.responsive.value({Breakpoints.xs: 900}),
              child: const GridItem(
                as: Column,
                children: [
                  Text("Navigation (Conteúdo, Lojinha, Configurações)"),
                  DashboardHeader(),
                  DashboardWelcome(),
                  DashboardDiscoveryBoxes(),
                  DashboardLatestReleases(),
                ],
              ),
            ),
          ],
        ),
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
