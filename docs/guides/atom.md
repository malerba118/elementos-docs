---
id: atom
title: atom
sidebar_label: atom
---

Atoms are observable state containers at the core of elementos. Atom is a vague/overloaded term in programming, but don't let them scare you, they're basically just little data stores that will notify you when their state has changed.

All state in elementos originates in atoms and then propagates outward via derived values, notifying observers along the way.

## Examples

### Simple

In their simplest form, we may instantiate an atom with only a default value. This will give us one default action, `set` that we may use to update the atom's state. 

```js
import { atom } from 'elementos'

const count$ = atom(10)

count$.actions.set(11)
count$.actions.set(prevCount => prevCount + 1)
console.log(count$.get())

// Output:
// 12
```

:::tip State updates should be immutable
When setting an atom's state, we should do so immutably because internally elementos uses referential equality to memoize values. If we mutate state, elementos will not understand that the state has changed and observer effects will fail to run.
:::

### Custom Actions

Alternatively, we may define custom actions for our atom that restrict the way in which we modify its underlying state.

```js
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

### Observation

Atoms would be pretty useless without a way to observe them and run effects againt their state changes. `observe` let's us run effects when the atom's previous state and new state are not referentially equal (compared via `Object.is`).

```js
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

### onObserverChange

Atoms allow us to hook into information about their observers as well. Whenever an observer subscribes/unsubscribes from an atom, we will become notified via onObserverChange callbacks.

```js
import { atom, observe } from 'elementos'

const count$ = atom(10)

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
