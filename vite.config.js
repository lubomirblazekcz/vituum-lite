import vituum from 'vituum'
import liquid from '@vituum/vite-plugin-liquid'
import juice from '@vituum/vite-plugin-juice'

export default {
    plugins: [
        vituum(),
        liquid(),
        juice({
            paths: ['src/email']
        })
    ],
    build: {
        manifest: true,
        modulePreload: false,
        rollupOptions: {
            input: [
                './src/emails/**/*.{liquid,html,json}',
                './src/pages/**/*.{liquid,html,json}',
                '!./src/pages/**/*.{liquid,html}.json',
                './src/main.js',
                './src/main.css'
            ]
        }
    }
}
