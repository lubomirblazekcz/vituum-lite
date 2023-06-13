import vituum from './vituum/index.js'
import liquid from '@vituum/vite-plugin-liquid'
import juice from '@vituum/vite-plugin-juice'
import { resolve } from 'node:path'

export default {
    plugins: [
        vituum({
            pages: {
                root: resolve(process.cwd(), 'src'),
                dir: './src/pages',
                formats: ['json', 'latte', 'twig', 'liquid', 'njk', 'hbs', 'pug'],
                ignoredPaths: []
            }
        }),
        liquid({
            data: ['src/data/**/*.json'],
            formats: ['liquid', 'json.liquid', 'json']
        }),
        juice({
            paths: ['src/email']
        })
    ],
    build: {
        manifest: true,
        modulePreload: false,
        rollupOptions: {
            input: ['./src/emails/**/*.{liquid,html,json}', './src/pages/**/*.{liquid,html,json}', '!./src/pages/**/*.{liquid,html}.json', './src/main.js', './src/main.css']
        }
    }
}
