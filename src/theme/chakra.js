import React from 'react'
import { extendTheme, ChakraProvider } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
})

export const ThemeProvider = ({children}) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
}