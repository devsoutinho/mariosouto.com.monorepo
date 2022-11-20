import 'package:app_mariosouto_com/default_stuff.dart';
import 'package:armor/armor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class DashboardDiscoveryBoxes extends StatelessWidget {
  const DashboardDiscoveryBoxes({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: AppBaseTheme.scale_x8),
      padding: EdgeInsets.symmetric(
        horizontal: context.responsive.value({
          Breakpoints.xs: AppBaseTheme.scale_x4,
          Breakpoints.sm: AppBaseTheme.scale_x6,
          Breakpoints.lg: AppBaseTheme.scale_x8,
        }),
      ),
      child: GridItem(
        children: [
          const Text(
            "Conteúdos do DevSoutinho",
            style: TextStyle(
              color: AppBaseTheme.themeGrey002,
              fontSize: 18,
              fontWeight: FontWeight.w500,
              height: 1.5,
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: AppBaseTheme.scale_x2),
            child: StaggeredGrid.count(
              crossAxisCount: context.responsive.value({
                Breakpoints.xs: 1,
                Breakpoints.sm: 2,
                Breakpoints.md: 3,
              }),
              crossAxisSpacing: 20,
              mainAxisSpacing: 20,
              children: const [
                _Card(
                  title: "Videos",
                  descriptionValue: AppBaseData.totalVideos,
                  icon: Icons.movie,
                ),
                _Card(
                  title: "Shorts",
                  descriptionValue: AppBaseData.totalShorts,
                  icon: Icons.play_arrow,
                ),
                _Card(
                  title: "Cursos",
                  descriptionValue: AppBaseData.totalCursos,
                  icon: Icons.school,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Card extends StatelessWidget {
  final String title;
  final String descriptionValue;
  final IconData icon;

  const _Card({
    Key? key,
    required this.title,
    required this.descriptionValue,
    required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.hardEdge,
      decoration: BoxDecoration(
        color: AppBaseTheme.themeBackgroundWhite,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            offset: const Offset(0, 1),
            blurRadius: 3,
            spreadRadius: 0,
          ),
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            offset: const Offset(0, 1),
            blurRadius: 2,
            spreadRadius: -1,
          ),
        ],
      ),
      child: GridItem(
        as: Column,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Icon(
                  icon,
                  color: AppBaseTheme.themeGrey001,
                  size: 24.0,
                  semanticLabel: 'Text to announce in accessibility modes',
                ),
                Container(
                  margin: const EdgeInsets.only(left: AppBaseTheme.scale_x5),
                  child: GridItem(
                    as: Column,
                    children: [
                      Text(title),
                      Text(descriptionValue),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Material(
            color: AppBaseTheme.themeBackgroundGrey001,
            child: InkWell(
              onTap: () {
                print("Oi");
              },
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: const Text("Ver todos"),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
