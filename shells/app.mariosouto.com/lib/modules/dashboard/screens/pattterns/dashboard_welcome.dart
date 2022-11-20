import 'package:flutter/material.dart';

class DashboardWelcome extends StatelessWidget {
  const DashboardWelcome({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red.shade100,
      child: Column(
        children: const [
          Text("Good morning, Mario Souto"),
          Text("ICON_OCTOCAT @omariosouto"),
          Text("✅ Membro Ativo do Canal"),
          Text("Você assistiu todos os vídeos, isso é incrível!!!"),
        ],
      ),
    );
  }
}
