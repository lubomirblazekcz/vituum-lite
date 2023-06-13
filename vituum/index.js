import pluginPages from './pages.js'
import { resolveInputPaths, renameGenerateBundle } from 'vituum/utils/build.js'
import { relative } from 'path'

let userConfig
let resolvedConfig

const pluginCore = (pluginUserConfig) => ({
    name: '@vituum/vite-plugin-core',
    enforce: 'post',
    config (config) {
        userConfig = config

        if (userConfig?.build?.rollupOptions?.input) {
            userConfig.build.rollupOptions.input = resolveInputPaths(userConfig.build.rollupOptions.input, pluginUserConfig.pages.formats)
        }
    },
    configResolved (config) {
        resolvedConfig = config
    },
    generateBundle: async (_, bundle) => {
        await renameGenerateBundle(
            resolvedConfig.build.rollupOptions.input,
            pluginUserConfig.pages.formats,
            bundle,
            file => {
                const pagesDir = relative(resolvedConfig.root, pluginUserConfig.pages.dir)
                const pagesRoot = relative(resolvedConfig.root, pluginUserConfig.pages.root)

                if (file.includes(pagesDir)) {
                    return relative(pagesDir, file)
                } else if (file.includes(pagesRoot)) {
                    return relative(pagesRoot, file)
                } else {
                    return file
                }
            }
        )
    }
})

const plugin = (pluginUserConfig) => {
    return [pluginCore(pluginUserConfig), pluginPages(pluginUserConfig)]
}

export default plugin
