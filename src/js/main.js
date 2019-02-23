
let data = {
  price: 5,
  count: 20
}

class Dep {
  constructor () {
    this.subscribers = []
  }
  addSub (sub) {
    this.subscribers.push(sub)
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

Object.keys(data).forEach(key => {
  defineReactive(data, key, data[key])
})

function defineReactive (data, key, value) {
  let internalValue = value,
      dep = new Dep()
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get () {
      debugger
      let target = Dep.target
      if (target && !dep.subscribers.includes(target)) {
        dep.addSub(target)
      }
      return internalValue
    },
    set (newValue) {
      debugger
      internalValue = newValue
      dep.notify()
    }
  })
}

class Watcher {
  constructor (myFunc) {
    Dep.target = myFunc
    myFunc()
    Dep.target = null
  }
}

new Watcher(() => {
  data.total = data.price * data.count
})
console.log(data)
data.price = 1000
console.log(data)
console.log(data.total)