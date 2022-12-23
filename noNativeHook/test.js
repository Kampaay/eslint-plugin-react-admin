const { RuleTester } = require('eslint');
const forbiddenHooks = require('./index.js');
const parserOptions = require('../parser');

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('no nativeHook', forbiddenHooks, {
    valid: [{
        code: 'const [value, setValue] = useState(false);',
    }],
    invalid: [{
        filename: 'BooleanInput.txt',
        code: 'const something = useRecordContext()',
        errors: [{ messageId: 'noNativeHook' }],
    }]
});
