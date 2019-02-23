class Dep {
  constructor () {
    this.subscribers = []
  }
  addSub (sub) {
    this.subscribers = sub
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

export {
  Dep
}