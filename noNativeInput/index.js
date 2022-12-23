const forbiddenComponents = require('./forbiddenComponents');

/**
 * This prevents us from using native inputs when we have custom ones
 * And enforces the use of our custom KInputs
 */
module.exports = {
  meta: {
    messages: {
      noNativeInput:
        'You should not use the native input because we have a K wrapper. Use the KInput version instead.',
    },
  },
  create: (context) =>{
    return {
      JSXIdentifier(node) {
        const fileName = context.getFilename()

        if (forbiddenComponents.some(component => node.name === component && !fileName.includes(`K${component}.tsx`))) {
          context.report({ node: node, messageId: 'noNativeInput' })
        }
      },
    }
  },
}
