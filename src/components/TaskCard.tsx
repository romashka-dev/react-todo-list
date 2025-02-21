import { Card, IconButton, Text } from '@chakra-ui/react'
import { Checkbox } from './Checkbox'
import { FaRegTrashCan, FaPen } from 'react-icons/fa6'

interface TaskCardProps {
  id: string
  label: string
  status: boolean
  taskChangeStatus?: () => void
  removeTask: () => void
  editTask?: () => void
}

export const TaskCard = ({
  id,
  label,
  status,
  taskChangeStatus,
  editTask,
  removeTask,
}: TaskCardProps) => {
  return (
    <Card.Root
      w="full"
      border={
        status
          ? '1px solid var(--chakra-colors-red-600)'
          : '1px solid var(--chakra-colors-border)'
      }
    >
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
          onChange={taskChangeStatus}
          checked={status}
        >
          <Text
            as={status ? 'del' : 'p'}
            truncate
            display="block"
            maxW={{ base: '130px', md: '300px' }}
          >
            {label}
          </Text>
        </Checkbox>
        {!status && (
          <IconButton size="xs" onClick={editTask} aria-label="Edit task">
            <FaPen />
          </IconButton>
        )}
        <IconButton
          size="xs"
          colorPalette="orange"
          onClick={removeTask}
          aria-label="Delete task"
        >
          <FaRegTrashCan />
        </IconButton>
      </Card.Body>
    </Card.Root>
  )
}
