---
id: request
title: Request Manager
sidebar_label: Request Manager
---

[Open in CodeSandbox](https://codesandbox.io/s/elementos-request-manager-538fz?file=/src/App.js)

```jsx
import { atom, molecule, batched } from 'elementos';

export const createRequest$ = (executor, { defaultData } = {}) => {
    return molecule({
        status: atom("initial"),
        data: atom(defaultData),
        error: atom(null)
    }, {
        actions: ({ status, data, error }) => {
            const baseActions = {
                setPending: batched(() => {
                    status.actions.set("pending");
                    error.actions.set(null);
                }),
                setFulfilled: batched((result) => {
                    status.actions.set("fulfilled");
                    data.actions.set(result);
                    error.actions.set(null);
                }),
                setRejected: batched((err) => {
                    status.actions.set("rejected");
                    error.actions.set(err);
                })
            };
            let invocationCount = 0;
            const execute = async (...args) => {
                let invocationNumber = ++invocationCount;
                baseActions.setPending();
                const prom = executor(...args);
                prom
                    .then((data) => {
                    if (invocationNumber !== invocationCount) {
                        return;
                    }
                    baseActions.setFulfilled(data);
                })
                    .catch((err) => {
                    if (invocationNumber !== invocationCount) {
                        return;
                    }
                    baseActions.setRejected(err);
                });
                return prom;
            };
            return {
              ...baseActions,
              execute
            };
        },
        deriver: ({ status, data, error }) => {
            return {
                isInitial: status === "initial",
                isPending: status === "pending",
                isFulfilled: status === "fulfilled",
                isRejected: status === "rejected",
                status,
                data,
                error
            };
        }
    });
};
```