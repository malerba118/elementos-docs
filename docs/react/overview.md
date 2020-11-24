---
id: overview
title: Overview
sidebar_label: Overview
---

## React Hooks are powerful

***but***, they're lacking in several ways...

### Faulty Abstraction
Conceptually, once a hook is defined on a component, it is static and cannot be added/removed and cannot change positions. React relies on linters and the rules of hooks to prevent people from making these mistakes, but the better solution is to declare hooks during the construction of a component as opposed to during the render. If we only allow hooks to be declared on construction,  we eliminate the need for linters and rules because the component will never attempt to re-declare them during the render phase.

### Tight Coupling
Hooks are awesome because they've allowed the community to abstract common needs into libraries. Take for example [react-query](https://react-query.tanstack.com/), which has imensely simplified the way we handle async state in React apps. However, wouldn't it be great if react-query could be used with other UI frameworks like [vue](https://vuejs.org/), [svelte](https://svelte.dev/), or even without a framework? Elementos aims to make this possible by pulling state/effect responsibilities out of React and putting them into a separate package.

### Web Consistency
[Functional reactive programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) has been around for a long time, but in recent years many UI frameworks have embraced it including ember, angular, vue, and svelte. React is pseudo-reactive but hasn't embraced FRP to the extent that other frameworks have and in this way has diverged from the rest of the modern web. Elementos hopes to re-align the React community with other modern web communities.

### Inefficient
React encourages us to put our business logic in the render function of our components, but this leads to unneccesary recomputation of values. We have the option to bail out of these recomputations via useMemo and useCallback, but the better solution is to run business logic only as much as necessary, which elementos encourages us to do via [derived observables](/docs/guides/derived).

## React with elementos

### Installation

```bash
npm install --save elementos-react
```

Here's a quick look at how we can use React and elementos together. If you're looking for a more in-depth example, please see the notes app built with React and elementos.

### Local State
Local state is everywhere in React apps and it's pretty simple with elementos as well. We can initialize and return atoms in a constructor function and then use the `useObservable` hook to translate the observables to react state ([open in CodeSandbox](https://codesandbox.io/s/elementos-login-form-p8lsj?file=/src/App.js)).

```js
import React from 'react';
import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input,
  Stack
} from "@chakra-ui/react";
import { atom, molecule } from 'elementos';
import { useConstructor, useObservable } from 'elementos-react';
import * as api from "./api";

function LoginForm(props) {
  // highlight-start
  const { form$, submitting$ } = useConstructor(() => {
    const submitting$ = atom(false);
    const form$ = molecule({
      username: atom(""),
      password: atom("")
    });
    return {
      form$,
      submitting$
    };
  });
  // highlight-end

  // highlight-start
  const form = useObservable(form$);
  const submitting = useObservable(submitting$);
  // highlight-end

  const handleSubmit = (e) => {
    e.preventDefault();
    // highlight-start
    submitting$.actions.set(true);
    // highlight-end
    api.logIn(form).finally(() => {
      // highlight-start
      submitting$.actions.set(false);
      // highlight-end
    });
  };

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={form.username}
          onChange={(e) => {
            // highlight-start
            form$.children.username.actions.set(e.target.value);
            // highlight-end
          }}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => {
            // highlight-start
            form$.children.password.actions.set(e.target.value);
            // highlight-end
          }}
        />
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </Stack>
  );
}
```

### Effects
To achieve effects with elementos, we can set up observers in the constructor function to monitor observables and run effects whenever their values change. Note that the `observe` function returns a disposer which we schedule to run when the component unmounts.

```js
import React from 'react';
import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input,
  Stack
} from "@chakra-ui/react";
import { atom, molecule, observe } from 'elementos';
import { useConstructor, useObservable } from 'elementos-react';
import * as api from "./api";

function LoginForm(props) {
  const { form$, submitting$ } = useConstructor(({ beforeUnmount }) => {
    const submitting$ = atom(false);
    const form$ = molecule({
      username: atom(""),
      password: atom("")
    });

    // highlight-start
    beforeUnmount(
      observe(form$, (form) => {
        console.log(form)
      })
    )
    // highlight-end

    return {
      form$,
      submitting$
    };
  });

  const form = useObservable(form$);
  const submitting = useObservable(submitting$);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitting$.actions.set(true);
    api.logIn(form).finally(() => {
      submitting$.actions.set(false);
    });
  };

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={form.username}
          onChange={(e) => {
            form$.children.username.actions.set(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => {
            form$.children.password.actions.set(e.target.value);
          }}
        />
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </Stack>
  );
}
```

:::tip Disposing Observers
We should take care to dispose of any observers before the component unmounts. The constructor takes a `beforeUnmount` argument that let's use queue disposal functions.
:::

### Refs
Who needs refs when you've got atoms? Because refs are essentially just state that doesn't cause a component to re-rerender, atoms are a natural substitute for refs with the added benefit that they're observable.

```js
import React from 'react';
import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input,
  Stack
} from "@chakra-ui/react";
import { atom, molecule, observe } from 'elementos';
import { useConstructor, useObservable } from 'elementos-react';
import * as api from "./api";

function LoginForm(props) {
  const { 
    formEl$, 
    form$, 
    submitting$ 
  } = useConstructor(({ beforeUnmount }) => {
    // highlight-start
    const formEl$ = atom(null);
    // highlight-end
    const submitting$ = atom(false);
    const form$ = molecule({
      username: atom(""),
      password: atom(""),
      formEl$
    });

    // highlight-start
    beforeUnmount(
      // log whenever formEl changes
      observe(formEl$, (formEl) => {
        console.log(formEl)
      })
    )
    // highlight-end

    beforeUnmount(
      observe(form$, (form) => {
        console.log(form)
      })
    )
    
    return {
      formEl$,
      form$,
      submitting$
    };
  });

  const form = useObservable(form$);
  const submitting = useObservable(submitting$);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitting$.actions.set(true);
    api.logIn(form).finally(() => {
      submitting$.actions.set(false);
    });
  };

  return (
    // highlight-next-line
    <Stack ref={formEl$.actions.set} as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={form.username}
          onChange={(e) => {
            form$.children.username.actions.set(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => {
            form$.children.password.actions.set(e.target.value);
          }}
        />
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </Stack>
  );
}
```

### Global State
Global state is easy as well. All we have to do is define our observables outside of our components and then we can use them inside of components to share state across.

```jsx
import React from 'react';
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { atom } from 'elementos';
import { useObservable } from 'elementos-react';

const count$ = atom(0, {
  actions: (set) => ({
    increment: () => set((prevCount) => prevCount + 1),
    decrement: () => set((prevCount) => prevCount - 1)
  })
});

function Display() {
  const count = useObservable(count$);
  return <Heading>{count}</Heading>;
}

function Decrement() {
  return (
    <Button
      onClick={() => {
        count$.actions.decrement();
      }}
    >
      Decrement
    </Button>
  );
}

function Increment() {
  return (
    <Button
      onClick={() => {
        count$.actions.increment();
      }}
    >
      Increment
    </Button>
  );
}

export default function App() {
  return (
    <Flex h="100vh" align="center" justify="center" direction="column">
      <Display />
      <Stack isInline spacing={2}>
        <Decrement />
        <Increment />
      </Stack>
    </Flex>
  );
}
```