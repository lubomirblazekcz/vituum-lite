import { resolve } from 'node:path'
import vituum from './vituum/index.js'
import liquid from './vituum/liquid.js'

export default {
    plugins: [
        vituum({
            formats: ['json', 'latte', 'twig', 'liquid', 'njk', 'hbs', 'pug'],
            pagesDir: ['src/pages'],
            pages: {
                dir: ['src/pages'],
                formats: ['liquid'],
                ignoredPaths: []
            }
        }),
        liquid({
            data: resolve(process.cwd(), 'data/**/*.json'),
            root: process.cwd(),
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
            input: ['./src/pages/**/*.{liquid,html,json}', './src/main.js', './src/main.css']
        }
    }
}
