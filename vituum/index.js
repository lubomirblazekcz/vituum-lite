import { rename } from 'node:fs/promises'
import pluginPages from "./pages.js"

let userConfig
let userEnv

const pluginCore = () => ({
    name: '@vituum/vite-plugin-core',
    enforce: 'post',
    config (config, env) {
        userConfig = config
        userEnv = env
    },
    buildStart: async () => {
        if (userEnv.command !== 'build') {
            return
        }

        await rename('src/pages/index.liquid', 'src/pages/index.liquid.html')
    },
    buildEnd: async () => {
        if (userEnv.command !== 'build') {
            return
        }

        await rename('src/pages/index.liquid.html', 'src/pages/index.liquid')
    },
    generateBundle(options, bundle) {
        bundle['src/pages/index.liquid.html'].fileName = 'index.html'
    }
})

const plugin = (pluginUserConfig) => {
    return [pluginCore(pluginUserConfig), pluginPages(pluginUserConfig)]
}

export default plugin
