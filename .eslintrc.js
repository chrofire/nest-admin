module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended'],
    root: true,
    env: {
        node: true,
        jest: true
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 强制大括号风格
        '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: false }],

        // 缩进使用 4 个空格，并且 switch 语句中的 Case 需要缩进
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1, flatTernaryExpressions: true }],

        // 数组的括号内的前后禁止有空格
        'array-bracket-spacing': ['error', 'never'],

        // 在括号内实施一致的间隔
        '@typescript-eslint/object-curly-spacing': ['error', 'always', { objectsInObjects: false }],

        // 要求把换行符放在操作符前面
        'operator-linebreak': ['error', 'before'],

        // 禁止空语句, 允许空的 catch 语句
        'no-empty': ['error', { allowEmptyCatch: true }],

        // 禁止在语句末尾使用分号
        '@typescript-eslint/semi': ['error', 'never'],

        // 禁用不必要的分号
        '@typescript-eslint/no-extra-semi': 'error',

        // 函数圆括号之前有一个空格
        '@typescript-eslint/space-before-function-paren': [
            'error',
            {
                anonymous: 'always', // 匿名函数表达式
                named: 'always', // 命名的函数表达式
                asyncArrow: 'always' // 异步的箭头函数表达式
            }
        ],

        // 禁止行尾有空格
        'no-trailing-spaces': [
            'error',
            {
                skipBlankLines: true // 允许在空行使用空白符
            }
        ],

        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['*package', '!', '/', ',', '=']
                },
                block: {
                    // 前后空格是否平衡
                    balanced: false,
                    markers: ['*package', '!', ',', ':', '::', 'flow-include'],
                    exceptions: ['*']
                }
            }
        ],

        // 行尾逗号
        '@typescript-eslint/comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],

        // 强制使用一致的反引号、双引号或单引号
        '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],

        // 要求对象字面量属性名称用引号括起来
        'quote-props': ['error', 'as-needed'],

        // 强制在圆括号内使用一致的空格
        'space-in-parens': ['error', 'never'],

        // 禁止使用多个空格
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],

        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': ['error', { mode: 'strict' }],

        // 要求操作符周围有空格
        '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],

        // 要求箭头函数的参数使用圆括号
        'arrow-parens': ['error', 'always'],

        // 强制在逗号前后使用一致的空格
        '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],

        // 类型注释间距
        '@typescript-eslint/type-annotation-spacing': ['error', { before: false, after: true }],

        // interface 和 type 成员分隔符
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'comma',
                    requireLast: false
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false
                },
                multilineDetection: 'brackets'
            }
        ]
    }
}
