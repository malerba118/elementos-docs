import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { Stack, Heading, Text, Button, Flex, Box } from "@chakra-ui/react"
import { ThemeProvider } from '../theme/chakra'
import { Editor } from '../components'

const windowSizeCode = `import { atom } from 'elementos';

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
};`;

const dialogCode = `import { atom, molecule, batched } from 'elementos'

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
};`

const intervalCode = `import { atom, observe } from "elementos";

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
};`

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <ThemeProvider>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
          <Stack bg="white"  align="center"  p={16}>
            <Box mb={8}>
              <img src="img/logo.svg" />
            </Box>
            <Stack w="70%" minW="380px" spacing={8}>
              <Heading size="3xl">The next generation of react hooks</Heading>
              <Text fontSize="xl">Elementos is a framework-agnostic reactive state management library with an emphasis on state composability and encapsulation. In elementos, state is modeled as a graph of observable state nodes. Try clicking the nodes below and watch as state changes propagate through the graph.</Text>
              <Button colorScheme="purple" w={140} as={Link} to="/docs">See the docs</Button>
            </Stack>
          </Stack>
          <Box w="100%">
              <iframe src="https://codesandbox.io/embed/cytoscape-demo-forked-rj787?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height: '700px', border:0, overflow:'hidden', background: '#151515'}}
     title="cytoscape demo (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
          </Box>
          <Stack bg="#f2ecff" isInline w="100%" p={16} spacing={[0,0, 16]} wrap="wrap" justify="center">
            <Stack pb={12} flex="16" spacing={3} width={['100%', 'auto']}>
              <Heading size="xl">Track browser events</Heading>
              <Text fontSize="lg">Easily tap into browser api's like window resize events and create observables that automatically subscribe/unsubscribe listeners as needed.</Text>
              <Button w={220} colorScheme="purple" as={Link} to="https://codesandbox.io/s/elementos-window-size-jyuin?file=/src/index.js">Open in CodeSandbox</Button>
            </Stack>
            <Box flex="24" width={['100%', '100%',  'auto']}>
              <Editor code={windowSizeCode}/>
            </Box>
          </Stack>
          <Stack bg="white" isInline w="100%" p={16} spacing={[0, 0, 16]} wrap="wrap" justify="center">
            <Box flex="24" width={['100%', '100%', 'auto']}>
              <Editor code={dialogCode}/>
            </Box>
            <Stack pt={[12, 12, 0]} flex="16" spacing={3} width={['100%', 'auto']}>
              <Heading size="xl">Manage dialog state</Heading>
              <Text fontSize="lg">Create abstractions for common state needs like dialog visibility, requests, and pagination.</Text>
              <Button w={220} colorScheme="purple" as={Link} to="https://codesandbox.io/s/elementos-dialog-state-p02d5">Open in CodeSandbox</Button>
            </Stack>
          </Stack>
          <Stack bg="#f2ecff" isInline w="100%" p={16} spacing={[0,0, 16]} wrap="wrap" justify="center">
            <Stack pb={12} flex="16" spacing={3} width={['100%', 'auto']}>
              <Heading size="xl">Create dynamic intervals</Heading>
              <Text fontSize="lg">Create dynamic intervals with update-able callbacks and interval times.</Text>
              <Button w={220} colorScheme="purple" as={Link} to="https://codesandbox.io/s/elementos-interval-9vfik">Open in CodeSandbox</Button>
            </Stack>
            <Box flex="24" width={['100%', '100%',  'auto']}>
              <Editor code={intervalCode}/>
            </Box>
          </Stack>
      </Layout>
    </ThemeProvider>
  );
}

export default Home;
