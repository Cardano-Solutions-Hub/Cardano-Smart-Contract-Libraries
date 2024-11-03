/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react" 

export default {
  content: ["./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: 'var(--primary)',
        customPrimaryGray: 'var(--primary-gray)',
        customGray: 'var(--custom-gray)',
        code: 'var(--code)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

