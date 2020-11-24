---
id: dialog
title: Dialog Manager
sidebar_label: Dialog Manager
---

[Open in CodeSandbox](https://codesandbox.io/s/elementos-dialog-state-p02d5)

```jsx
import { atom, molecule, batched } from 'elementos'

const createVisibility$ = (defaultValue) => {
  return atom(defaultValue, {
    actions: (set) => ({
      open: () => set(true),
      close: () => set(false)
    })
  });
};

export const createDialog$ = ({ isOpen = false, context = null } = {}) => {
  const visibility$ = createVisibility$(isOpen);
  const context$ = atom(context);

  const dialog$ = molecule(
    {
      visibility: visibility$,
      context: context$
    },
    {
      actions: ({ visibility, context }) => ({
        open: batched((nextContext) => {
          context.actions.set(nextContext);
          visibility.actions.open();
        }),
        close: batched(() => {
          context.actions.set(null);
          visibility.actions.close();
        })
      }),
      deriver: ({ visibility, context }) => ({
        isOpen: visibility,
        context
      })
    }
  );

  return dialog$;
};
```