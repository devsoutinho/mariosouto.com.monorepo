import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class NuRouter extends GoRouter {
  NuRouter({required List<GoRoute> routes}) : super(routes: routes);

  static GoRouter of(BuildContext context) {
    final InheritedGoRouter? inherited =
        context.dependOnInheritedWidgetOfExactType<InheritedGoRouter>();
    assert(inherited != null, 'No GoRouter found in context');
    return inherited!.goRouter;
  }
}

class NuRoute extends GoRoute {
  NuRoute({
    required String path,
    required Widget Function(BuildContext, GoRouterState) builder,
    List<RouteBase> routes = const <RouteBase>[],
  }) : super(path: path, builder: builder, routes: routes);
}

void go(String path, BuildContext context) {
  final router = GoRouter.of(context);
  router.push(path);
}
