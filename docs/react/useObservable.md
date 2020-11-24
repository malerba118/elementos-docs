---
id: useObservable
title: useObservable
sidebar_label: useObservable
---

`useObservable` allows us to translate observable state to react state and will request a re-render whenver the observable state changes.

### Basic

We can pass an observable to `useObservable` and its value will be tracked and returned as react state.

```js
import React from 'react'
import { atom } from 'elementos'
import { useConstructor, useObservable } from 'elementos-react'

function Username(props) {
  const self = useConstructor(() => ({
    username$: atom('')
  }));

  const username = useObservable(self.username$);

  React.useEffect(() => {
    // This will run anytime the input is changed
    console.log(username)
  }, [username])

  return (
    <input 
      value={username} 
      onChange={(e) => {
        self.username$.actions.set(e.target.value)
      }}
    />
  );
}
```
