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
	plugins: ['react'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
	],
	rules: {
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'no-inner-declarations': 'off',
		'no-unused-vars': 'warn',
	},
	settings: {
		react: {
			version: 'detect', // detect the version of React to use
		},
	},
}
