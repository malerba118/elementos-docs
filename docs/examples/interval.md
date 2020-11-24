---
id: interval
title: Dynamic Interval
sidebar_label: Dynamic Interval
---

[Open in CodeSandbox](https://codesandbox.io/s/elementos-interval-9vfik)

```jsx
import { atom, observe } from "elementos";

export const createInterval = (initialCallback, interval) => {
  const interval$ = atom(interval);
  let callback = initialCallback;
  const dispose = observe(interval$, (interval) => {
    const id = setInterval(() => {
      callback();
    }, interval);
    return () => {
      clearInterval(id);
    };
  });
  return {
    setInterval: interval$.actions.set,
    setCallback: (nextCallback) => {
      callback = nextCallback;
    },
    dispose
  };
};
```