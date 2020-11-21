---
id: batched
title: batched
sidebar_label: batched
---

Batched functions enable you to make multiple state changes without triggering observer effects too frequently. `batched` takes in a function and returns a function with an identical signature to the passed function. Under the hood a batched function will create a new transaction that will be commited at the end of the functions execution and will be rolled back if the passed function throws an error.

### Basic

Before we use batched, let's look at an example that doesn't use batched udpates. Notice how the observer effect runs twice when we call `incrementAll`.

```js
import { atom, molecule, observe, batched  } from 'elementos'

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

observe(counts$, (counts) => {
  console.log(counts)
})

counts$.actions.incrementAll()

// Output:
// { count1: 10, count2: 10 }
// { count1: 11, count2: 10 }
// { count1: 11, count2: 11 }
```

This is likely not the behavior we intend, but by batching `incrementAll` we can ensure that observer effect will run only once at the end of the batched function's execution.

```js
import { atom, molecule, observe, batched  } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
}, {
  actions: ({ count1, count2 }) => ({
    incrementAll: batched(() => {
      count1.actions.increment()
      count2.actions.increment()
    })
  })
})

observe(counts$, (counts) => {
  console.log(counts)
})

counts$.actions.incrementAll()

// Output:
// { count1: 10, count2: 10 }
// { count1: 11, count2: 11 }
```


### Rollbacks

If the batched function throws an error, the state changes will not be committed, and the observer effect will not run.

```js
import { atom, molecule, observe, batched } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
}, {
  actions: ({ count1, count2 }) => ({
    incrementAll: batched(() => {
      count1.actions.increment()
      throw new Error('rollback')
      count2.actions.increment()
    })
  })
})

observe(counts$, (counts) => {
  console.log(counts)
})

try {
  counts$.actions.incrementAll()
}
catch(err) {
  console.log('error during batched update')
}

// Output:
// { count1: 10, count2: 10 }
// error during batched update
```

### Gets and Sets

Every time a batched function is executed, a new transaction is created. When we call `get` or `set` methods on an observable while a batched call is pending, we will be getting and setting the value associated with the pending transaction and this value will not be finalized until the transaction is commited at the end of the batched call.

```js
import { atom, molecule, batched } from 'elementos'

const counts$ = molecule({
  count1: atom(10),
  count2: atom(10)
}, {
  actions: ({ count1, count2 }) => ({
    incrementAll: batched(() => {
      console.log(count1.get())
      count1.actions.increment()
      count2.actions.increment()
      // Here we will get back the updated values 
      // associated with the pending transaction
      console.log(count1.get())
      throw new Error('rollback')
    })
  })
})

try {
  counts$.actions.incrementAll()
}
catch(err) {
  // But the transactions value will never be commited
  console.log(count1.get())
}

// Output:
// 10
// 11
// 10
```