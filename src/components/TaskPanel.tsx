import { HStack, IconButton, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { FilterMenu } from './FilterMenu'

interface TaskPanelProps {
  value: string
  filterValue: string
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void
  createTask: () => void
  filterTasks: (sortValue: string) => void
}

export const TaskPanel = ({
  value,
  filterValue,
  changeInput,
  createTask,
  filterTasks,
}: TaskPanelProps) => {
  return (
    <HStack w="full" gap={3}>
      <Input
        size={{ base: 'sm', md: 'md' }}
        bg="bg.emphasized"
        borderColor="border.emphasized"
        variant="subtle"
        value={value}
        placeholder="Min. 2 characters to begin ..."
        onChange={changeInput}
      />
      <IconButton
        size={{ base: 'sm', md: 'md' }}
        disabled={value.length < 2}
        aria-label="Create task"
        onClick={createTask}
      >
        <FaRegSquarePlus />
      </IconButton>
      <FilterMenu filterTasks={filterTasks} filterValue={filterValue} />
    </HStack>
  )
}
