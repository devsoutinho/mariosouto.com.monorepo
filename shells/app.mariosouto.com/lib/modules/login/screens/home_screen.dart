import 'package:app_mariosouto_com/default_stuff.dart';
import 'package:app_mariosouto_com/modules/login/screens/patterns/login_form.dart';
import 'package:armor/armor.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class LoginHomeScreen extends StatelessWidget {
  static String get path => '/login';

  const LoginHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppBaseTheme.themeBackgroundGrey001,
      body: Center(
        child: SingleChildScrollView(
          child: Center(
            child: Container(
              padding:
                  const EdgeInsets.symmetric(vertical: AppBaseTheme.scale_x8),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  LoginHeader(),
                  LoginOptions(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class LoginHeader extends StatelessWidget {
  const LoginHeader({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        const AppLogo(),
        Container(
          margin: const EdgeInsets.only(
            top: AppBaseTheme.scale_x6,
            bottom: AppBaseTheme.scale_x2,
          ),
          child: const Text(
            'Entre na sua conta agora!',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppBaseTheme.themeGrey002,
              fontSize: 30,
              height: 1.2,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.025,
            ),
          ),
        ),
        RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
            children: [
              const TextSpan(
                style: TextStyle(
                  color: AppBaseTheme.themeGrey003,
                  fontSize: 14,
                ),
                text: "Ou antes, ",
              ),
              TextSpan(
                style: const TextStyle(
                  fontSize: 14,
                  color: AppBaseTheme.themeBlueOrangeVivid001,
                  fontWeight: FontWeight.w500,
                ),
                text: "confira o que temos na plataforma",
                recognizer: TapGestureRecognizer()
                  ..onTap =
                      () => launchUrl(Uri.parse("https://mariosouto.com/")),
              )
            ],
          ),
        ),
      ],
    );
  }
}

class LoginOptions extends StatelessWidget {
  const LoginOptions({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppBaseTheme.scale_x10),
      decoration: BoxDecoration(
        borderRadius: context.responsive.value({
          Breakpoints.xs: BorderRadius.circular(0),
          Breakpoints.sm: BorderRadius.circular(8),
        }),
        color: AppBaseTheme.themeBackgroundWhite,
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
      width: context.responsive.screenWidth.value,
      constraints: const BoxConstraints(minWidth: 100, maxWidth: 448),
      margin: const EdgeInsets.only(top: AppBaseTheme.scale_x8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const LoginForm(),
          const SizedBox(height: 22),
          MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () => launchUrl(Uri.parse("https://mariosouto.com/")),
              child: const Text("← Voltar para o site"),
            ),
          ),
        ],
      ),
    );
  }
}

class AppLogo extends StatelessWidget {
  const AppLogo({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      height: 100,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          image: AssetImage(
            "assets/images/logo.png",
          ),
          fit: BoxFit.fill,
        ),
      ),
    );
  }
}
