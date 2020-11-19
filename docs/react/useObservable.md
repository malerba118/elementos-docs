---
id: useObservable
title: useObservable
sidebar_label: useObservable
---

Elementos is a framework-agnostic, reactive state management library with an emphasis on composition. Elementos prefers to be explicit over concise, meaning you might write a little more code than you would with libraries like mobx, but you'll quickly understand the repercussions of changing any line of code and you won't feel like things are happening magically. 

## Installation

```bash
npm install --save elementos
```

## Observables

An observable is an object that can be observed using the `observe` function and whose value is expected to change over time. Whenever the observable's value changes, all observers will be executed. There are three observable-producing functions packaged with elementos: `atom`, `molecule`, and `derived`.

### atom
An atom is an observable state container. We can get, set, and observe an atom's value.

```js
import { atom, observe } from 'elementos'

const count$ = atom(0)

observe(count$, (count) => {
  console.log(`Count is: ${count}`)
})

count$.actions.set(1)
count$.actions.set(prev => prev + 1)

// Output:
// Count is: 0
// Count is: 1
// Count is: 2
```

:::tip

What's up with the `$` at the end of `count$`? This is known as [Finnish Notation](https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b) and is sometimes used as a way to name variables that contain observable values. Elementos uses this notation where possible.

:::

### molecule
Molecules are used to aggregate observables. Observers of a molecule will be notified any time the dependencies of the molecule are updated.
```js
import { atom, molecule, observe } from 'elementos'

const sum$ = molecule({
  x: atom(2),
  y: atom(5)
}, {
  deriver: ({ x, y }) => x + y
})

observe(sum$, (sum) => {
  console.log(`Sum is: ${sum}`)
})

sum$.actions.x.actions.set(5)

// Output:
// Sum is: 7
// Sum is: 10
```

### derived
Derived observables are used to compute a new observable from an existing observable.
```js
import { atom, derived, observe } from 'elementos'

const count$ = atom(2)
const doubled$ = derived(count$, (count) => count * 2)

observe(doubled$, (doubled) => {
  console.log(`Doubled is: ${doubled}`)
})

count$.actions.set(5)

// Output:
// Doubled is: 4
// Doubled is: 10
```

## Actions

Atoms and molecules allow us to define custom actions, a powerful way to gatekeep our state.

```js
import { atom } from 'elementos'

const createVisibility$ = (defaultValue) => {
  return atom(defaultValue, {
    actions: (set) => ({
      open: () => set(true),
      close: () => set(false)
    })
  })
}

const visibility$ = createVisibility$(false)

observe(visibility$, (isOpen) => {
  console.log(isOpen ? 'open' : 'closed')
})

visibility$.actions.open()
visibility$.actions.close()
```

## Batching 

Updates to atom state happen synchronously, as do the effects run by observers. As a result, the following code will run the observer callback twice during `doubleIncrement`. 

```js
import { atom } from 'elementos'

const counter$ = atom(0, {
  actions: (set) => {
    const increment = () => {
      set((prev) => prev + 1)
    }
    const doubleIncrement = () => {
      increment()
      increment()
    }
    return {
      increment,
      doubleIncrement
    }
  }
})

observe(counter$, (count) => {
  console.log(`Count is: ${count}`)
})

counter$.actions.doubleIncrement()

// Output:
// Count is: 0
// Count is: 1
// Count is: 2
```

We can batch updates to ensure the observer callback runs only once after the completion of the batched update.

```js
import { atom, batched } from 'elementos'

const counter$ = atom(0, {
  actions: (set) => {
    const increment = () => {
      set((prev) => prev + 1)
    }
    const doubleIncrement = batched(() => {
      increment()
      increment()
    })
    return {
      increment,
      doubleIncrement
    }
  }
})

observe(counter$, (count) => {
  console.log(`Count is: ${count}`)
})

counter$.actions.doubleIncrement()

// Output:
// Count is: 0
// Count is: 2
```

## Composition

When we begin to compose all of these things together, we can create some really cool abstractions. Below is a state manager for dialogs that controls dialog visibility and allows for context data to be passed when opening a dialog.

```js
import { atom, molecule, batched } from 'elementos'

const createVisibility$ = (defaultValue) => {
  return atom(defaultValue, {
    actions: (set) => ({
      open: () => set(true),
      close: () => set(false)
    })
  })
}

export const createDialog$ = ({
  defaultVisibility = false,
  defaultContext = null
} = {}) => {
  const visibility$ = createVisibility$(defaultVisibility)
  const context$ = atom(defaultContext)

  const dialog$ = molecule(
    {
      visibility: visibility$,
      context: context$
    },
    {
      actions: ({ visibility, context }) => ({
        open: batched((nextContext: Context) => {
          context.actions.set(nextContext)
          visibility.actions.open()
        }),
        close: batched(() => {
          context.actions.set(null)
          visibility.actions.close()
        })
      }),
      deriver: ({ visibility, context }) => ({
        isOpen: visibility,
        context
      })
    }
  )

  return dialog$
}

const userDialog$ = createDialog$()

observe(userDialog$, ({ isOpen, context }) => {
  console.log({
    isOpen,
    user: context
  })
})

userDialog$.actions.open({
  firstName: 'Austin',
  lastName: 'Malerba',
  email: 'frostin@gmail.com'
})
userDialog$.actions.close()

// Output:
// { isOpen: false, context: null }
// { 
//  isOpen: true, 
//  context: {
//    firstName: 'Austin',
//    lastName: 'Malerba',
//    email: 'frostin@gmail.com'
//  }
// }
// { isOpen: false, context: null }
```

