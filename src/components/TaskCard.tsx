import { Card, IconButton, Text } from '@chakra-ui/react'
import { Checkbox } from './Checkbox'
import { FaRegTrashCan, FaPen } from 'react-icons/fa6'

interface TaskCardProps {
  id: string
  label: string
  status: boolean
  taskChangeStatus: () => {}
  removeTask: () => {}
  editTask: () => {}
}

export const TaskCard = ({
  id,
  label,
  status,
  taskChangeStatus,
  removeTask,
  editTask,
}: TaskCardProps) => {
  return (
    <Card.Root w="full">
      <Card.Body
        p={4}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Checkbox
          w="full"
          cursor="pointer"
          variant="outline"
          id={id}
          onChange={() => {}}
          checked={status}
        >
          <Text as={status ? 'del' : 'b'}>{label}</Text>
        </Checkbox>
        <IconButton
          width={{ base: '8' }}
          minW="auto"
          height={{ base: '8' }}
          onClick={() => {
            console.log('Edit')
          }}
          aria-label="Edit task"
        >
          <FaPen />
        </IconButton>
        <IconButton
          width={{ base: '8' }}
          minW="auto"
          height={{ base: '8' }}
          onClick={() => {
            console.log('Delete')
          }}
          aria-label="Delete task"
        >
          <FaRegTrashCan />
        </IconButton>
      </Card.Body>
    </Card.Root>
  )
}
