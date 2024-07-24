'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AntdRegistry>
        {children}
      </AntdRegistry>
    </ChakraProvider>
  )
}