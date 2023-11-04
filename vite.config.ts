import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import UnoCSS from 'unocss/vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	process.env = { ...process.env, ...env }
	return {
		plugins: [UnoCSS(), remix(), tsconfigPaths()],
		define: {
			'process.env': process.env,
		},
	}
})
