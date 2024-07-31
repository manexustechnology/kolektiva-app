'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './themes/chakra-theme'
import { ThirdwebProvider } from "thirdweb/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      <ChakraProvider theme={chakraTheme}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </ChakraProvider>
    </ThirdwebProvider>
  )
}