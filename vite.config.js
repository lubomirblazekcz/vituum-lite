import vituum from 'vituum'
import liquid from '@vituum/vite-plugin-liquid'
import twig from '@vituum/vite-plugin-twig'
import juice from '@vituum/vite-plugin-juice'

export default {
    plugins: [
        vituum({
            input: ['./src/main.js', './src/main.css']
        }),
        liquid(),
        twig(),
        juice({
            paths: ['src/email']
        })
    ],
    build: {
        manifest: true,
        modulePreload: false
    }
}
