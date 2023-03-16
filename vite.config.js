import { resolve } from 'node:path'
import vituum from './vituum/index.js'
import liquid from '@vituum/vite-plugin-liquid'

export default {
    plugins: [
        vituum({
            pages: {
                dir: 'src/pages',
                formats: ['liquid'],
                ignoredPaths: []
            }
        }),
        liquid({
            data: resolve(process.cwd(), 'data/**/*.json'),
            filetypes: {
                html: /.(json|json.html|liquid.json|liquid.json.html|liquid|liquid.html)$/,
                json: /.(json.liquid|json.liquid.html)$/
            }
        })
    ],
    build: {
        manifest: true,
        modulePreload: false,
        rollupOptions: {
            input: ['./src/pages/index.liquid.html', './src/main.js', './src/main.css']
        }
    }
}
