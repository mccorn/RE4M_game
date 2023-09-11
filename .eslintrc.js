module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
    },
    ignorePatterns: ['dist/'],
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/no-shadow': ['error'],
        indent: ['error', 4],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'implicit-arrow-linebreak': ['warn', 'beside'],
        'arrow-parens': ['error', 'as-needed'],
        'object-curly-newline': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-plusplus': 'warn',
        'no-param-reassign': 'warn',
        'default-case': 'off',
        'operator-linebreak': ['warn', 'after'],
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        'max-classes-per-file': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'react/require-default-props': 'off',
        'react/jsx-indent-props': ['error', 4],
        'react/button-has-type': 'off',
        'react/jsx-closing-bracket-location': [1, 'after-props'],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelComponents: ['CustomInputLabel'],
                labelAttributes: ['label'],
                controlComponents: ['CustomInput'],
                depth: 3,
            },
        ],
        'linebreak-style': ['error', 'unix'],
    },
};
