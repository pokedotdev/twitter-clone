/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
	extends: [
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'prettier',
	],
	rules: {
		// Import
		'import/no-duplicates': 2,
		'import/newline-after-import': [2, { count: 1 }],
		'import/order': [2, { 'newlines-between': 'always' }],
		// React
		'react/jsx-uses-react': 0,
		'react/jsx-pascal-case': 2,
		'react/self-closing-comp': 1,
		'react/jsx-boolean-value': 1,
		'react/jsx-no-useless-fragment': 1,
	},
}
