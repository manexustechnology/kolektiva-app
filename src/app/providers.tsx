'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './themes/chakra-theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <AntdRegistry>
        {children}
      </AntdRegistry>
    </ChakraProvider>
  )
}