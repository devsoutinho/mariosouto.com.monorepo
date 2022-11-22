import 'dart:async';

import 'package:app_mariosouto_com/default_stuff.dart';
import 'package:app_mariosouto_com/modules/login/screens/models/user.dart'
    as model;
import 'package:armor/armor.dart';
import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({
    Key? key,
  }) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _user = model.User();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(bottom: AppBaseTheme.scale_x6),
            child: TextFormField(
              initialValue: _user.email,
              onChanged: (value) => setState(() {
                _user.email = value;
              }),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Por favor, digite seu e-mail';
                }
                if (!value.contains("@")) {
                  return 'Por favor, digite um e-mail válido';
                }

                return null;
              },
              decoration: const InputDecoration(
                floatingLabelStyle: TextStyle(
                  color: AppBaseTheme.themeBlueOrangeVivid001,
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: AppBaseTheme.themeBlueOrangeVivid001,
                  ),
                ),
                border: OutlineInputBorder(),
                labelText: 'Email',
              ),
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(6),
              ),
              backgroundColor: AppBaseTheme.themeBlueOrangeVivid001,
              minimumSize: const Size.fromHeight(48),
            ),
            onPressed: () async {
              var form = _formKey.currentState;
              if (form!.validate()) {
                form.save();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Logging you in...'),
                    duration: Duration(seconds: 1),
                  ),
                );

                // Timer(
                //   const Duration(seconds: 2),
                //   () => go("/dashboard", context),
                // );

                // ScaffoldMessenger.of(context).showSnackBar(
                //   const SnackBar(
                //     content: Text('Welcome!'),
                //   ),
                // );
              }
            },
            child: const Text("Continue com seu E-mail"),
          ),
        ],
      ),
    );
  }
}
