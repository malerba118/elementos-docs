---
id: derived
title: derived
sidebar_label: derived
---

Derived values are observable and provide a mapping of one observable to another observable, with a transform applied to the child observable's value. They are useful to transform/select from existing observables.

## Examples

### Mapping

Derived takes two required params, an observable and a transform.

```js
import { atom, derived } from 'elementos'

const counts$ = atom(10)
const doubled$ = derived(count$, (x) => x * 2)

counts$.actions.set(11)

console.log(doubled$.get())

// Output:
// 22
```

### Narrowing

At times we may wish to select only a subset of the child observable's value.

```js
import { atom, derived } from 'elementos'

const array$ = atom([10, 11])
const first$ = derived(array$, (array) => array[0])

console.log(first$.get())

// Output:
// 10
```
