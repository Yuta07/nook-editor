module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 7,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			modules: true,
		},
		project: ['tsconfig.json'],
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-inner-declarations': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'parent', 'index', 'sibling', 'object', 'type'],
				pathGroups: [
					{
						pattern: '@alias/**',
						group: 'parent',
						position: 'after',
					},
				],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
			},
		],
	},
	settings: {
		react: {
			version: 'detect', // detect the version of React to use
		},
	},
}
