const NATIVE_PACKAGE = 'styled-components/native';
const WEB_PACKAGE = 'styled-components';
// const CORE_DEV_PACKAGE = '@skynexui/core/src';

function pathResolver(currentValue, opts) {
  // if(opts.devWeb) return currentValue.replace(NATIVE_PACKAGE, CORE_DEV_PACKAGE) + '/web';
  // if(opts.devNative) return currentValue.replace(NATIVE_PACKAGE, CORE_DEV_PACKAGE) + '/native';
  return currentValue.replace(NATIVE_PACKAGE, WEB_PACKAGE);
}


function isSkynexNativeModule({ source, specifiers }) {
  return source
    && source.value.startsWith(NATIVE_PACKAGE)
    && specifiers.length;
}

function isSkynexNativeRequire(t, node) {
  const { declarations } = node;
  if (declarations.length > 1) {
    return false;
  }
  const { id, init } = declarations[0];
  return (
    (t.isObjectPattern(id) || t.isIdentifier(id)) &&
    t.isCallExpression(init) &&
    t.isIdentifier(init.callee) &&
    init.callee.name === 'require' &&
    init.arguments.length === 1 &&
    init.arguments[0].value.startsWith(NATIVE_PACKAGE)
  );
}

module.exports = function ({ types: t }) {
  return {
    name: 'Rewrite @skynexui/native to @skynexui/web',
    visitor: {
      ImportDeclaration(path, state) {
        const { specifiers } = path.node;
        if(isSkynexNativeModule(path.node)) {
          const imports = specifiers
          .map((specifier) => {
            return t.importDeclaration(
              [specifier],
              t.stringLiteral(pathResolver(path.node.source.value, state.opts))
            );
          })
          .filter(Boolean);
          path.replaceWithMultiple(imports);
        }
      },
      ExportNamedDeclaration(path, state) {
        const { specifiers } = path.node;
        if(isSkynexNativeModule(path.node)) {
          const exports = specifiers
            .map((specifier) => {
              return t.exportNamedDeclaration(
                null,
                [specifier],
                t.stringLiteral(pathResolver(path.node.source.value, state.opts))
              );
            })
            .filter(Boolean);
          path.replaceWithMultiple(exports);
        }
      },
      VariableDeclaration(path, state) {
        if(isSkynexNativeRequire(t, path.node)) {
          const { id } = path.node.declarations[0];

          if (t.isObjectPattern(id)) {
            const imports = id.properties
              .map((identifier) => {
                const replacedValue = pathResolver(NATIVE_PACKAGE, state.opts);
                return t.variableDeclaration(path.node.kind, [
                  t.variableDeclarator(
                    t.identifier(identifier.value.name),
                    t.memberExpression(
                      t.callExpression(t.identifier('require'), [t.stringLiteral(replacedValue)]),
                      t.identifier('default')
                    )
                  )
                ]);
              })
              .filter(Boolean);

            path.replaceWithMultiple(imports);
          } else if (t.isIdentifier(id)) {
            const name = id.name;
            const replacedValue = pathResolver(path.node.declarations[0].init.arguments[0].value, state.opts);
            const importIndex = t.variableDeclaration(path.node.kind, [
              t.variableDeclarator(
                t.identifier(name),
                t.callExpression(t.identifier('require'), [
                  t.stringLiteral(replacedValue)
                ])
              )
            ]);
            path.replaceWith(importIndex);
          }
        }
      }
    }
  };
};
