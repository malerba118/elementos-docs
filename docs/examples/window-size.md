---
id: window-size
title: Window Size
sidebar_label: Window Size
---

[Open in CodeSandbox](https://codesandbox.io/s/elementos-window-size-jyuin?file=/src/index.js)

```jsx
import { atom } from 'elementos'

export const createWindowSize$ = () => {
  const size$ = atom(null);
  let listener;
  size$.onObserverChange(({ count }) => {
    // if there are no observers, remove listener
    if (count === 0 && listener) {
      window.removeEventListener("resize", listener);
    } else if (count > 0 && !listener) {
      // if there are observers, add listener
      listener = () => {
        size$.actions.set({
          height: window.innerHeight,
          width: window.innerWidth
        });
      };
      listener();
      window.addEventListener("resize", listener);
    }
  });
  return size$;
};
```