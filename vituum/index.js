import pluginPages from './pages.js'
import { resolveInputPaths, renameBuildStart, renameBuildEnd, renameGenerateBundle } from 'vituum/utils/build.js'

let userConfig
let userEnv

const pluginCore = (pluginUserConfig) => ({
    name: '@vituum/vite-plugin-core',
    enforce: 'post',
    config (config, env) {
        userConfig = config
        userEnv = env

        userConfig.build.rollupOptions.input = resolveInputPaths(userConfig.build.rollupOptions.input, pluginUserConfig.formats)
    },
    buildStart: async () => {
        if (userEnv.command !== 'build') {
            return
        }

        await renameBuildStart(userConfig.build.rollupOptions.input, pluginUserConfig.formats)
    },
    buildEnd: async () => {
        if (userEnv.command !== 'build') {
            return
        }

        await renameBuildEnd(userConfig.build.rollupOptions.input, pluginUserConfig.formats)
    },
    generateBundle: async (_, bundle) => {
        await renameGenerateBundle(
            userConfig.build.rollupOptions.input,
            pluginUserConfig.formats,
            bundle,
            pluginUserConfig.pagesDir[0]
        )
    }
})

const plugin = (pluginUserConfig) => {
    return [pluginCore(pluginUserConfig), pluginPages(pluginUserConfig)]
}

export default plugin
