'use client'

import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from '@/components/Menu'
import { HiSortAscending } from 'react-icons/hi'
import { Button, useMediaQuery } from '@chakra-ui/react'

interface InitMenuProps {
  filter: string
  sortTasks: (sortValue: string) => void
}

export const InitMenu = ({ filter, sortTasks }: InitMenuProps) => {
  const [isMobile] = useMediaQuery(['(max-width: 768px)'], { ssr: false })

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="solid" size={{ base: 'xs', md: 'sm' }}>
          <HiSortAscending /> {!isMobile && ' Sort'}
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={filter}
          onValueChange={(e) => sortTasks(e.value)}
        >
          <MenuRadioItem value="all">All tasks</MenuRadioItem>
          <MenuRadioItem value="completed">Completed</MenuRadioItem>
          <MenuRadioItem value="incompleted">Incompleted</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
