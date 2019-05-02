import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  return new Promise((resolve, reject) => {
    // начальное время для последующего расчета
    // предзагрузки данных
    const startTime = isDev && Date.now()
    const { app, router, store } = createApp()
    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      /* eslint-disable-next-line */
      return reject({ url: fullPath })
    }
    router.push(url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        /* eslint-disable-next-line */
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - startTime}ms`)
        context.meta = app.$meta()
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
