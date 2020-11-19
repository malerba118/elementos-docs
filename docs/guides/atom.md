---
id: atom
title: atom
sidebar_label: atom
---

Atoms are observable state containers at the core of elementos. Atom is a vague/overloaded term in programming, but don't let them scare you, they're basically just little data stores that will notify you when their state has changed.

## Examples
```js title="Simple"
import { atom } from 'elementos'

const count$ = atom(10)

count$.actions.set(11)
count$.actions.set(prevCount => prevCount + 1)
console.log(count$.get())

// Output:
// 12
```

```js title="Custom Actions"
import { atom } from 'elementos'

const count$ = atom(10, {
  actions: (set) => ({
    increment: () => set(prevCount => prevCount + 1)
  })
})

count$.actions.increment()
console.log(count$.get())

// Output:
// 11
```

```js title="Observed"
import { atom, observe } from 'elementos'

const count$ = atom(10, {
  actions: (set) => ({
    increment: () => set(prevCount => prevCount + 1)
  })
})

observe(count$, (count) => {
  console.log(count)
})

count$.actions.increment()
count$.actions.increment()

// Output:
// 10
// 11
// 12
```

```js title="onObserverChange"
import { atom, observe } from 'elementos'

const count$ = atom(10, {
  actions: (set) => ({
    increment: () => set(prevCount => prevCount + 1)
  })
})

count$.onObserverChange(({ count }) => {
  console.log(count)
})

const dispose1 = observe(count$, (count) => {})
const dispose2 = observe(count$, (count) => {})

dispose1()
dispose2()

// Output:
// 1
// 2
// 1
// 0
```

## Reference

### `atom(defaultValue, options)`

Creates an observable state container.

#### Parameters

* **`defaultValue`**: **optional** - a default state value.
* **`options`**: **optional**
  - **`actions` [default (set) => ({ set })]**: a function in which we can create and return custom actions to mutate the atom state. This provides a nice mechanism to gatekeep our state.

#### Returns
An atom with the following properties.
* **`get(selector, transaction)`**: - a method to get the state of the atom.
  - **`selector` optional [default (x) => x]**: a selector function to select only a subset of the state
  -  **`transaction` optional**: if a transaction is pending, you may get the draft state associated with the transaction by passing it here. This is a low level concept, so you likely will not need it.
* **`subscribe`**: this is a low level function, please use `observe` instead if you wish to run an effect when the atom state changes.
* **`actions`**: the actions returned by the actions option.
  
