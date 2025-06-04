import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({typescript: true}),
        tailwindcss(),
        svgr({include: '**/*.svg'}),
    ],
})
