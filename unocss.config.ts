import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  theme: {
    breakpoints: {
      sm: '500px',
      md: '614px',
      mdl: '1002px',
      lg: '1024px',
      lgx: '1092px',
      xl: '1280px',
    }
  },
  presets: [
    presetUno(),
    presetIcons()
  ],
})