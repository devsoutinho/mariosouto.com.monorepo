import 'package:app_mariosouto_com/modules/login/screens/home_screen.dart';
import 'package:armor/armor.dart';

final loginRoutes = [
  NuRoute(
    path: '/',
    builder: (context, state) => const LoginHomeScreen(),
  ),
  NuRoute(
    path: LoginHomeScreen.path,
    builder: (context, state) => const LoginHomeScreen(),
  ),
];
