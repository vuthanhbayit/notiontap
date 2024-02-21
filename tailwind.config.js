import { purgeIconPlugin } from '@vt7/tailwind-purge-icon'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    purgeIconPlugin({
      collections: {
        ri: require('@iconify/json/json/ri.json'),
      },
      prefix: 'i',
    }),
  ],
}
