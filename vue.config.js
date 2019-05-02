const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const createApiFile = TARGET_NODE ? './create-api-server.js' : './create-api-client.js'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production'
  },
  configureWebpack: () => ({
    entry: `./src/entry-${target}`,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ],
    externals: TARGET_NODE ? nodeExternals({
      whitelist: [/\.css$/, /\?vue&type=style/]
    }) : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    optimization: {
      splitChunks: undefined
    },
    resolve: {
      alias: {
        'create-api': createApiFile
      }
    }
  }),
  chainWebpack: config => {
    // alias
    // config.resolve.alias
    //   .set('@', resolve('src'))
    //   .set('@assets', resolve('src/assets'))

    // if (process.env.NODE_ENV === 'production') {
    //   // fix ssr bug: document not found -- https://github.com/Akryum/vue-cli-plugin-ssr/blob/master/lib/webpack.js
    //   const isExtracting = config.plugins.has('extract-css')
    //   if (isExtracting) {
    //     // Remove extract
    //     const langs = ["css", "postcss", "scss", "sass", "less", "stylus"]
    //     const types = ["vue-modules", "vue", "normal-modules", "normal"]
    //     for (const lang of langs) {
    //       for (const type of types) {
    //         const rule = config.module.rule(lang).oneOf(type)
    //         rule.uses.delete('extract-css-loader')
    //         // Critical CSS
    //         rule
    //           .use("vue-style")
    //           .loader("vue-style-loader")
    //           .before("css-loader")
    //       }
    //     }
    //     config.plugins.delete("extract-css")
    //   }
    // }

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          optimizeSSR: false
        })
      )
  }
}
