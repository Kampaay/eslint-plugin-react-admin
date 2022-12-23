const { RuleTester } = require('eslint');
const forbiddenComponents = require('./index.js');
const parserOptions = require('../parser');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('no nativeInput', forbiddenComponents, {
    valid: [{
        code: 'var Component = () => <KBooleanInput />;'
    }],
    invalid: [{
        filename: 'BooleanInput.txt',
        code: 'var Component = () => <BooleanInput />;',
        errors: [{ messageId: 'noNativeBooleanInput' }],
    }]
});
