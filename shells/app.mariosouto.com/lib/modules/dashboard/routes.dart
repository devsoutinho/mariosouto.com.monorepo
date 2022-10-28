import 'package:armor/armor.dart';
import 'package:app_mariosouto_com/modules/dashboard/screens/home_screen.dart';
import 'package:app_mariosouto_com/modules/dashboard/screens/settings_screen.dart';

final dashboardRoutes = [
  NuRoute(
    path: DashboardHomeScreen.path,
    builder: (context, state) {
      return const DashboardHomeScreen();
    },
    routes: [
      NuRoute(
        path: DashboardSettingsScreen.path,
        builder: (context, state) {
          return const DashboardSettingsScreen();
        },
      ),
    ],
  ),
];
