/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware')
const { createBundleRenderer } = require('vue-server-renderer')
const portfinder = require('portfinder')
const chalk = require('chalk')
const minify = require('express-minify')
const compression = require('compression')
const minifyHtml = require('html-minifier')

portfinder.basePort = 8080

const app = express()

let renderer
const templatePath = path.resolve(__dirname, './public/index.html')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync(templatePath, 'utf-8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

async function start () {
  let availablePort
  availablePort = await portfinder.getPortPromise()

  const port = process.env.PORT || availablePort
  const devServerBaseURL = process.env.DEV_SERVER_BASE_URL || 'http://localhost'
  const devServerPort = process.env.DEV_SERVER_PORT || availablePort + 1
  const isDev = process.env.NODE_ENV === 'development'

  function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
      runInNewContext: false
    }))
  }

  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })

  if (isDev) {
    app.use('/*.js', proxy({
      target: `${devServerBaseURL}:${devServerPort}`,
      changeOrigin: true,
      pathRewrite: function (path) {
        return path.includes('main')
          ? '/main.js'
          : path
      },
      prependPath: false
    }))

    app.use('/*hot-update*', proxy({
      target: `${devServerBaseURL}:${devServerPort}`,
      changeOrigin: true
    }))

    app.use('/sockjs-node', proxy({
      target: `${devServerBaseURL}:${devServerPort}`,
      changeOrigin: true,
      ws: true
    }))
  }

  app.use(compression())
  app.use(minify())
  app.use('/js', express.static(path.resolve(__dirname, './dist/js')))
  app.use('/img', express.static(path.resolve(__dirname, './dist/img')))
  app.use('/css', express.static(path.resolve(__dirname, './dist/css')))
  app.use('/fonts', express.static(path.resolve(__dirname, './dist/fonts')))
  app.use('/manifest.json', express.static(path.resolve(__dirname, './dist/manifest.json')))
  app.use('/robots.txt', express.static(path.resolve(__dirname, './dist/robots.txt')))

  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    const context = {
      title: 'App | ',
      url: req.url
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.url) {
          res.redirect(err.url)
        } else {
          res.status(500).end('500 | Internal Server Error')
          console.error(`error during render : ${req.url}`)
          console.error(err.stack)
        }
      }
      res.status(context.HTTPStatus || 200)

      if (html && process.env.NODE_ENV === 'production') {
        res.send(minifyHtml.minify(html, {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        }))
      } else {
        res.send(html)
      }
    })
  })

  app.listen(port, () => {
    console.log(
      chalk.black.bgGreen('\n DONE '),
      chalk.green(`Server started at ${chalk.cyan(`http://localhost:${port}`)} \n`)
    )
  })
}

start()
