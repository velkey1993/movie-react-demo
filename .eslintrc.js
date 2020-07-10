module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'linebreak-style': 0,
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
        'jsx-quotes': [2, 'prefer-single'],
        'react/destructuring-assignment': [0],
        indent: ['error', 4, { "SwitchCase": 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'no-else-return': ['off'],
        'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }],
        'no-multiple-empty-lines': ["error", { "max": 1}]
    },
};
