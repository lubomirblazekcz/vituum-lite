import { rename, rm } from 'node:fs/promises'
import pc from 'picocolors'
import { version } from 'vite'
import pluginPages from "./pages.js"

const start = new Date()

let userConfig
let userEnv

const pluginCore = () => ({
    name: '@vituum/vite-plugin-core',
    config (config, env) {
        userConfig = config
        userEnv = env
    },
    buildStart: async (config) => {
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
    closeBundle: async () => {
        if (userEnv.command !== 'build') {
            return
        }

        await rename('dist/src/pages/index.liquid.html', 'dist/index.html')
        await rm('dist/src', { recursive: true })

        console.info(`${pc.cyan(`vite v${version}`)} ${pc.green(`build finished in ${pc.gray(new Date() - start + 'ms')}`)}`)
    }
})

const plugin = (pluginUserConfig) => {
    return [pluginCore(pluginUserConfig), pluginPages(pluginUserConfig)]
}

export default plugin
