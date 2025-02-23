import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useColorMode } from '@/components/ColorMode'
import { LuMoon, LuSun } from 'react-icons/lu'

export const InitColorMode = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton onClick={toggleColorMode} variant="outline" size="sm">
        {colorMode === 'light' ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}
