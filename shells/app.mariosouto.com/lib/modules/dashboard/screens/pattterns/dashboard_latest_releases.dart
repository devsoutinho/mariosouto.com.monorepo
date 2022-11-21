import 'package:flutter/material.dart';

class DashboardLatestReleases extends StatelessWidget {
  const DashboardLatestReleases({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red.shade100,
      child: Column(
        children: const [
          Text("Latest releases"),
          Text(
              "Carregar o último video lançado com a opção de marcar como visto e adicionar notas de estudo"),
          Text(
              "Importante carregar também o 'miniquiz' do vídeo, criar as perguntas de forma solta e atrelar elas no vídeo de algum jeito"),
        ],
      ),
    );
  }
}
