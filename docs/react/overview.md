---
id: overview
title: Overview
sidebar_label: Overview
---

## React Hooks are powerful

*but they're lacking in several ways...*

### Faulty Abstraction
Conceptually, once a hook is defined on a component, it is static and cannot be added/removed and cannot change positions. React relies on linters and the rules of hooks to prevent people from making these mistakes, but the better solution is to declare hooks during the construction of a component as opposed to during the render. If we only allow hooks to be declared on construction,  we eliminate the need for linters and rules because the component will never attempt to re-declare them during the render phase.

### Tight Coupling
Hooks are awesome because they've allowed the community to abstract common needs into libraries. Take for example [react-query](https://react-query.tanstack.com/), which has imensely simplified the way we handle async state in React apps. However, wouldn't it be great if react-query could be used with other UI frameworks like [vue](https://vuejs.org/), [svelte](https://svelte.dev/), or even without a framework? Elementos aims to make this possible by pulling state/effect responsibilities out of React and putting them into a separate package.

### Web Consistency
[Functional reactive programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) has been around for a long time, but in recent years many UI frameworks have embraced it including ember, angular, vue, and svelte. React is pseudo-reactive but hasn't embraced FRP to the extent that other frameworks have and in this way has diverged from the rest of the modern web. Elementos hopes to re-align the React community with other modern web communities.

### Inefficient
React encourages us to put our business logic in the render function of our components, but this leads to unneccesary recomputation of values. We have the option to bail out of these recomputations via useMemo and useCallback, but the better solution is to run business logic only as much as necessary, which elementos encourages us to do via [derived observables](/docs/guides/derived).