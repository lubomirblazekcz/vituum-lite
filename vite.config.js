import vituum from './vituum/index.js'
import liquid from './vituum/liquid.js'

export default {
    plugins: [
        vituum({
            pages: {
                dir: ['src/pages'],
                formats: ['json', 'latte', 'twig', 'liquid', 'njk', 'hbs', 'pug'],
                ignoredPaths: []
            }
        }),
        liquid({
            data: ['src/data/**/*.json'],
            formats: ['liquid', 'json.liquid', 'json']
        })
    ],
    build: {
        manifest: true,
        modulePreload: false,
        rollupOptions: {
            input: ['./src/pages/**/*.{liquid,html,json}', '!./src/pages/**/*.{liquid,html}.json', './src/main.js', './src/main.css']
        }
    }
}
