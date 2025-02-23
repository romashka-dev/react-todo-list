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
  filterValue: string
  filterTasks: (sortValue: string) => void
}

export const InitMenu = ({ filterValue, filterTasks }: InitMenuProps) => {
  const [isMobile] = useMediaQuery(['(max-width: 768px)'], { ssr: false })

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="solid" size={{ base: 'sm', md: 'md' }}>
          <HiSortAscending /> {!isMobile && ' Filter'}
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={filterValue}
          onValueChange={(e) => filterTasks(e.value)}
        >
          <MenuRadioItem value="all">All tasks</MenuRadioItem>
          <MenuRadioItem value="completed">Completed</MenuRadioItem>
          <MenuRadioItem value="incompleted">Incompleted</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
