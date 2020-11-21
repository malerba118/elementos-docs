import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { Stack, Heading, Text, Button, Flex, Box } from "@chakra-ui/react"
import { ThemeProvider } from '../theme/chakra'
import { Editor } from '../components'

const exampleCode = `import { atom } from 'elementos'

export const createWindowSize$ = () => {
  const size$ = atom(null)
  let listener: EventListener

  size$.onObserverChange(({ count }) => {
    // if there are no observers, remove listener
    if (count === 0 && listener) {
      window.removeEventListener('resize', listener)
    } else if (count > 0 && !listener) {
      // if there are observers, add listener
      listener = () => {
        size$.actions.set({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }
      window.addEventListener('resize', listener)
    }
  })

  return size$
}`;

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <ThemeProvider>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
          <Stack bg="white" spacing={8} p={16} align="flex-start">
              <img src="img/logo.svg" />
              <Heading size="3xl">The next generation of react hooks</Heading>
              <Text fontSize="xl">Elementos is a framework-agnostic reactive state management library with an emphasis on state composability and encapsulation. In elementos, state is modeled as a graph of observable state nodes. Try clicking the nodes below and watch as state changes propagate through the graph.</Text>
              <Button as={Link} to="/docs">See the docs</Button>
              <iframe src="https://codesandbox.io/embed/cytoscape-demo-forked-rj787?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height: '600px', border:0, borderRadius: 4, overflow:'hidden'}}
     title="cytoscape demo (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
          </Stack>
          <Stack bg="#f2ecff" isInline w="100%" p={16} spacing={12}>
            <Stack w="45%" spacing={2}>
              <Heading size="xl">Track browser api events</Heading>
              <Text fontSize="lg">Easily tap into browser api's like window resize events and create observables that automatically subscribe/unsubscribe listeners as needed.</Text>
              <Button w={220} colorScheme="purple" as={Link} to="/docs">Open in CodeSandbox</Button>
            </Stack>
            <Box w="55%">
              <Editor code={exampleCode}/>
            </Box>
          </Stack>
          <Stack bg="white" isInline w="100%" p={16} spacing={12}>
            <Box w="55%">
              <Editor code={exampleCode}/>
            </Box>
            <Stack w="45%" spacing={2}>
              <Heading size="xl">Track browser api events</Heading>
              <Text fontSize="lg">Easily tap into browser api's like window resize events and create observables that automatically subscribe/unsubscribe listeners as needed.</Text>
              <Button my={2} w={220} colorScheme="purple" as={Link} to="/docs">Open in CodeSandbox</Button>
            </Stack>
          </Stack>
      </Layout>
    </ThemeProvider>
  );
}

export default Home;
