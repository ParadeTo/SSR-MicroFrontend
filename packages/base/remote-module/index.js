class RemoteModule {
  importMap = {}
  constructor({importMap}) {
    this.importMap = importMap
  }

  fetchModule(name) {
    const fullName = this.importMap[name]
  }
}
