const forbiddenHooks = require('./forbiddenHooks');

/**
 * This prevents us from using native hooks when we have custom ones
 * And enforces the use of our custom useKHooks
 */
module.exports = {
  meta: {
    messages: {
      noNativeHook:
        'You should not use the native hook because we have a K wrapper. Use the K version instead.',
    },
  },
  create: (context) =>{
    return {
      Identifier(node) {
        const fileName = context.getFilename()

        if (forbiddenHooks.some(hook => {
          return node.name === `use${hook}` && !fileName.includes(`useK${hook}.ts`);
        })) {
          context.report({ node: node, messageId: 'noNativeHook' })
        }
      },
    }
  },
}
