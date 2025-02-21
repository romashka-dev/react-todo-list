import { Flex, IconButton, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'

interface TaskPanelProps {
  value: string
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void
  createTask: () => void
}

export const TaskPanel = ({
  value,
  changeInput,
  createTask,
}: TaskPanelProps) => {
  return (
    <Flex
      w="full"
      mb={4}
      justifyContent="space-between"
      alignItems="center"
      gap={4}
    >
      <Input onChange={changeInput} value={value} placeholder="Create task" />
      <IconButton
        onClick={createTask}
        aria-label="Create task"
        colorScheme="orange"
      >
        <FaRegSquarePlus />
      </IconButton>
    </Flex>
  )
}
