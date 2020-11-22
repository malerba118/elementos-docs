---
id: useConstructor
title: useConstructor
sidebar_label: useConstructor
---

`useConstructor` runs a constructor function once on the first render of a component and returns a value that will stay constant across the lifetime of the component.

### Basic

We typically do our observable creation inside of `useConstructor` and then return the observables from the constructor for access during the remainder of the component's lifetime.

```js
import { atom } from 'elementos'
import { useConstructor, useObservable } from 'elementos-react'

function Username(props) {
  const self = useConstructor(() => ({
    username$: atom('')
  }));

  const username = useObservable(self.username$);

  return (
    <input 
      value={username} 
      onChange={(e) => {
        self.username$.actions.set(e.target.value)
      }}>
  );
}
```

### Unmounting

Whenever we observe atom's, we should take care to unobserve them when a component unmounts. For this, a `beforeUnmount` argument is passed to the constructor. Note that `observe` returns a dispose function so we can simply wrap our `observe` call with `beforeUnmount` and the dispose function will be invoked before unmount.

```js
import React from 'react'
import { atom, observe } from 'elementos'
import { useConstructor, useObservable } from 'elementos-react'

function Username(props) {
  const self = useConstructor(({ beforeUnmount }) => {
    const username$ = atom('')

    beforeUnmount(
      observe(username$, console.log)
    )

    return {
      username$
    }
  });

  const username = useObservable(self.username$);

  return (
    <input 
      value={username} 
      onChange={(e) => {
        self.username$.actions.set(e.target.value)
      }}>
  );
}
```

:::note 
Queueing dispose functions ourselves may seem like uneccesary boilerplate, but it's in line with elementos' goals to be transparent and explicit and helps solidify our mental models of our apps. It also encourages us to decouple our state/effects from React's API, allowing for easier migrations to other frameworks.
:::

### Observing Props

Often times we wish to observe changes to props across renders. For this, `useConstructor` takes a second argument, `observed`, which should be an object whose values will be tracked as atoms and these atoms will be passed to the constructor function.

```js
import React from 'react'
import { atom, observe } from 'elementos'
import { useConstructor } from 'elementos-react'

function User(props) {
  // Whenever props.id changes, set will be called 
  // on atoms.id with the new value
  useConstructor(({ atoms, beforeUnmount }) => {
    beforeUnmount(
      observe(atoms.id, console.log)
    )
  }, {
    id: props.id
  });

  return (
    <div>...</div>
  );
}
```
