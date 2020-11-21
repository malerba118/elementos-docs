---
id: observe
title: observe
sidebar_label: observe
---

The `observe` function allows us to watch observables and run effects when their values change or when any of their dependencies' values change.

### Basic

Observers watch a single observable and run effects upon changes. Note that observer effects also run once immediately when they're initialized.

```js
import { atom, observe } from 'elementos'

const count$ = atom(10)

observe(count$, (count) => {
  console.log(count)
})

count$.actions.set(11)
// Output:
// 10
// 11
```

### Synchronous Effects

It's important to understand that state is updated synchronously and observer effects are run synchronously after state changes.

```js
import { atom, observe } from 'elementos'

const count$ = atom(10)

observe(count$, (count) => {
  console.log(count)
})

count$.actions.set(11)
console.log('hello')
count$.actions.set(12)

// Output:
// 10
// 11
// hello
// 12
```

### Effect Cleanup

Observer effects support the return of a cleanup function which will always run immediately before the next effect is executed.

```js
import { atom, observe } from 'elementos'

const count$ = atom(10)

observe(count$, (count) => {
  console.log(count)
  return () => {
    console.log('cleanup')
  }
})

count$.actions.set(11)

// Output:
// 10
// cleanup
// 11
```

### Disposal

If we need to stop observing an observable, for example when a component unmounts, we can use the `dispose` method returned by `observe`.

```js
import { atom, observe } from 'elementos'

const count$ = atom(10)

const dispose = observe(count$, (count) => {
  console.log(count)
  return () => {
    console.log('cleanup')
  }
})

count$.actions.set(11)
dispose()
count$.actions.set(12) // This will no longer be picked up by the observer

// Output:
// 10
// cleanup
// 11
// cleanup
```
