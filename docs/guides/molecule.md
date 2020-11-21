---
id: molecule
title: molecule
sidebar_label: molecule
---

Molecules are observables used to aggregate other observables. They are useful to compose together atoms, molecules, and derived observables into higher level apis. 

## Examples

### Simple

In their simplest form, we may instantiate molecules specifying only children observables.

```js
import { atom, molecule } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
})

// actions object will default to the children
counts$.actions.count1.actions.set(11)

// derived value will reflect the shape of the children
console.log(counts$.get())

// Output:
// { count1: 11, count2: 10 }
```

### Custom Actions

Similarly to atoms, we may define custom actions for our molecule that restrict the way in which we modify its dependencies.

```js
import { atom, molecule } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
}, {
  actions: ({ count1, count2 }) => ({
    incrementAll: () => {
      count1.actions.increment()
      count2.actions.increment()
    }
  })
})

counts$.actions.incrementAll()

console.log(counts$.get())

// Output:
// { count1: 11, count2: 11 }
```

### Derivation

We may also provide a custom deriver to the molecule to change the shape of its observable value.

```js
import { atom, molecule } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
}, {
  actions: ({ count1, count2 }) => ({
    incrementAll: () => {
      count1.actions.increment()
      count2.actions.increment()
    }
  })
  deriver: (({ count1, count2 }) => count1 + count2
})

counts$.actions.incrementAll()

console.log(counts$.get())

// Output:
// 22
```

### onObserverChange

Molecules allow us to hook into information about their observers as well. Whenever an observer subscribes/unsubscribes from a molecule, we will become notified via onObserverChange callbacks.

```js
import { atom, molecule, observe } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
})

counts$.onObserverChange(({ count }) => {
  console.log(count)
})

const dispose1 = observe(counts$, (counts) => {})
const dispose2 = observe(counts$, (counts) => {})

dispose1()
dispose2()

// Output:
// 1
// 2
// 1
// 0
```
