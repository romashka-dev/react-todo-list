import { Flex, IconButton, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { InitMenu } from './InitMenu'

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
    <Flex
      w="full"
      mb={4}
      justifyContent="space-between"
      alignItems="center"
      gap={{ base: 3, md: 4 }}
    >
      <Input
        size={{ base: 'xs', md: 'sm' }}
        onChange={changeInput}
        value={value}
        placeholder="Use at least 2 characters to start creating new task"
      />
      <IconButton
        disabled={value.length < 2}
        onClick={createTask}
        aria-label="Create task"
        size={{ base: 'xs', md: 'sm' }}
      >
        <FaRegSquarePlus />
      </IconButton>
      <InitMenu filterTasks={filterTasks} filterValue={filterValue} />
    </Flex>
  )
}
