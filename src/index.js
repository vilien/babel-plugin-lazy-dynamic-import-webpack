import template from 'babel-template';
import syntax from 'babel-plugin-syntax-dynamic-import';

const buildImport = template(`
  ({
    then: (onSuccess, onError) => new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require(SOURCE));
      });
    }).then(onSuccess, onError)
  })
`);

export default () => ({
  inherits: syntax,

  visitor: {
    Import(path) {
      const newImport = buildImport({
        SOURCE: path.parentPath.node.arguments,
      });
      path.parentPath.replaceWith(newImport);
    },
  },
});

