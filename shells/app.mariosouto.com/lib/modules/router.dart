import 'package:app_mariosouto_com/modules/dashboard/routes.dart';
import 'package:app_mariosouto_com/modules/login/routes.dart';
import 'package:armor/armor.dart';

final router = NuRouter(routes: [
  ...loginRoutes,
  ...dashboardRoutes,
]);
