import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
  MenuSeparator,
  MenuItemGroup,
} from '@/components/Menu'
import { HiSortAscending } from 'react-icons/hi'
import { Button, Input, useMediaQuery } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

interface FilterMenuProps {
  filterValue: string
  searchBarInput: string
  filterTasks: (sortValue: string) => void
  changeInputFilter: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FilterMenu = ({
  filterValue,
  filterTasks,
  searchBarInput,
  changeInputFilter,
}: FilterMenuProps) => {
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
        <MenuSeparator />
        <MenuItemGroup>
          <Input
            size="sm"
            bg="bg.subtle"
            variant="subtle"
            value={searchBarInput}
            placeholder="Filter tasks"
            onChange={changeInputFilter}
          />
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
