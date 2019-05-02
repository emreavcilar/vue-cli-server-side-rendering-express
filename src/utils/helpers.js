export function registerStoreModule ({ module, moduleName, store }) {
  const moduleIsRegistered = store._modules.root._children[moduleName] !== undefined
  const stateExists = store.state[moduleName]
  if (!moduleIsRegistered) {
    store.registerModule(moduleName, module, { preserveState: stateExists })
  }
}

export function unregisterStoreModule ({ moduleName, store }) {
  const moduleIsRegistered = store._modules.root._children[moduleName] !== undefined
  if (moduleIsRegistered) {
    store.unregisterModule(moduleName)
  }
}
