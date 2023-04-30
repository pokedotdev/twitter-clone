/** @type {import('prettier').Config} */
module.exports = {
	printWidth: 100,
	useTabs: true,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	plugins: [require('prettier-plugin-tailwindcss')],
}
