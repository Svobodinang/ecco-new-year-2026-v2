// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as prettier from 'eslint-config-prettier';
import * as path from 'path';
import pluginImport from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginPrettier from 'eslint-plugin-prettier';

const tsconfigPath = path.resolve('./tsconfig.json');

export default [
    js.configs.recommended,

    ...tseslint.configs.recommendedTypeChecked,
    prettier.default,

    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: tsconfigPath,
            },
        },
        plugins: {
            import: pluginImport,
            prettier: pluginPrettier,
            promise: pluginPromise,
        },
        rules: {
            'prettier/prettier': 'error',
            quotes: ['error', 'single'],
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'typeAlias', format: ['PascalCase'], prefix: ['T'] },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    prefix: ['I'],
                    filter: {
                        regex: '^(Window)$',
                        match: false,
                    },
                },
                { selector: 'enum', format: ['PascalCase'], prefix: ['E'] },
                {
                    selector: ['variable', 'function', 'parameter'],
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
                {
                    selector: ['variable'],
                    types: ['boolean'],
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                    prefix: [
                        'is',
                        'IS',
                        'Is',
                        'has',
                        'HAS',
                        'Has',
                        'can',
                        'CAN',
                        'Can',
                        'should',
                        'SHOULD',
                        'Should',
                        'will',
                        'WILL',
                        'Will',
                        'allow',
                        'Allow',
                        'ALLOW',
                    ],
                },
            ],
            '@typescript-eslint/no-empty-function': 'off',
            'import/prefer-default-export': 'off',
            'newline-before-return': 'error',
            'promise/always-return': 'off',
            'promise/catch-or-return': 'error',
            '@typescript-eslint/no-unsafe-argument': 'off',
            'no-underscore-dangle': ['error', { allowAfterThis: true, allowAfterSuper: true }],
        },
    },
];
